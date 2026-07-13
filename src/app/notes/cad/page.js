import Link from 'next/link';
import { getAllNotes } from '@/lib/notes';
import * as Icons from 'lucide-react';

export default async function NotesIndexPage() {
  // Add a small delay so the beautiful skeleton loader is visible during navigation
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const notes = getAllNotes('cad');

  return (
    <div className="min-h-screen bg-bg p-4 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-muted-fg mb-8">
          <Link href="/" className="hover:text-accent transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-muted-fg">CAD ServiceNow Notes</span>
        </div>

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-fg tracking-tight mb-3">ServiceNow CAD Study Notes</h1>
          <p className="text-muted-fg text-base">These notes are made from the transcript of the videos on ServiceNow courses.</p>
        </div>

        {notes.length === 0 ? (
          <div className="card text-center py-20 border-dashed opacity-50">
            <p className="text-muted-fg">No notes found. Please make sure the markdown files are in the content/notes/cad directory.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {notes.map((note, idx) => {
              const Icon = Icons[note.icon] || Icons.BookOpen;
              return (
                <Link key={note.id} href={`/notes/cad/${note.slug}`} className="card group cursor-pointer block hover:border-accent transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(255,213,0,0.2)]">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 group-hover:border-accent/50 transition-colors">
                      <Icon size={24} className="text-muted-fg group-hover:text-accent transition-colors" />
                    </div>
                    <span className="text-xs font-mono text-muted-fg opacity-50">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="text-fg font-bold text-lg mb-2 group-hover:text-accent transition-colors line-clamp-2">{note.title}</h3>
                  <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
                    <span className="text-accent text-sm font-semibold">Read Notes →</span>
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
