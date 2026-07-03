'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BarChart3 } from 'lucide-react';

export default function ReportsList() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      setLoading(false);
      return;
    }

    fetch(`/api/reports?deviceId=${deviceId}`)
      .then(r => r.json())
      .then(d => {
        setReports(d.reports || []);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg p-4 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-muted-fg mb-8">
          <Link href="/" className="hover:text-accent transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-muted-fg">Reports</span>
        </div>

        <h1 className="text-3xl font-extrabold text-fg mb-2">My Reports</h1>
        <p className="text-muted-fg text-sm mb-10">View your past exam and practice performance.</p>

        {reports.length === 0 ? (
          <div className="card text-center py-12 flex flex-col items-center">
            <BarChart3 className="text-muted-fg mb-4" size={48} strokeWidth={1} />
            <h2 className="text-fg font-bold text-lg mb-2">No reports yet</h2>
            <p className="text-muted-fg text-sm mb-6">Complete a practice session or take a test to generate a report.</p>
            <Link href="/" className="btn-primary">Go to Dashboard</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((r) => {
              const passed = r.score >= 70;
              return (
                <Link key={r.id} href={`/reports/${r.id}`} className="card hover:border-muted-fg transition-colors block">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`badge ${passed ? 'badge-green' : 'badge-red'}`}>
                          {passed ? 'PASS' : 'FAIL'}
                        </span>
                        <span className="badge badge-grey">{r.mode}</span>
                        <span className="text-xs text-muted-fg">{new Date(r.createdAt).toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-fg font-bold text-lg">{r.exam.name}</h3>
                      <p className="text-muted-fg text-sm mt-1">
                        {r.correctAnswers} / {r.totalQuestions} correct — {Math.floor(r.timeSpent / 60)}m {r.timeSpent % 60}s spent
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-muted-fg text-[10px] uppercase tracking-widest font-bold mb-1">Score</div>
                        <div className={`text-3xl font-black ${passed ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                          {r.score}%
                        </div>
                      </div>
                      <div className="text-border hidden md:block">→</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
