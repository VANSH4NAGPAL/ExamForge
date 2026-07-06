'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { AlertTriangle, Check, X, Timer, FileText, Folder } from 'lucide-react';

export default function PracticePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const examId = params.id;
  const shouldResume = searchParams.get('resume') === '1';

  const [examData, setExamData] = useState(null);
  const [mode, setMode] = useState(null);
  const [selectedSectionConfig, setSelectedSectionConfig] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [sections, setSections] = useState({});
  const [sectionList, setSectionList] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [sessionScore, setSessionScore] = useState({ correct: 0, total: 0 });
  const [answerHistory, setAnswerHistory] = useState([]); 
  const [loading, setLoading] = useState(true);
  
  // 'hidden' | 'analysis' | 'confirm'
  const [leaveStep, setLeaveStep] = useState('hidden');

  useEffect(() => {
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
            
            for (let i = opts.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [opts[i], opts[j]] = [opts[j], opts[i]];
            }
            
            q.shuffledOptions = opts;
          });
        });
        setExamData(d.sections);

        if (shouldResume) {
          const saved = localStorage.getItem(`practice_progress_${examId}`);
          if (saved) {
            const parsed = JSON.parse(saved);
            setMode(parsed.mode || 'full');
            setSections(parsed.sections || d.sections);
            setSectionList(Object.keys(parsed.sections || d.sections));
            setActiveSection(parsed.section || Object.keys(parsed.sections || d.sections)[0]);
            setQIndex(parsed.qIdx || 0);
            if (parsed.history) {
              setAnswerHistory(parsed.history);
              const correct = parsed.history.filter(h => h.isCorrect).length;
              setSessionScore({ correct, total: parsed.history.length });
            }
          }
        }
        setLoading(false);
      });
  }, [examId, shouldResume]);

  // Auto-save on every change
  useEffect(() => {
    if (!mode || !activeSection || loading) return;
    const sectionShort = activeSection.split(':')[0].trim();
    localStorage.setItem(`practice_progress_${examId}`, JSON.stringify({
      mode,
      sections,
      section: activeSection,
      qIdx: qIndex,
      sectionShort,
      history: answerHistory,
    }));
  }, [mode, activeSection, qIndex, examId, loading, answerHistory, sections]);

  const startPractice = (practiceMode, section = null) => {
    let filteredSections = {};
    if (practiceMode === 'actual' || practiceMode === 'full') {
      let qs = Object.values(examData).flat();
      for (let i = qs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [qs[i], qs[j]] = [qs[j], qs[i]];
      }
      if (practiceMode === 'actual') qs = qs.slice(0, 60);
      filteredSections = { "Practice Set": qs };
    } else {
      filteredSections = { [section]: examData[section] || [] };
    }
    
    setSections(filteredSections);
    const keys = Object.keys(filteredSections);
    setSectionList(keys);
    setActiveSection(keys[0]);
    setMode(practiceMode);
    setQIndex(0);
    setAnswerHistory([]);
    setSessionScore({ correct: 0, total: 0 });
    setAnswered(null);
    setSelectedOptions([]);
  };

  const currentQuestions = activeSection ? (sections[activeSection] || []) : [];
  const question = currentQuestions[qIndex];
  const answeredCount = answerHistory.filter(h => h.section === activeSection).length;
  const progress = currentQuestions.length > 0 ? (answeredCount / currentQuestions.length) * 100 : 0;

  const handleAnswer = (letter) => {
    if (answered) return;
    const correctLetters = question.correctAnswer.split(',').map(l => l.trim()).sort();
    const isMultiSelect = correctLetters.length > 1;

    if (isMultiSelect) {
      if (selectedOptions.includes(letter)) {
        setSelectedOptions(selectedOptions.filter(l => l !== letter));
      } else {
        setSelectedOptions([...selectedOptions, letter].sort());
      }
    } else {
      const isCorrect = correctLetters.includes(letter);
      setAnswered({ selected: letter, correctLetters, isCorrect });
      setSessionScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));
      setAnswerHistory(h => [...h, {
        qNumber: question.qNumber,
        questionText: question.questionText,
        section: activeSection,
        sectionShort: activeSection.split(':')[0].trim(),
        isCorrect,
        selectedOriginal: letter,
        correctLetters,
        shuffledOptions: question.shuffledOptions,
        explanation: question.explanation,
      }]);
    }
  };

  const submitMultiAnswer = () => {
    if (answered) return;
    const correctLetters = question.correctAnswer.split(',').map(l => l.trim()).sort();
    const isCorrect = JSON.stringify(selectedOptions) === JSON.stringify(correctLetters);
    
    setAnswered({ selected: selectedOptions, correctLetters, isCorrect });
    setSessionScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));
    setAnswerHistory(h => [...h, {
      qNumber: question.qNumber,
      questionText: question.questionText,
      section: activeSection,
      sectionShort: activeSection.split(':')[0].trim(),
      isCorrect,
      selectedOriginal: selectedOptions,
      correctLetters,
      shuffledOptions: question.shuffledOptions,
      explanation: question.explanation,
    }]);
  };

  // Restore answered state when navigating to a question that was already answered
  const restoreAnsweredState = (targetQ) => {
    if (!targetQ) return;
    const hist = answerHistory.find(h => h.qNumber === targetQ.qNumber);
    if (hist) {
      setAnswered({
        selected: hist.selectedOriginal,
        correctLetters: hist.correctLetters,
        isCorrect: hist.isCorrect,
        isReview: true, // mark as review so we know it's read-only
      });
    } else {
      setAnswered(null);
    }
    setSelectedOptions([]);
  };

  const handleNext = () => {
    const nextIdx = qIndex < currentQuestions.length - 1 ? qIndex + 1 : 0;
    const nextQ = currentQuestions[nextIdx];
    setQIndex(nextIdx);
    restoreAnsweredState(nextQ);
  };

  const handlePrev = () => {
    const prevIdx = Math.max(0, qIndex - 1);
    const prevQ = currentQuestions[prevIdx];
    setQIndex(prevIdx);
    restoreAnsweredState(prevQ);
  };

  const switchSection = (sec) => {
    setActiveSection(sec);
    setQIndex(0);
    setAnswered(null);
    setSelectedOptions([]);
  };

  const handleLeave = () => setLeaveStep('confirm');

  const handleLeaveConfirm = (discard) => {
    if (discard) {
      localStorage.removeItem(`practice_progress_${examId}`);
    }
    // Save & Leave does NOT generate a report.
    router.push(`/exam/${examId}`);
  };

  const handleFinishAndGenerateReport = async () => {
    const deviceId = localStorage.getItem('deviceId');
    const analysisData = buildAnalysis();
    
    if (analysisData) {
      try {
        const res = await fetch('/api/reports', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            deviceId,
            examId,
            mode: mode === 'full' ? 'Practice - Full' : (mode === 'actual' ? 'Practice - Actual' : `Practice - Section (${activeSection?.split(':')[0] || 'Unknown'})`),
            score: analysisData.pct,
            totalQuestions: analysisData.totalAnswered,
            correctAnswers: analysisData.totalCorrect,
            timeSpent: 0,
            details: { 
              bySection: analysisData.sectionsSorted.reduce((acc, curr) => ({ ...acc, [curr.name]: { correct: curr.correct, total: curr.total } }), {}),
              results: analysisData.wrongAnswers.map(h => ({
                qNumber: h.qNumber,
                questionText: h.questionText,
                shuffledOptions: h.shuffledOptions,
                correctLetters: h.correctLetters,
                selectedOriginal: h.selectedOriginal,
                explanation: h.explanation,
                isCorrect: false
              }))
            }
          })
        });
        const data = await res.json();
        if (data.report) {
          localStorage.removeItem(`practice_progress_${examId}`);
          router.push(`/reports/${data.report.id}`);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }
    
    // Fallback if fails
    localStorage.removeItem(`practice_progress_${examId}`);
    router.push(`/exam/${examId}`);
  };

  const getOptionStyle = (letter) => {
    if (!answered) {
      return selectedOptions.includes(letter) ? 'option-tile selected-pending' : 'option-tile';
    }
    const { selected, correctLetters } = answered;
    const isCorrect = correctLetters.includes(letter);
    const isSelected = Array.isArray(selected) ? selected.includes(letter) : selected === letter;
    
    if (isCorrect) return 'option-tile correct answered';
    if (isSelected && !isCorrect) return 'option-tile wrong answered';
    return 'option-tile dimmed answered';
  };

  const buildAnalysis = () => {
    if (answerHistory.length === 0) return null;
    const totalAnswered = answerHistory.length;
    const totalCorrect = answerHistory.filter(h => h.isCorrect).length;
    const pct = Math.round((totalCorrect / totalAnswered) * 100);

    const bySection = {};
    answerHistory.forEach(h => {
      if (!bySection[h.sectionShort]) bySection[h.sectionShort] = { correct: 0, total: 0 };
      bySection[h.sectionShort].total++;
      if (h.isCorrect) bySection[h.sectionShort].correct++;
    });

    const sectionsSorted = Object.entries(bySection)
      .map(([name, stats]) => ({ name, ...stats, pct: Math.round((stats.correct / stats.total) * 100) }))
      .sort((a, b) => a.pct - b.pct);

    const weakest = sectionsSorted.filter(s => s.pct < 70);
    const strongest = [...sectionsSorted].sort((a, b) => b.pct - a.pct).filter(s => s.pct >= 70);
    const wrongAnswers = answerHistory.filter(h => !h.isCorrect);

    return { totalAnswered, totalCorrect, pct, sectionsSorted, weakest, strongest, wrongAnswers };
  };

  const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const options = question?.shuffledOptions || [];
  const requiredCorrect = question?.correctAnswer ? question.correctAnswer.split(',').map(l => l.trim()) : [];
  const isMultiSelect = requiredCorrect.length > 1;

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center gap-4">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="animate-draw-svg text-accent">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
        <span className="text-muted-fg text-sm font-bold tracking-widest uppercase animate-pulse">Loading Practice...</span>
      </div>
    );
  }

  // ── Mode Selection Screen ──
  if (!mode) {
    const rawSectionList = examData ? Object.keys(examData) : [];
    const totalQuestions = examData ? Object.values(examData).flat().length : 0;
    return (
      <div className="min-h-screen bg-bg p-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-muted-fg mb-8">
            <Link href="/" className="hover:text-accent transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="hover:text-accent cursor-pointer" onClick={() => window.history.back()}>Exam</span>
            <span>/</span>
            <span className="text-muted-fg">Practice Mode</span>
          </div>

          <h1 className="text-3xl font-extrabold text-fg mb-2">Configure Your Practice</h1>
          <p className="text-muted-fg text-sm mb-10">Untimed practice with instant feedback.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {/* Actual Exam Simulation */}
            <div className="card cursor-pointer hover:border-accent transition-colors" onClick={() => startPractice('actual')}>
              <div className="text-3xl mb-4 text-fg"><Timer size={32} /></div>
              <h2 className="text-fg font-bold text-lg mb-2">Random 60</h2>
              <p className="text-muted-fg text-sm mb-4">60 questions selected randomly from all sections. Untimed.</p>
              <span className="badge badge-yellow">Recommended</span>
            </div>

            {/* Full Exam */}
            <div className="card flex flex-col cursor-pointer hover:border-accent transition-colors" onClick={() => startPractice('full')}>
              <div className="text-3xl mb-4 text-fg"><FileText size={32} /></div>
              <h2 className="text-fg font-bold text-lg mb-2">Full Question Bank</h2>
              <p className="text-muted-fg text-sm mb-4 flex-1">All {totalQuestions} questions shuffled randomly.</p>
              <span className="badge badge-grey">Untimed</span>
            </div>

            {/* Section Test */}
            <div className="card">
              <div className="text-3xl mb-4 text-fg"><Folder size={32} /></div>
              <h2 className="text-fg font-bold text-lg mb-2">Section Practice</h2>
              <p className="text-muted-fg text-sm mb-4">Pick a specific section to focus on.</p>
              <div className="relative mb-4">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)} 
                  className="w-full bg-[#1A1A1A] border border-border text-left px-3 py-3 text-sm focus:border-accent hover:bg-[#222] transition-colors flex items-center justify-between"
                >
                  <span className={selectedSectionConfig ? "text-fg truncate" : "text-muted-fg truncate"}>
                    {selectedSectionConfig 
                      ? selectedSectionConfig.replace(/[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}]/gu, '').trim()
                      : "Select a section..."}
                  </span>
                  <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                
                {dropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-[#1A1A1A] border border-border shadow-xl max-h-60 overflow-y-auto">
                    {rawSectionList.map((s, i) => {
                      const cleanName = s.replace(/[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}]/gu, '').trim();
                      const qCount = examData[s].length;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            setSelectedSectionConfig(s);
                            setDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-[#222] transition-colors flex items-center justify-between border-b border-border/50 last:border-0"
                        >
                          <span className="text-fg text-sm font-medium truncate pr-4 text-left flex-1 min-w-0" title={cleanName}>{cleanName}</span>
                          <span className="text-xs text-muted-fg bg-[#111] px-2 py-1 rounded whitespace-nowrap flex-shrink-0">{qCount} Qs</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              <button
                disabled={!selectedSectionConfig}
                onClick={() => selectedSectionConfig && startPractice('section', selectedSectionConfig)}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Section →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const analysis = leaveStep !== 'hidden' ? buildAnalysis() : null;

  const AnalysisModal = () => {
    if (leaveStep === 'hidden') return null;

    if (leaveStep === 'confirm') {
      return (
        <div className="fixed inset-0 z-50 bg-bg/80 flex items-center justify-center p-4">
          <div className="card max-w-sm w-full">
            <h2 className="text-fg font-bold text-lg mb-2">Save your progress?</h2>
            <p className="text-muted-fg text-sm mb-6 leading-relaxed">
              Your position is saved. You can resume from <strong className="text-fg">Question {qIndex + 1}</strong> next time. 
              <br/><br/>Leaving now will <strong className="text-fg">NOT</strong> generate a report.
            </p>
            <div className="flex flex-col gap-2">
              <button onClick={() => handleLeaveConfirm(false)} className="btn-primary w-full justify-center">Save & Leave</button>
              <button onClick={() => handleLeaveConfirm(true)} className="btn-ghost w-full justify-center text-[#EF4444] border-border hover:border-[#EF4444]">Discard Progress & Leave</button>
              <button onClick={() => setLeaveStep('hidden')} className="btn-ghost w-full justify-center mt-1">Continue Practicing</button>
            </div>
          </div>
        </div>
      );
    }

    // leaveStep === 'analysis'
    return (
      <div className="fixed inset-0 z-50 bg-bg/90 overflow-y-auto">
        <div className="min-h-screen flex flex-col items-center justify-start py-10 px-4">
          <div className="w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-fg font-extrabold text-2xl">Session Analysis</h2>
                <p className="text-muted-fg text-sm mt-1">Here&apos;s how you performed before leaving</p>
              </div>
              <button onClick={() => setLeaveStep('hidden')} className="btn-ghost text-xs py-2 px-3">× Keep Studying</button>
            </div>

            {!analysis ? (
               <div className="card mb-5 border-border text-center py-10">
                  <p className="text-muted-fg">You haven&apos;t answered any questions yet.</p>
               </div>
            ) : (
              <>
                <div className={`card mb-5 border-2 ${analysis.pct >= 70 ? 'border-[#22C55E]' : analysis.pct >= 50 ? 'border-[#FFD500]' : 'border-[#EF4444]'}`}>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="text-6xl font-black text-fg mb-1">{analysis.pct}%</div>
                      <div className="text-muted-fg text-sm">{analysis.totalCorrect} correct out of {analysis.totalAnswered} answered</div>
                      <div className="text-muted-fg text-xs mt-1">{analysis.wrongAnswers.length} incorrect</div>
                    </div>
                    <div className={`text-4xl font-black ${analysis.pct >= 70 ? 'text-[#22C55E]' : analysis.pct >= 50 ? 'text-accent' : 'text-[#EF4444]'}`}>
                      {analysis.pct >= 70 ? 'ON TRACK' : analysis.pct >= 50 ? 'NEEDS WORK' : 'STRUGGLING'}
                    </div>
                  </div>
                </div>

                {/* Section Breakdown */}
                <div className="card mb-5">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-fg mb-4">Section Breakdown</h3>
                  <div className="flex flex-col gap-4">
                    {analysis.sectionsSorted.map((sec, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-muted-fg text-sm truncate pr-4">{sec.name}</span>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-muted-fg text-xs">{sec.correct}/{sec.total}</span>
                            <span className={`font-bold text-sm w-10 text-right ${sec.pct >= 70 ? 'text-[#22C55E]' : sec.pct >= 50 ? 'text-accent' : 'text-[#EF4444]'}`}>{sec.pct}%</span>
                          </div>
                        </div>
                        <div className="progress-bar-bg">
                          <div className="progress-bar-fill" style={{ width: `${sec.pct}%`, background: sec.pct >= 70 ? '#22C55E' : sec.pct >= 50 ? '#FFD500' : '#EF4444' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weak Areas */}
                {analysis.weakest.length > 0 && (
                  <div className="card mb-5 border-border">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#EF4444] mb-3 flex items-center gap-1"><AlertTriangle size={14} /> Focus Areas (Below 70%)</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.weakest.map((s, i) => (
                        <span key={i} className="badge badge-red">{s.name} — {s.pct}%</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Strongest Sections */}
                {analysis.strongest.length > 0 && (
                  <div className="card mb-5 border-border">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#22C55E] mb-3 flex items-center gap-1"><Check size={14} /> Strong Sections (70%+)</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.strongest.map((s, i) => (
                        <span key={i} className="badge badge-green">{s.name} — {s.pct}%</span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="flex flex-col gap-3 mt-8">
              <button onClick={handleFinishAndGenerateReport} className="btn-primary w-full justify-center">Finish Practice & Generate Report</button>
              <button onClick={() => setLeaveStep('hidden')} className="btn-ghost w-full justify-center">Continue Practicing</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!question) {
    return <div className="p-10 text-fg">No questions available for this section.</div>;
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col lg:flex-row">
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
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h2 className="text-fg font-black text-lg tracking-tight">Practice Mode</h2>
          <span className="badge badge-yellow">{sessionScore.correct}/{sessionScore.total}</span>
        </div>

        <div className="sidebar-section-label">Sections</div>
        <div className="flex-1 overflow-y-auto">
        {sectionList.map((sec, i) => {
          const shortName = sec.split(':')[0].trim();
          const secHistory = answerHistory.filter(h => h.section === sec);
          const secPct = secHistory.length > 0 ? Math.round((secHistory.filter(h => h.isCorrect).length / secHistory.length) * 100) : null;
          
          return (
            <div key={i} className="mb-1">
              <button
                onClick={() => switchSection(sec)}
                className={`w-full text-left px-5 py-3 text-sm font-bold flex flex-col ${activeSection === sec ? 'bg-accent/10 text-accent border-l-2 border-accent' : 'text-muted-fg hover:bg-muted'}`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="truncate pr-4">{shortName}</span>
                  {secPct !== null && (
                    <span className={`text-xs px-1.5 py-0.5  ${secPct >= 70 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                      {secPct}%
                    </span>
                  )}
                </div>
                <div className="text-xs font-normal opacity-60 mt-0.5">{sections[sec].length} Qs</div>
              </button>
              
              {activeSection === sec && (
                <div className="px-5 py-3 bg-[#111] grid grid-cols-5 gap-2">
                  {sections[sec].map((q, idx) => {
                    const ans = answerHistory.find(h => h.qNumber === q.qNumber);
                    
                    let baseClass = "aspect-square text-xs font-bold transition-colors flex items-center justify-center ";
                    
                    if (qIndex === idx) {
                      baseClass += "bg-[#FFD500] text-black";
                    } else if (ans) {
                      if (ans.isCorrect) {
                        baseClass += "bg-[#1A3A1A] text-[#22C55E]";
                      } else {
                        baseClass += "bg-[#3A1A1A] text-[#EF4444]";
                      }
                    } else {
                      baseClass += "bg-[#1A1A1A] text-muted-fg hover:bg-[#222] hover:text-fg";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => { setQIndex(idx); restoreAnsweredState(q); setSelectedOptions([]); }}
                        className={baseClass}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        </div>

        <div className="mt-auto p-5 border-t border-border flex-shrink-0">
          <button onClick={handleLeave} className="btn-ghost w-full justify-center text-[#EF4444] border-border hover:border-[#EF4444]">
            Leave Practice
          </button>
          <button onClick={() => setLeaveStep('analysis')} className="btn-primary w-full justify-center mt-2">
            Finish & Generate Report
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-[260px] flex-1 flex flex-col overflow-hidden relative min-h-screen">
        <div className="absolute top-0 left-0 w-full h-1 bg-muted">
          <div className="h-full bg-accent transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-12 pb-32">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-2 items-center flex-wrap">
                <div className="badge badge-grey">Question {qIndex + 1} of {currentQuestions.length}</div>
                {isMultiSelect && <div className="badge badge-yellow">Choose {requiredCorrect.length}</div>}
              </div>
              {answered && (
                <div className={`badge ${answered.isCorrect ? 'badge-green' : 'badge-red'}`}>
                  {answered.isCorrect ? 'Correct' : 'Incorrect'}
                </div>
              )}
            </div>

            <h2 className="text-fg text-xl md:text-2xl font-bold leading-snug mb-10">
              {question.questionText}
            </h2>

            <div className="flex flex-col gap-3">
              {options.map((opt, i) => (
                <button
                  key={i}
                  disabled={answered !== null}
                  onClick={() => handleAnswer(opt.letter)}
                  className={getOptionStyle(opt.letter)}
                >
                  <span className="option-letter">{optionLetters[i]}</span>
                  <span className="text-left">{opt.text.replace(/^[A-F]\)\s*/, '')}</span>
                </button>
              ))}
            </div>

            {isMultiSelect && !answered && (
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={submitMultiAnswer} 
                  disabled={selectedOptions.length !== requiredCorrect.length}
                  className={`btn-primary ${selectedOptions.length !== requiredCorrect.length ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Submit Answer
                </button>
              </div>
            )}

            {answered && (
              <div className="mt-10 p-6 border-l-4 border-accent bg-accent/5">
                {answered.isReview && (
                  <div className="text-xs text-muted-fg mb-3 italic">You previously answered this question. Reviewing only.</div>
                )}
                <h3 className="text-accent font-bold text-sm uppercase tracking-widest mb-3">Explanation</h3>
                <div className="text-muted-fg text-sm leading-relaxed whitespace-pre-line">
                  {question.explanation}
                </div>
                <div className="mt-6 flex gap-3 justify-end flex-wrap">
                  {qIndex > 0 && (
                    <button onClick={handlePrev} className="btn-ghost">← Previous</button>
                  )}
                  {qIndex < currentQuestions.length - 1 ? (
                    <button onClick={handleNext} className="btn-primary">Next Question →</button>
                  ) : (
                    <button onClick={() => setLeaveStep('analysis')} className="btn-primary">Submit & Generate Report →</button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <AnalysisModal />
    </div>
  );
}
