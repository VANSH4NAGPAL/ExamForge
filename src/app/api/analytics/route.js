import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const body = await request.json();
        const { ip, questionId, isCorrect, selected } = body;

        let user = await prisma.user.findUnique({ where: { ipAddress: ip } });
        if (!user) {
            user = await prisma.user.create({ data: { ipAddress: ip } });
        }

        const analytics = await prisma.analytics.create({
            data: {
                userId: user.id,
                questionId,
                isCorrect,
                selected
            }
        });

        return new Response(JSON.stringify(analytics), { headers: { 'Content-Type': 'application/json' } });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

export async function GET(request) {
    const url = new URL(request.url);
    const ip = url.searchParams.get('ip') || 'unknown';

    const user = await prisma.user.findUnique({ 
        where: { ipAddress: ip },
        include: { 
            analytics: {
                include: { question: true }
            } 
        }
    });

    if (!user || !user.analytics) {
        return new Response(JSON.stringify([]), { headers: { 'Content-Type': 'application/json' }});
    }

    return new Response(JSON.stringify(user.analytics), { headers: { 'Content-Type': 'application/json' } });
}
