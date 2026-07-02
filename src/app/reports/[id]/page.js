'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ReportPage() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/reports/${id}`)
      .then(r => r.json())
      .then(d => {
        setReport(d.report);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FFD500] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!report) {
    return <div className="min-h-screen bg-bg p-10 text-fg">Report not found.</div>;
  }

  const details = JSON.parse(report.details);
  const bySection = details.bySection || {};
  const results = details.results || [];
  const passed = report.score >= 70;
  const isPractice = report.mode.includes('Practice');
  const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

  // Pacing & Readiness Calculations
  let pacing = 0;
  let pacingText = "N/A";
  let pacingColor = "text-muted-fg";
  let readinessScore = report.score;

  if (!isPractice && report.totalQuestions > 0 && report.timeSpent > 0) {
    pacing = Math.round(report.timeSpent / report.totalQuestions);
    
    if (pacing < 30) {
      pacingText = "Rushing";
      pacingColor = "text-[#EF4444]";
      readinessScore = Math.max(0, readinessScore - 10);
    } else if (pacing > 90) {
      pacingText = "Too Slow";
      pacingColor = "text-[#FFD500]";
      const penalty = Math.floor((pacing - 90) / 5);
      readinessScore = Math.max(0, readinessScore - penalty);
    } else {
      pacingText = "Optimal";
      pacingColor = "text-[#22C55E]";
    }
  }

  // Targeted Focus Area
  let focusArea = null;
  let maxWrong = -1;
  Object.entries(bySection).forEach(([sec, stats]) => {
    const wrong = stats.total - stats.correct;
    if (wrong > maxWrong) {
      maxWrong = wrong;
      focusArea = { name: sec.split(':')[0].trim(), count: wrong };
    }
  });

  return (
    <div className="min-h-screen bg-bg p-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-muted-fg mb-8">
          <Link href="/" className="hover:text-accent transition-colors">Dashboard</Link>
          <span>/</span>
          <Link href="/reports" className="hover:text-accent transition-colors">Reports</Link>
          <span>/</span>
          <span className="text-muted-fg">Report Details</span>
        </div>

        <h1 className="text-3xl font-extrabold text-fg mb-2">{report.mode.includes('Test') ? 'Test Complete' : 'Practice Report'}</h1>
        <p className="text-muted-fg text-sm mb-8">{report.exam?.name} — {new Date(report.createdAt).toLocaleString()}</p>

        {/* Top Analytics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Accuracy Card */}
          <div className={`card border-2 ${passed ? 'border-[#22C55E]' : 'border-[#EF4444]'}`}>
            <div className="text-muted-fg text-xs uppercase font-bold tracking-widest mb-1">Accuracy</div>
            <div className="text-5xl font-black text-fg mb-1">{report.score}%</div>
            <div className="text-muted-fg text-sm">{report.correctAnswers} / {report.totalQuestions} correct</div>
          </div>

          {!isPractice ? (
            <>
              {/* Pacing Card */}
              <div className="card">
                <div className="text-muted-fg text-xs uppercase font-bold tracking-widest mb-1">Avg Pacing</div>
                <div className="text-5xl font-black text-fg mb-1">{pacing}s</div>
                <div className={`text-sm font-bold ${pacingColor}`}>{pacingText} (Target: 90s)</div>
              </div>
              {/* Readiness Score Card */}
              <div className="card">
                <div className="text-muted-fg text-xs uppercase font-bold tracking-widest mb-1">Readiness</div>
                <div className="text-5xl font-black text-fg mb-1">{readinessScore}</div>
                <div className="text-muted-fg text-sm">Weighted Score (0-100)</div>
              </div>
            </>
          ) : (
            <div className="card md:col-span-2">
              <div className="text-muted-fg text-xs uppercase font-bold tracking-widest mb-1">Practice Mode</div>
              <div className="text-2xl font-black text-fg mb-1 mt-3">Accuracy-Only Analysis</div>
              <div className="text-muted-fg text-sm">Pacing and Readiness are disabled for untimed practice sessions.</div>
            </div>
          )}
        </div>

        {/* Targeted Study Plan */}
        {focusArea && focusArea.count > 0 && (
          <div className="card mb-6 border-accent bg-accent/5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Targeted Study Plan</h2>
            <p className="text-fg text-lg">
              You lost the most points ({focusArea.count} errors) in <strong className="font-bold">&quot;{focusArea.name}&quot;</strong>.
            </p>
            <p className="text-muted-fg text-sm mt-1">Focus your next practice session heavily on this section to maximize your score increase.</p>
          </div>
        )}

        {/* Section Breakdown */}
        {Object.keys(bySection).length > 1 && (
          <div className="card mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-fg mb-4">Section Breakdown</h2>
            {Object.entries(bySection).map(([sec, stats], i) => {
              const pct = Math.round((stats.correct / stats.total) * 100);
              return (
                <div key={i} className="mb-4 last:mb-0">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-fg truncate pr-4">{sec.split(':')[0].trim()}</span>
                    <span className={`font-bold flex-shrink-0 ${pct >= 70 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>{pct}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${pct}%`, background: pct >= 70 ? '#22C55E' : '#EF4444' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Review wrong answers */}
        {results.filter(r => !r.isCorrect).length > 0 && (
          <div className="card mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-fg mb-4">Incorrect Answers ({results.filter(r => !r.isCorrect).length})</h2>
            <div className="flex flex-col gap-6">
              {results.filter(r => !r.isCorrect).map((r, i) => (
                <div key={i}>
                  <p className="text-muted-fg text-sm mb-3 font-medium">{r.qNumber}. {r.questionText}</p>
                  {(r.shuffledOptions || [
                    { text: r.optionA, letter: 'A' },
                    { text: r.optionB, letter: 'B' },
                    { text: r.optionC, letter: 'C' },
                    { text: r.optionD, letter: 'D' },
                    { text: r.optionE, letter: 'E' },
                    { text: r.optionF, letter: 'F' }
                  ].filter(o => o.text)).map((opt, j) => {
                    const displayLetter = optionLetters[j];
                    const isC = r.correctLetters.includes(opt.letter);
                    const isSelected = r.selectedOriginal === opt.letter;
                    return (
                      <div key={j} className={`option-tile answered mb-2 ${isC ? 'correct' : isSelected ? 'wrong' : 'dimmed'}`}>
                        <span className="option-letter">{displayLetter}</span>
                        <span className="text-sm">{opt.text.replace(/^[A-F]\)\s*/, '')}</span>
                      </div>
                    );
                  })}
                  <div className="explanation-box mt-2 text-xs border-l-2 border-accent bg-accent/5 p-3 rounded-none text-muted-fg">{r.explanation}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Link href={`/exam/${report.examId}`} className="btn-primary">Return to Exam Hub →</Link>
          <Link href="/reports" className="btn-ghost">View All Reports</Link>
        </div>
      </div>
    </div>
  );
}
