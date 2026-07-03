import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import ThemeToggle from '@/components/ThemeToggle';
import DashboardTabs from '@/components/DashboardTabs';

const prisma = new PrismaClient();

async function getExams() {
  const exams = await prisma.exam.findMany({
    include: {
      _count: { select: { questions: true } }
    }
  });
  return exams;
}

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const exams = await getExams();

  return (
    <div className="min-h-screen bg-bg p-4 md:p-10">
      {/* Header */}
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent  flex items-center justify-center">
                <span className="text-accent-fg font-black text-sm">E</span>
              </div>
              <span className="text-fg font-bold text-lg tracking-tight">ExamForge</span>
            </div>
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-4xl font-extrabold text-fg tracking-tight mb-2">Your Exam Dashboard</h1>
              <p className="text-muted-fg text-base">Choose an exam to practice, test yourself, or review your analytics.</p>
            </div>
            <Link href="/reports" className="btn-ghost">View All Reports →</Link>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="stat-chip">
            <span className="value">{exams.length}</span>
            <span className="label">Available Exams</span>
          </div>
          <div className="stat-chip">
            <span className="value">{exams.reduce((a, e) => a + e._count.questions, 0)}</span>
            <span className="label">Total Questions</span>
          </div>
          <div className="stat-chip">
            <span className="value text-accent">0%</span>
            <span className="label">Overall Mastery</span>
          </div>
        </div>

        {/* Content Grids via Client Component */}
        <DashboardTabs exams={exams} />
      </div>
    </div>
  );
}
