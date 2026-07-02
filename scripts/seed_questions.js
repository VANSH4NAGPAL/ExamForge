const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const QUESTIONS_FILE = path.join(__dirname, '../../../../.gemini/antigravity/brain/c4bb4c2e-d25d-49b1-a759-4f889032d548/CSA_practice_questions.md');
const ANSWERS_FILE = path.join(__dirname, '../../../../.gemini/antigravity/brain/c4bb4c2e-d25d-49b1-a759-4f889032d548/CSA_answer_key.md');

async function main() {
    console.log('Reading files...');
    const questionsMd = fs.readFileSync(QUESTIONS_FILE, 'utf-8');
    const answersMd = fs.readFileSync(ANSWERS_FILE, 'utf-8');

    // Parse Answers
    console.log('Parsing Answers...');
    const answerMap = {};
    const answerRegex = /\|\s*(Q\d+)\s*\|\s*\*\*([A-Z, ]+)\*\*\s*\|\s*(.*?)\s*\|/g;
    let match;
    while ((match = answerRegex.exec(answersMd)) !== null) {
        answerMap[match[1]] = {
            correctAnswer: match[2].trim(),
            explanation: match[3].trim()
        };
    }

    console.log('Clearing old DB...');
    await prisma.analytics.deleteMany();
    await prisma.progress.deleteMany();
    await prisma.question.deleteMany();
    await prisma.exam.deleteMany();
    await prisma.user.deleteMany();

    // Create the CSA Exam
    const exam = await prisma.exam.create({
        data: {
            name: 'ServiceNow CSA',
            slug: 'servicenow-csa',
            description: 'ServiceNow Certified System Administrator — 430 practice questions across 17 sections.'
        }
    });
    console.log(`Created exam: ${exam.name} (id: ${exam.id})`);

    // Parse Sections and Questions
    console.log('Parsing Questions...');
    const sections = questionsMd.split('## ').slice(1);
    const questionsToInsert = [];

    for (const sectionBlock of sections) {
        const lines = sectionBlock.split('\n');
        const sectionTitle = lines[0].trim();
        let currentQNumber = null;
        let currentQText = null;
        let options = [];

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const qStart = /^\*\*(Q\d+)\.\*\*\s+(.*)/.exec(line);
            if (qStart) {
                if (currentQNumber) {
                    questionsToInsert.push({ qNumber: currentQNumber, section: sectionTitle, questionText: currentQText, options: [...options] });
                }
                currentQNumber = qStart[1];
                currentQText = qStart[2];
                options = [];
            } else if (/^-\s+[A-F]\)/.test(line)) {
                options.push(line.replace(/^-\s+/, '').trim());
            } else if (currentQNumber && !line.startsWith('---') && !line.startsWith('>') && options.length === 0) {
                currentQText += ' ' + line;
            }
        }
        if (currentQNumber) {
            questionsToInsert.push({ qNumber: currentQNumber, section: sectionTitle, questionText: currentQText, options: [...options] });
        }
    }

    console.log(`Found ${questionsToInsert.length} questions. Inserting...`);
    for (const q of questionsToInsert) {
        const answerData = answerMap[q.qNumber] || { correctAnswer: 'A', explanation: 'No explanation found.' };

        // Build indexed options array (filter nulls)
        const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
        const optionPairs = q.options.map((opt, i) => ({ letter: letters[i], text: opt })).filter(o => o.text);

        // Find which letter(s) are correct
        const correctLetters = answerData.correctAnswer.split(',').map(l => l.trim());

        // Shuffle the options randomly
        for (let i = optionPairs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [optionPairs[i], optionPairs[j]] = [optionPairs[j], optionPairs[i]];
        }

        // Re-assign letters after shuffle and track which new letters are correct
        const newCorrectLetters = [];
        const shuffled = optionPairs.map((pair, i) => {
            if (correctLetters.includes(pair.letter)) newCorrectLetters.push(letters[i]);
            return { letter: letters[i], text: pair.text };
        });

        await prisma.question.create({
            data: {
                examId: exam.id,
                qNumber: q.qNumber,
                section: q.section,
                questionText: q.questionText,
                optionA: shuffled[0]?.text || null,
                optionB: shuffled[1]?.text || null,
                optionC: shuffled[2]?.text || null,
                optionD: shuffled[3]?.text || null,
                optionE: shuffled[4]?.text || null,
                optionF: shuffled[5]?.text || null,
                correctAnswer: newCorrectLetters.join(', '),
                explanation: answerData.explanation
            }
        });
    }

    console.log(`✅ Done! Seeded ${questionsToInsert.length} questions into "${exam.name}".`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
