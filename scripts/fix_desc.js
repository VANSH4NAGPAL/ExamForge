const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.exam.update({
    where: { slug: 'servicenow-csa-premium' },
    data: { description: 'CertyIQ Premium Question Bank — 482 high-quality practice questions with detailed explanations for correct and incorrect answers.' }
}).then(() => console.log('Fixed')).finally(() => prisma.$disconnect());
