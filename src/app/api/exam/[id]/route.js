import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const { id } = await params;
  const exam = await prisma.exam.findUnique({
    where: { id: parseInt(id) },
    include: { questions: { select: { section: true } } }
  });

  if (!exam) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const sectionMap = {};
  exam.questions.forEach(q => {
    if (!sectionMap[q.section]) sectionMap[q.section] = 0;
    sectionMap[q.section]++;
  });

  const sections = Object.entries(sectionMap).map(([name, count]) => ({ name, count }));

  return NextResponse.json({
    exam: { id: exam.id, name: exam.name, description: exam.description, questionCount: exam.questions.length },
    sections
  });
}
