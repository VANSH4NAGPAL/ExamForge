'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Plus } from 'lucide-react';

export default function DashboardTabs({ exams }) {
  const [activeTab, setActiveTab] = useState('exams'); // 'exams' | 'notes'

  return (
    <div>
      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-border mb-8">
        <button
          onClick={() => setActiveTab('exams')}
          className={`pb-3 text-sm font-bold transition-colors relative focus:outline-none ${
            activeTab === 'exams' ? 'text-accent' : 'text-muted-fg hover:text-fg'
          }`}
        >
          Available Exams
          {activeTab === 'exams' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-t"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`pb-3 text-sm font-bold transition-colors relative flex items-center gap-2 focus:outline-none ${
            activeTab === 'notes' ? 'text-accent' : 'text-muted-fg hover:text-fg'
          }`}
        >
          Study Notes
          <span className="badge badge-grey px-1.5 py-0.5 text-[10px]">New</span>
          {activeTab === 'notes' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-t"></div>
          )}
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'exams' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {exams.map(exam => (
            <Link key={exam.id} href={`/exam/${exam.id}`} className="card group cursor-pointer block hover:border-accent transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 group-hover:border-accent/30 transition-colors">
                  <span className="text-accent font-black text-lg">
                    {exam.name.split(' ').map(w => w[0]).join('').slice(0,2)}
                  </span>
                </div>
                <span className="badge badge-yellow">{exam._count.questions} Qs</span>
              </div>
              <h3 className="text-fg font-bold text-lg mb-2 group-hover:text-accent transition-colors">{exam.name}</h3>
              <p className="text-muted-fg text-sm leading-relaxed">{exam.description} This bank includes {exam._count.questions} dynamic questions.</p>
              <div className="mt-5 pt-4 border-t border-[#2A2A2A] flex items-center gap-2">
                <span className="text-accent text-sm font-semibold">Start Practicing →</span>
              </div>
            </Link>
          ))}

          {/* Placeholder Card */}
          <div className="card border-dashed opacity-40 flex flex-col items-center justify-center text-center py-10">
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4">
              <Plus className="text-muted-fg" size={24} strokeWidth={1.5} />
            </div>
            <p className="text-muted-fg text-sm font-medium">More exams coming soon</p>
          </div>
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Link href="/notes/csa" className="card group cursor-pointer block hover:border-accent transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 group-hover:border-accent/30 transition-colors">
                <BookOpen className="text-accent" size={24} />
              </div>
              <span className="badge badge-grey">16 Modules</span>
            </div>
            <h3 className="text-fg font-bold text-lg mb-2 group-hover:text-accent transition-colors">CSA ServiceNow Notes</h3>
            <p className="text-muted-fg text-sm leading-relaxed mb-5">Comprehensive study notes covering all major exam topics. Includes definitions, tables, and diagrams.</p>
            <div className="mt-5 pt-4 border-t border-[#2A2A2A] flex items-center gap-2">
              <span className="text-accent text-sm font-semibold">Read Notes →</span>
            </div>
          </Link>
          
          <Link href="/notes/cad" className="card group cursor-pointer block hover:border-accent transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 group-hover:border-accent/30 transition-colors">
                <BookOpen className="text-accent" size={24} />
              </div>
              <span className="badge badge-grey">CAD</span>
            </div>
            <h3 className="text-fg font-bold text-lg mb-2 group-hover:text-accent transition-colors">Scripting in ServiceNow Fundamentals On Demand</h3>
            <p className="text-muted-fg text-sm leading-relaxed mb-5">These notes are made from the transcript of the videos on ServiceNow courses.</p>
            <div className="mt-5 pt-4 border-t border-[#2A2A2A] flex items-center gap-2">
              <span className="text-accent text-sm font-semibold">Read Notes →</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
