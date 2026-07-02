import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const body = await request.json();
        const { ip, currentSection, currentQuestion } = body;

        let user = await prisma.user.findUnique({ where: { ipAddress: ip } });
        if (!user) {
            user = await prisma.user.create({ data: { ipAddress: ip } });
        }

        const progress = await prisma.progress.upsert({
            where: { userId: user.id },
            update: { currentSection, currentQuestion },
            create: { userId: user.id, currentSection, currentQuestion }
        });

        return new Response(JSON.stringify(progress), { headers: { 'Content-Type': 'application/json' } });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

export async function GET(request) {
    const url = new URL(request.url);
    const ip = url.searchParams.get('ip') || 'unknown';

    const user = await prisma.user.findUnique({ 
        where: { ipAddress: ip },
        include: { progress: true }
    });

    if (!user || !user.progress) {
        return new Response(JSON.stringify(null), { headers: { 'Content-Type': 'application/json' }});
    }

    return new Response(JSON.stringify(user.progress), { headers: { 'Content-Type': 'application/json' } });
}
