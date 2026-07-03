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

    let extracted = [];
    
    // Check for explicit "Answer: A, B, C" pattern (like from PDF dumps)
    // First, let's just try to parse the entire explanation for ANY mention of correct answers
    const explanation = q.explanation;
    
    const regexList = [
      /correct answer(?:s)? (?:is|are|of) ([A-F][^:]*)/i,
      /^([A-F](, [A-F]| and [A-F])*)/,
      /correct answer: ([A-F][^:]*)/i,
      /([A-F],?\s*)+are correct/i
    ];
    
    for (const r of regexList) {
      const match = explanation.match(r);
      if (match) {
        extracted = match[1] ? match[1].match(/[A-F]/g) : match[0].match(/[A-F]/g);
        if (extracted && extracted.length > 1) break;
      }
    }
    
    if (!extracted || extracted.length < 2) {
        const correctLineMatches = explanation.match(/^[A-F]\..*?Correct\./gm) || explanation.match(/^[A-F]\).*?Correct\./gm);
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
      console.log(`Still failed to parse letters for ${q.qNumber}`);
    }
  }

  console.log(`Fixed ${fixedCount} more corrupted multi-select questions.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
