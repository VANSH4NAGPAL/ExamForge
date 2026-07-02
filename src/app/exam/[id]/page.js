'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { BookOpen, Timer } from 'lucide-react';

export default function ExamHubPage() {
  const params = useParams();
  const id = params.id;

  const [exam, setExam] = useState(null);
  const [sections, setSections] = useState([]);
  const [practiceResume, setPracticeResume] = useState(null);
  const [testResume, setTestResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/exam/${id}`)
      .then(r => r.json())
      .then(d => {
        setExam(d.exam);
        setSections(d.sections);
        setLoading(false);
      });

    // Check localStorage for saved sessions
    const savedPractice = localStorage.getItem(`practice_progress_${id}`);
    const savedTest = localStorage.getItem(`test_progress_${id}`);
    if (savedPractice) setPracticeResume(JSON.parse(savedPractice));
    if (savedTest) setTestResume(JSON.parse(savedTest));
  }, [id]);

  const clearPractice = () => {
    localStorage.removeItem(`practice_progress_${id}`);
    setPracticeResume(null);
  };

  const clearTest = () => {
    localStorage.removeItem(`test_progress_${id}`);
    setTestResume(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!exam) return <div className="p-10 text-fg">Exam not found.</div>;

  return (
    <div className="min-h-screen bg-bg p-10">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-fg mb-8">
          <Link href="/" className="hover:text-accent transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-muted-fg">{exam?.name}</span>
        </div>

        {/* Exam Header */}
        <div className="card mb-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14  bg-muted border border-border flex items-center justify-center flex-shrink-0">
                <span className="text-accent font-black text-xl">
                  {exam.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div>
                <h1 className="text-fg font-extrabold text-2xl tracking-tight">{exam.name}</h1>
                <p className="text-muted-fg text-sm mt-1">{exam.description}</p>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <span className="badge badge-yellow">{exam.questionCount} Questions</span>
              <span className="badge badge-grey">{sections.length} Sections</span>
            </div>
          </div>
        </div>

        {/* Resume Banners */}
        {practiceResume && (
          <div className="mb-4 p-4  border border-accent bg-accent/10 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="text-accent text-xs font-bold uppercase tracking-widest mb-1">Practice Session Saved</div>
              <div className="text-muted-fg text-sm">
                Left off at <strong className="text-fg">{practiceResume.sectionShort}</strong> — Question <strong className="text-fg">{(practiceResume.qIdx || 0) + 1}</strong>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/exam/${id}/practice?resume=1`} className="btn-primary text-sm py-2 px-4">Resume →</Link>
              <button onClick={clearPractice} className="btn-ghost text-sm py-2 px-4">Discard</button>
            </div>
          </div>
        )}

        {testResume && (
          <div className="mb-4 p-4  border border-green-500/30 bg-green-500/10 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="text-green-500 text-xs font-bold uppercase tracking-widest mb-1">Test Session Saved</div>
              <div className="text-muted-fg text-sm">
                <strong className="text-fg">{testResume.answeredCount}</strong> of <strong className="text-fg">{testResume.totalCount}</strong> answered — {testResume.timeLeft === null ? "Unlimited time" : <>{Math.floor(testResume.timeLeft / 60)}m {testResume.timeLeft % 60}s remaining</>}
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/exam/${id}/test?resume=1`} className="btn-primary text-sm py-2 px-4">Resume →</Link>
              <button onClick={clearTest} className="btn-ghost text-sm py-2 px-4">Discard</button>
            </div>
          </div>
        )}

        {/* Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Practice Mode */}
          <Link href={`/exam/${id}/practice`} className="card group block">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl text-fg group-hover:text-accent transition-colors"><BookOpen size={28} /></div>
              <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </div>
            <h2 className="text-fg font-bold text-lg mb-2 group-hover:text-accent transition-colors">Practice Mode</h2>
            <p className="text-muted-fg text-sm leading-relaxed mb-4">
              Learn at your own pace. Instant feedback and explanations after every question.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-grey">Untimed</span>
              <span className="badge badge-grey">Explanations</span>
            </div>
          </Link>

          {/* Test Mode */}
          <Link href={`/exam/${id}/test`} className="card group block">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl text-fg group-hover:text-accent transition-colors"><Timer size={28} /></div>
              <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </div>
            <h2 className="text-fg font-bold text-lg mb-2 group-hover:text-accent transition-colors">Test Mode</h2>
            <p className="text-muted-fg text-sm leading-relaxed mb-4">
              Simulate the real exam. Timed conditions, randomized questions, and final score.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-yellow">Timed</span>
              <span className="badge badge-grey">No Feedback</span>
            </div>
          </Link>
        </div>

        {/* Sections Overview */}
        <div className="card mt-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-fg mb-5">Sections in this Exam</h2>
          <div className="flex flex-col gap-1">
            {sections.map((sec, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-muted-fg text-sm font-mono">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-fg text-sm font-medium">{sec.name}</span>
                </div>
                <span className="text-muted-fg text-xs">{sec.count} Qs</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
