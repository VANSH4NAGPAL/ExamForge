const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const qs = await prisma.question.findMany({
    where: {
      OR: [
        { questionText: { contains: '(Choose' } },
        { questionText: { contains: '(Select' } }
      ]
    }
  });

  let fixedCount = 0;

  for (const q of qs) {
    if (q.correctAnswer.includes(',')) {
      continue; // Already multi-select
    }

    // Many explanations start directly with the letters if they are from the missing 15, or look like "The correct answer is B, C, and D: "
    let extracted = [];
    
    // Look for "The correct answer is B, C, and D" pattern
    let match = q.explanation.match(/correct answer is ([A-F][^:]*)/i) 
             || q.explanation.match(/correct answers are ([A-F][^:]*)/i)
             || q.explanation.match(/^([A-F](, [A-F]| and [A-F])*)/);
             
    if (match) {
      let lettersText = match[1] || match[0];
      // Extract just the uppercase letters A-F
      extracted = lettersText.match(/[A-F]/g) || [];
    }
    
    // Fallback: If we couldn't parse it from the first sentence, sometimes it's explicitly broken down line by line:
    // A. Option 1 Correct.
    // B. Option 2 Correct.
    if (extracted.length < 2) {
        const correctLineMatches = q.explanation.match(/^[A-F]\..*?Correct\./gm);
        if (correctLineMatches) {
            extracted = correctLineMatches.map(m => m[0]);
        }
    }

    if (extracted && extracted.length > 1) {
      const uniqueLetters = [...new Set(extracted)].sort().join(', ');
      
      console.log(`Fixing ${q.qNumber}: Old="${q.correctAnswer}" New="${uniqueLetters}"`);
      await prisma.question.update({
        where: { id: q.id },
        data: { correctAnswer: uniqueLetters }
      });
      fixedCount++;
    } else {
      console.log(`Failed to parse letters for ${q.qNumber}: ${q.correctAnswer}`);
    }
  }

  console.log(`Fixed ${fixedCount} corrupted multi-select questions.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
