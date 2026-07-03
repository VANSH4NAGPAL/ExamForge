const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const JSON_PATH = path.join(__dirname, '../../../../Downloads/SNPS/parsed_questions_fixed.json');

async function main() {
  const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
  console.log(`Loaded ${data.length} fixed questions from JSON.`);

  // Get the premium exam
  const exam = await prisma.exam.findUnique({ where: { slug: 'servicenow-csa-premium' } });
  if (!exam) {
      console.error('Premium exam not found!');
      return;
  }

  let updated = 0;
  for (const q of data) {
      await prisma.question.updateMany({
          where: { 
              examId: exam.id, 
              qNumber: q.qNumber 
          },
          data: {
              optionA: q.optionA || null,
              optionB: q.optionB || null,
              optionC: q.optionC || null,
              optionD: q.optionD || null,
              optionE: q.optionE || null,
              optionF: q.optionF || null,
              correctAnswer: q.correctAnswer,
              explanation: q.explanation || 'See official ServiceNow documentation.',
          }
      });
      updated++;
  }

  console.log(`Successfully updated ${updated} questions in the database with unscrambled options and accurate multi-select answers.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
