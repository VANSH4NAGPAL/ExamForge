const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const QUESTIONS_FILE = path.join(__dirname, '../../../../Downloads/SNPS/parsed_questions.json');

async function main() {
    console.log('Reading parsed questions...');
    const questions = JSON.parse(fs.readFileSync(QUESTIONS_FILE, 'utf-8'));
    console.log(`Found ${questions.length} questions`);

    // Check if this exam already exists
    let exam = await prisma.exam.findUnique({ where: { slug: 'servicenow-csa-premium' } });
    
    if (exam) {
        console.log('Exam already exists - clearing old questions...');
        // Delete analytics and questions linked to this exam
        const qIds = (await prisma.question.findMany({ where: { examId: exam.id }, select: { id: true } })).map(q => q.id);
        await prisma.analytics.deleteMany({ where: { questionId: { in: qIds } } });
        await prisma.progress.deleteMany({ where: { examId: exam.id } });
        await prisma.question.deleteMany({ where: { examId: exam.id } });
    } else {
        exam = await prisma.exam.create({
            data: {
                name: 'CSA Premium Bank',
                slug: 'servicenow-csa-premium',
                description: 'CertyIQ Premium Question Bank — 189 high-quality practice questions with detailed explanations for correct and incorrect answers.'
            }
        });
        console.log(`Created exam: ${exam.name} (id: ${exam.id})`);
    }

    console.log('Inserting questions...');
    let inserted = 0;
    for (const q of questions) {
        await prisma.question.create({
            data: {
                examId: exam.id,
                qNumber: q.qNumber,
                section: q.section,
                questionText: q.questionText,
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
        inserted++;
    }

    console.log(`Done! Inserted ${inserted} questions into "${exam.name}"`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
