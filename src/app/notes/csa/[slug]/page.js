import Link from 'next/link';
import { getNoteData, getAllNotes } from '@/lib/notes';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as Icons from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const notes = getAllNotes();
  return notes.map(note => ({
    slug: note.slug,
  }));
}

export default async function NotePage({ params }) {
  // Add a small delay so the skeleton loader is visible during navigation
  await new Promise(resolve => setTimeout(resolve, 500));

  const { slug } = await params;
  const note = getNoteData(slug);
  
  if (!note) {
    notFound();
  }

  const Icon = Icons[note.icon] || Icons.BookOpen;

  return (
    <div className="min-h-screen bg-bg">
      {/* Header Area */}
      <div className="bg-[#111] border-b border-[#2A2A2A] sticky top-0 z-10 pt-4 md:pt-10 pb-6 px-4 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-muted-fg mb-6 overflow-x-auto whitespace-nowrap pb-1 scrollbar-hide">
            <Link href="/" className="hover:text-accent transition-colors">Dashboard</Link>
            <span>/</span>
            <Link href="/notes/csa" className="hover:text-accent transition-colors">CSA Notes</Link>
            <span>/</span>
            <span className="text-fg font-medium truncate">{note.title}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0">
              <Icon size={24} className="text-accent" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-fg tracking-tight leading-tight">{note.title}</h1>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 md:p-10">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-invert prose-yellow max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight 
            prose-h1:text-3xl prose-h1:mb-6 prose-h1:text-fg
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-fg prose-h2:border-b prose-h2:border-[#2A2A2A] prose-h2:pb-2
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-fg
            prose-p:text-muted-fg prose-p:leading-relaxed prose-p:mb-5
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-strong:text-fg prose-strong:font-bold
            prose-ul:text-muted-fg prose-ul:list-disc prose-ul:pl-5 prose-ul:mb-5 prose-li:mb-2
            prose-ol:text-muted-fg prose-ol:list-decimal prose-ol:pl-5 prose-ol:mb-5 prose-li:mb-2
            prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-accent/5 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:text-muted-fg prose-blockquote:italic prose-blockquote:my-6
            prose-code:text-[#FFD500] prose-code:bg-[#2A2000] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-[#111] prose-pre:border prose-pre:border-[#2A2A2A] prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
            prose-table:w-full prose-table:text-left prose-table:border-collapse prose-table:mb-8
            prose-th:bg-[#1A1A1A] prose-th:text-fg prose-th:p-3 prose-th:border prose-th:border-[#2A2A2A] prose-th:font-semibold
            prose-td:p-3 prose-td:border prose-td:border-[#2A2A2A] prose-td:text-muted-fg
            prose-img:rounded-lg prose-img:border prose-img:border-[#2A2A2A] prose-img:max-w-full prose-img:h-auto prose-img:my-6
            prose-hr:border-[#2A2A2A] prose-hr:my-10
          ">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                table: ({node, ...props}) => (
                  <div className="not-prose overflow-x-auto my-8 border border-border rounded-xl bg-card shadow-sm">
                    <table className="w-full text-left border-collapse text-sm m-0" {...props} />
                  </div>
                ),
                thead: ({node, ...props}) => <thead className="bg-muted/50 border-b border-border" {...props} />,
                th: ({node, ...props}) => <th className="p-4 text-fg font-bold uppercase text-xs tracking-wider whitespace-nowrap" {...props} />,
                tbody: ({node, ...props}) => <tbody className="divide-y divide-border" {...props} />,
                tr: ({node, ...props}) => <tr className="hover:bg-muted/30 transition-colors" {...props} />,
                td: ({node, ...props}) => <td className="p-4 text-muted-fg align-top leading-relaxed" {...props} />,
                blockquote: ({node, ...props}) => {
                  const str = props.children?.[1]?.props?.children;
                  if (typeof str === 'string') {
                    if (str.includes('Key Exam Points')) {
                      return (
                        <blockquote className="border-l-4 border-[#22C55E] bg-[#22C55E]/10 py-4 px-5 my-8 rounded-r-lg" {...props}>
                          <div className="flex items-center gap-2 text-[#22C55E] font-bold mb-2 not-italic">
                            <Icons.Award size={18} />
                            Key Exam Points
                          </div>
                          {props.children}
                        </blockquote>
                      );
                    }
                    if (str.includes('⚠️')) {
                      return <blockquote className="border-l-4 border-[#EF4444] bg-[#EF4444]/10 py-3 px-4 my-6 rounded-r-lg not-italic text-fg" {...props} />;
                    }
                    if (str.includes('💡')) {
                      return <blockquote className="border-l-4 border-[#3B82F6] bg-[#3B82F6]/10 py-3 px-4 my-6 rounded-r-lg not-italic text-fg" {...props} />;
                    }
                  }
                  return <blockquote className="border-l-4 border-accent bg-accent/5 py-3 px-4 my-6 rounded-r-lg text-muted-fg italic" {...props} />;
                },
                img: ({node, ...props}) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="rounded-lg border border-[#2A2A2A] max-w-full shadow-lg my-8" loading="lazy" {...props} alt={props.alt || 'Note illustration'} />
                ),
                h1: ({node, ...props}) => null, // Hide h1 since we render it in the header
              }}
            >
              {note.content}
            </ReactMarkdown>
          </article>

          <div className="mt-16 pt-8 border-t border-[#2A2A2A] flex justify-between items-center flex-wrap gap-4">
            <Link href="/notes/csa" className="btn-ghost flex items-center gap-2">
              <Icons.ArrowLeft size={16} /> Back to all Notes
            </Link>
            <Link href="/" className="text-muted-fg hover:text-fg text-sm transition-colors">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
