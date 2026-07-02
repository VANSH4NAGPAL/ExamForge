import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const url = new URL(request.url);
        const examId = url.searchParams.get('examId');

        const where = examId ? { examId: parseInt(examId) } : {};

        const questions = await prisma.question.findMany({
            where,
            orderBy: { id: 'asc' }
        });

        // Group by section
        const sections = {};
        questions.forEach(q => {
            if (!sections[q.section]) sections[q.section] = [];
            sections[q.section].push(q);
        });

        return Response.json({ sections, raw: questions });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
