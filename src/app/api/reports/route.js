import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const data = await req.json();
    const { deviceId, examId, mode, score, totalQuestions, correctAnswers, timeSpent, details } = data;

    if (!deviceId) return NextResponse.json({ error: 'Missing deviceId' }, { status: 400 });

    // Upsert User to ensure deviceId exists
    const user = await prisma.user.upsert({
      where: { deviceId },
      update: {},
      create: { deviceId }
    });

    const report = await prisma.report.create({
      data: {
        examId: parseInt(examId),
        userId: user.id,
        mode,
        score: parseFloat(score),
        totalQuestions: parseInt(totalQuestions),
        correctAnswers: parseInt(correctAnswers),
        timeSpent: parseInt(timeSpent || 0),
        details: JSON.stringify(details),
      }
    });

    return NextResponse.json({ success: true, report });
  } catch (error) {
    console.error('Error creating report:', error);
    return NextResponse.json({ error: 'Failed to create report' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const deviceId = searchParams.get('deviceId');

    if (!deviceId) return NextResponse.json({ error: 'Missing deviceId' }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { deviceId } });
    if (!user) return NextResponse.json({ reports: [] });

    const reports = await prisma.report.findMany({
      where: { userId: user.id },
      include: { exam: { select: { name: true } } },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ reports });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 });
  }
}
