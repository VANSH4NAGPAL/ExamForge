'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { Timer, FileText, Folder } from 'lucide-react';

const FULL_TEST_MINUTES = 120;

export default function TestPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const examId = params.id;
  const shouldResume = searchParams.get('resume') === '1';

  const [examData, setExamData] = useState(null);
  const [sectionList, setSectionList] = useState([]);
  const [mode, setMode] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const timerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [fullTimerOption, setFullTimerOption] = useState('1min');
  const [sectionDropdownOpen, setSectionDropdownOpen] = useState(false);
  const [timerDropdownOpen, setTimerDropdownOpen] = useState(false);

  useEffect(() => {
    if (!examId) return;
    Promise.all([
      fetch(`/api/questions?examId=${examId}`).then(res => res.json()),
      new Promise(resolve => setTimeout(resolve, 1500))
    ])
    .then(([d]) => {
        // Shuffle options for all questions
        Object.keys(d.sections).forEach(key => {
          d.sections[key].forEach(q => {
            const opts = [
              { text: q.optionA, letter: 'A' },
              { text: q.optionB, letter: 'B' },
              { text: q.optionC, letter: 'C' },
              { text: q.optionD, letter: 'D' },
              { text: q.optionE, letter: 'E' },
              { text: q.optionF, letter: 'F' },
              { text: q.optionG, letter: 'G' }
            ].filter(o => o.text);
            
            q.shuffledOptions = opts;
          });
        });
        setExamData(d.sections);
        setSectionList(Object.keys(d.sections));

        // Resume saved test
        if (shouldResume) {
          const saved = localStorage.getItem(`test_progress_${examId}`);
          if (saved) {
            const parsed = JSON.parse(saved);
            setQuestions(parsed.questions);
            setAnswers(parsed.answers);
            setTimeLeft(parsed.timeLeft === null ? Infinity : parsed.timeLeft);
            setQIndex(parsed.qIndex || 0);
            setMode(parsed.mode);
            setSelectedSection(parsed.selectedSection);
          }
        }
        setLoading(false);
      });
  }, [examId, shouldResume]);

  // Auto-save test progress every time answers or timeLeft changes
  useEffect(() => {
    if (!mode || submitted || questions.length === 0) return;
    localStorage.setItem(`test_progress_${examId}`, JSON.stringify({
      questions,
      answers,
      timeLeft,
      qIndex,
      mode,
      selectedSection,
      answeredCount: Object.keys(answers).length,
      totalCount: questions.length
    }));
  }, [answers, timeLeft, examId, mode, submitted, qIndex, questions, selectedSection]);

  const startTest = (testMode, section = null) => {
    let qs = [];
    if (testMode === 'actual' || testMode === 'full') {
      qs = Object.values(examData).flat();
      // Shuffle all questions
      for (let i = qs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [qs[i], qs[j]] = [qs[j], qs[i]];
      }
      
      if (testMode === 'actual') {
        qs = qs.slice(0, 60);
        setTimeLeft(90 * 60); // 90 minutes
      } else {
        // Full Bank
        if (fullTimerOption === '1min') {
          setTimeLeft(qs.length * 60);
        } else {
          setTimeLeft(Infinity);
        }
      }
    } else {
      qs = examData[section] || [];
      const sectionTime = Math.max(30 * 60, Math.ceil(qs.length * 1.5) * 60);
      setTimeLeft(sectionTime);
    }
    setQuestions(qs);
    setAnswers({});
    setSubmitted(false);
    setQIndex(0);
    setMode(testMode === 'section' ? 'section' : testMode);
    setSelectedSection(section);
  };

  // Timer countdown
  useEffect(() => {
    if (timeLeft === null || submitted) return;
    if (timeLeft <= 0) { setSubmitted(true); return; }
    timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, submitted]);

  const formatTime = (s) => {
    if (s === Infinity) return "Unlimited";
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const handleSelect = (qId, letter) => {
    if (submitted) return;
    const q = questions.find(q => q.id === qId);
    if (!q) return;
    const correctLetters = q.correctAnswer.split(',').map(l => l.trim());
    const isMultiSelect = correctLetters.length > 1;

    setAnswers(a => {
      if (!isMultiSelect) return { ...a, [qId]: letter };
      
      const current = Array.isArray(a[qId]) ? a[qId] : (a[qId] ? [a[qId]] : []);
      if (current.includes(letter)) {
        const next = current.filter(l => l !== letter);
        return { ...a, [qId]: next.length > 0 ? next : null };
      } else {
        return { ...a, [qId]: [...current, letter].sort() };
      }
    });
  };

  const handleSubmit = async () => {
    clearTimeout(timerRef.current);
    localStorage.removeItem(`test_progress_${examId}`);
    setLoading(true);

    const deviceId = localStorage.getItem('deviceId');
    const bySection = {};
    let correctCount = 0;
    
    const computedResults = questions.map(q => {
      const selectedOriginal = answers[q.id];
      const correctLetters = q.correctAnswer.split(',').map(l => l.trim()).sort();
      
      let isCorrect = false;
      if (Array.isArray(selectedOriginal)) {
        isCorrect = JSON.stringify(selectedOriginal) === JSON.stringify(correctLetters);
      } else {
        isCorrect = selectedOriginal === correctLetters[0] && correctLetters.length === 1;
      }
      
      if (isCorrect) correctCount++;
      if (!bySection[q.section]) bySection[q.section] = { correct: 0, total: 0 };
      bySection[q.section].total++;
      if (isCorrect) bySection[q.section].correct++;

      return { 
        ...q, 
        selectedOriginal, 
        correctLetters, 
        isCorrect,
        shuffledOptions: q.shuffledOptions // pass it along so the report matches
      };
    });

    const total = questions.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const initialTime = mode === 'actual' ? 90 * 60 : (fullTimerOption === '1min' ? questions.length * 60 : Infinity);
    const timeSpent = isNaN(initialTime - timeLeft) ? 0 : Math.max(0, initialTime - (timeLeft === Infinity ? initialTime : timeLeft));

    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deviceId,
          examId,
          mode: mode === 'full' ? 'Test - Full' : (mode === 'actual' ? 'Test - Actual' : `Test - Section (${selectedSection?.split(':')[0] || 'Unknown'})`),
          score: percentage,
          totalQuestions: total,
          correctAnswers: correctCount,
          timeSpent,
          details: { bySection, results: computedResults }
        })
      });
      const data = await res.json();
      if (data.report) {
        router.push(`/reports/${data.report.id}`);
      } else {
        setSubmitted(true); // fallback
      }
    } catch (e) {
      console.error(e);
      setSubmitted(true); // fallback
    }
  };

  const handleLeave = () => setShowLeaveModal(true);

  const handleLeaveConfirm = (discard) => {
    clearTimeout(timerRef.current);
    if (discard) localStorage.removeItem(`test_progress_${examId}`);
    router.push(`/exam/${examId}`);
  };

  // Fallback Results computation if API fails
  const results = submitted ? questions.map(q => {
    const selected = answers[q.id];
    const correctLetters = q.correctAnswer.split(',').map(l => l.trim());
    const isCorrect = selected && correctLetters.includes(selected);
    return { ...q, selectedOriginal: selected, correctLetters, isCorrect };
  }) : [];

  const correct = results.filter(r => r.isCorrect).length;
  const total = questions.length;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const passed = percentage >= 70;

  const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center gap-4">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="animate-draw-svg text-accent">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className="text-muted-fg text-sm font-bold tracking-widest uppercase animate-pulse">Loading Test...</span>
      </div>
    );
  }

  // ── Mode Selection Screen ──
  if (!mode) {
    return (
      <div className="min-h-screen bg-bg p-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-muted-fg mb-8">
            <Link href="/" className="hover:text-accent transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="hover:text-accent cursor-pointer" onClick={() => window.history.back()}>Exam</span>
            <span>/</span>
            <span className="text-[#888]">Test Mode</span>
          </div>

          <h1 className="text-3xl font-extrabold text-fg mb-2">Configure Your Test</h1>
          <p className="text-muted-fg text-sm mb-10">Select your test scope. No feedback is given until you submit.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {/* Actual Exam Simulation */}
            <div className="card cursor-pointer hover:border-accent transition-colors" onClick={() => startTest('actual')}>
              <div className="text-3xl mb-4 text-fg"><Timer size={32} /></div>
              <h2 className="text-fg font-bold text-lg mb-2">Actual Exam</h2>
              <p className="text-muted-fg text-sm mb-4">60 questions selected randomly. <strong className="text-[#888]">90 minutes.</strong></p>
              <span className="badge badge-yellow">Recommended</span>
            </div>

            {/* Full Exam */}
            <div className="card flex flex-col">
              <div className="text-3xl mb-4 text-fg"><FileText size={32} /></div>
              <h2 className="text-fg font-bold text-lg mb-2">Full Question Bank</h2>
              <p className="text-muted-fg text-sm mb-4 flex-1">All {Object.values(examData).flat().length} questions shuffled randomly.</p>
              
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <button 
                    onClick={() => setTimerDropdownOpen(!timerDropdownOpen)} 
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-left px-3 py-3 text-sm focus:border-[#FFD500] hover:bg-[#222] transition-colors flex items-center justify-between"
                  >
                    <span className="text-fg">
                      {fullTimerOption === '1min' ? "1 min per question" : "Unlimited time"}
                    </span>
                    <svg className={`w-4 h-4 text-muted-fg transition-transform ${timerDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  {timerDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-[#1A1A1A] border border-[#2A2A2A] shadow-xl">
                      <button
                        onClick={() => { setFullTimerOption('1min'); setTimerDropdownOpen(false); }}
                        className="w-full text-left px-4 py-3 hover:bg-[#222] transition-colors text-fg text-sm border-b border-[#2A2A2A]/50"
                      >
                        1 min per question
                      </button>
                      <button
                        onClick={() => { setFullTimerOption('unlimited'); setTimerDropdownOpen(false); }}
                        className="w-full text-left px-4 py-3 hover:bg-[#222] transition-colors text-fg text-sm"
                      >
                        Unlimited time
                      </button>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => startTest('full')}
                  className="btn-primary"
                >
                  Start Full Bank →
                </button>
              </div>
            </div>

            {/* Section Test */}
            <div className="card">
              <div className="text-3xl mb-4 text-fg"><Folder size={32} /></div>
              <h2 className="text-fg font-bold text-lg mb-2">Section Test</h2>
              <p className="text-muted-fg text-sm mb-4">Pick a specific section to focus on.</p>
              <div className="relative mb-4">
                <button 
                  onClick={() => setSectionDropdownOpen(!sectionDropdownOpen)} 
                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-left px-3 py-3 text-sm focus:border-[#FFD500] hover:bg-[#222] transition-colors flex items-center justify-between"
                >
                  <span className={selectedSection ? "text-fg truncate" : "text-muted-fg truncate"}>
                    {selectedSection 
                      ? selectedSection.replace(/[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}]/gu, '').trim()
                      : "Select a section..."}
                  </span>
                  <svg className={`w-4 h-4 text-muted-fg transition-transform ${sectionDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                
                {sectionDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-[#1A1A1A] border border-[#2A2A2A] shadow-xl max-h-60 overflow-y-auto">
                    {sectionList.map((s, i) => {
                      const cleanName = s.replace(/[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}]/gu, '').trim();
                      const qCount = examData[s].length;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            setSelectedSection(s);
                            setSectionDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-[#222] transition-colors flex items-center justify-between border-b border-[#2A2A2A]/50 last:border-0"
                        >
                          <span className="text-fg text-sm font-medium truncate pr-4 text-left flex-1 min-w-0" title={cleanName}>{cleanName}</span>
                          <span className="text-xs text-muted-fg bg-[#111] px-2 py-1 rounded flex-shrink-0 whitespace-nowrap">{qCount} Qs</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              <button
                disabled={!selectedSection}
                onClick={() => selectedSection && startTest('section', selectedSection)}
                className="btn-primary disabled:opacity-30"
              >
                Start Section Test →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Results Screen ──
  if (submitted) {
    const bySection = {};
    results.forEach(r => {
      if (!bySection[r.section]) bySection[r.section] = { correct: 0, total: 0 };
      bySection[r.section].total++;
      if (r.isCorrect) bySection[r.section].correct++;
    });

    return (
      <div className="min-h-screen bg-bg p-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold text-fg mb-2">Test Complete</h1>
          <p className="text-muted-fg text-sm mb-8">Here&apos;s your performance breakdown.</p>

          {/* Score Card */}
          <div className={`card mb-6 border-2 ${passed ? 'border-[#22C55E]' : 'border-[#EF4444]'}`}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="text-6xl font-black text-fg mb-1">{percentage}%</div>
                <div className="text-muted-fg text-sm">{correct} out of {total} correct</div>
              </div>
              <div className={`text-5xl font-black ${passed ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                {passed ? 'PASS' : 'FAIL'}
              </div>
            </div>
          </div>

          {/* Section Breakdown */}
          {Object.keys(bySection).length > 1 && (
            <div className="card mb-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-fg mb-4">Section Breakdown</h2>
              {Object.entries(bySection).map(([sec, stats], i) => {
                const pct = Math.round((stats.correct / stats.total) * 100);
                return (
                  <div key={i} className="mb-4 last:mb-0">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#888] truncate pr-4">{sec.split(':')[0].trim()}</span>
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
          <div className="card mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-fg mb-4">Incorrect Answers ({results.filter(r => !r.isCorrect).length})</h2>
            <div className="flex flex-col gap-6">
              {results.filter(r => !r.isCorrect).map((r, i) => (
                <div key={i}>
                  <p className="text-muted-fg text-sm mb-3 font-medium">{r.qNumber}. {r.questionText}</p>
                  {(r.shuffledOptions || []).map((opt, j) => {
                    const letter = optionLetters[j];
                    const isC = r.correctLetters.includes(opt.letter);
                    const isSelected = Array.isArray(r.selectedOriginal) 
                      ? r.selectedOriginal.includes(opt.letter) 
                      : r.selectedOriginal === opt.letter;
                    return (
                      <div key={j} className={`option-tile answered mb-2 ${isC ? 'correct' : isSelected ? 'wrong' : 'dimmed'}`}>
                        <span className="option-letter">{letter}</span>
                        <span className="text-sm">{opt.text.replace(/^[A-F]\)\s*/, '')}</span>
                      </div>
                    );
                  })}
                  <div className="explanation-box mt-2 text-xs">{r.explanation}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setMode(null)} className="btn-primary">Take Another Test →</button>
            <Link href="/" className="btn-ghost">Back to Dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Active Test ──
  const q = questions[qIndex];
  const requiredCorrect = q?.correctAnswer ? q.correctAnswer.split(',').map(l => l.trim()) : [];
  const isMultiSelect = requiredCorrect.length > 1;

  return (
    <div className="min-h-screen bg-bg flex flex-col lg:flex-row">
      {/* Leave Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="card max-w-sm w-full">
            <h2 className="text-fg font-bold text-lg mb-2">Leave Test?</h2>
            <p className="text-muted-fg text-sm mb-2 leading-relaxed">
              Your answers and timer are saved. You can resume from exactly where you left off.
            </p>
            <p className="text-muted-fg text-sm mb-6">
              <strong className="text-fg">{Object.keys(answers).length}</strong> of <strong className="text-fg">{questions.length}</strong> answered — {timeLeft === Infinity ? "Unlimited time" : <><strong className="text-fg">{formatTime(timeLeft)}</strong> remaining</>}.
            </p>
            <div className="flex flex-col gap-2">
              <button onClick={() => handleLeaveConfirm(false)} className="btn-primary w-full justify-center">
                Save & Leave
              </button>
              <button onClick={() => handleLeaveConfirm(true)} className="btn-ghost w-full justify-center text-[#EF4444] border-border hover:border-[#EF4444]">
                Discard & Leave
              </button>
              <button onClick={() => setShowLeaveModal(false)} className="btn-ghost w-full justify-center mt-1">
                Continue Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <button onClick={handleLeave} className="flex items-center gap-2 group w-full text-left">
            <div className="w-7 h-7 bg-[#FFD500]  flex items-center justify-center">
              <span className="text-black font-black text-xs">E</span>
            </div>
            <span className="text-fg font-bold text-sm group-hover:text-accent transition-colors">ExamForge</span>
          </button>
        </div>

        {/* Timer */}
        <div className="mx-3 my-2 p-3  bg-[#141414] border border-border">
          <div className="text-[10px] uppercase tracking-widest text-muted-fg mb-1">Time Remaining</div>
          <div className={`font-black text-2xl ${timeLeft < 300 ? 'text-[#EF4444]' : 'text-fg'}`}>
            {formatTime(timeLeft)}
          </div>
          <div className="progress-bar-bg mt-2">
            <div className="progress-bar-fill" style={{ width: `${(answers && Object.keys(answers).length / questions.length) * 100}%` }}></div>
          </div>
          <div className="text-[10px] text-muted-fg mt-1">{Object.keys(answers).length} / {questions.length} answered</div>
        </div>

        {/* Leave button */}
        <div className="px-3 mb-2">
          <button onClick={handleLeave} className="btn-ghost w-full justify-center text-xs py-2">
            ← Leave Session
          </button>
        </div>

        <div className="sidebar-section-label">Questions</div>
        <div className="px-3 grid grid-cols-5 gap-1">
          {questions.map((q, i) => (
            <button
              key={i}
              onClick={() => setQIndex(i)}
              className={`aspect-square  text-xs font-bold transition-colors ${
                i === qIndex ? 'bg-[#FFD500] text-black' :
                answers[q.id] ? 'bg-[#1A3A1A] text-[#22C55E]' :
                'bg-[#1A1A1A] text-muted-fg hover:bg-[#222] hover:text-fg'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main className="lg:ml-[260px] flex-1 p-4 md:p-10 flex flex-col">
        <div className="max-w-3xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 text-xs text-muted-fg">
              <span className="badge badge-grey">Test Mode</span>
              {selectedSection && <span className="text-muted-fg">{selectedSection.split(':')[0]}</span>}
            </div>
            <div className="flex gap-2">
              <button onClick={handleLeave} className="btn-ghost text-xs py-2 px-3">← Leave</button>
              <button onClick={handleSubmit} className="btn-primary">Submit Test →</button>
            </div>
          </div>

          {/* Question */}
          <div className="mb-4">
            <div className="flex gap-2 items-center flex-wrap mb-4">
              <span className="badge badge-grey">{q?.qNumber}</span>
              {isMultiSelect && <span className="badge badge-yellow">Choose {requiredCorrect.length}</span>}
            </div>
            <h2 className="text-fg text-xl font-semibold leading-relaxed mb-6">{q?.questionText}</h2>
            {/* Options */}
            <div className="flex flex-col gap-3">
              {(questions[qIndex]?.shuffledOptions || []).map((opt, i) => {
                const qAns = answers[questions[qIndex].id];
                const isSelected = Array.isArray(qAns) ? qAns.includes(opt.letter) : qAns === opt.letter;
                return (
                  <div
                    key={i}
                    onClick={() => handleSelect(questions[qIndex].id, opt.letter)}
                    className={`option-tile ${isSelected ? 'selected-pending' : ''}`}
                  >
                    <span className="option-letter">{optionLetters[i]}</span>
                    <span>{opt.text.replace(/^[A-F]\)\s*/, '')}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <button onClick={() => setQIndex(q => Math.max(0, q - 1))} className="btn-ghost" disabled={qIndex === 0}>
              ← Previous
            </button>
            <button onClick={() => setQIndex(q => Math.min(questions.length - 1, q + 1))} className="btn-primary" disabled={qIndex === questions.length - 1}>
              Next →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
