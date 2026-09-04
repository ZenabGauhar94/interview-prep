'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Code2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/Badge';

type Question = { id: string; text: string; difficulty: string; category: { name: string } };
type Role = { id: string; name: string };
type ProgressItem = { questionId: string; status: string };

const TABS = ['All', 'Not Started', 'Needs Work', 'Mastered'] as const;
const TAB_TO_STATUS: Record<string, string | null> = {
  'All': null,
  'Not Started': 'not_started',
  'Needs Work': 'needs_work',
  'Mastered': 'mastered',
};

export default function QuestionList() {
  const { roleId } = useParams<{ roleId: string }>();
  const { token } = useAuth();
  const [role, setRole] = useState<Role | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [progress, setProgress] = useState<Record<string, string>>({});
  const [tab, setTab] = useState<typeof TABS[number]>('All');

  useEffect(() => {
    fetch('/api/roles').then((r) => r.json()).then((roles: Role[]) => {
      setRole(roles.find((r) => r.id === roleId) || null);
    });
    fetch(`/api/questions?roleId=${roleId}`).then((r) => r.json()).then(setQuestions);
    if (token) {
      fetch('/api/progress', { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((items: ProgressItem[]) => {
          const map: Record<string, string> = {};
          items.forEach((i) => { map[i.questionId] = i.status; });
          setProgress(map);
        });
    }
  }, [roleId, token]);

  const filtered = questions.filter((q) => {
    const status = progress[q.id] || 'not_started';
    const wanted = TAB_TO_STATUS[tab];
    return wanted === null || status === wanted;
  });

  return (
    <div className="px-8 py-8 max-w-4xl">
      <div className="flex items-center gap-2 mb-1">
        <Code2 className="w-5 h-5 text-primary" />
        <h1 className="text-[20px] font-semibold">{role?.name || '...'}</h1>
      </div>
      <p className="text-sm text-neutral-700/50 mb-5">{questions.length} Questions</p>

      <div className="flex gap-1 border-b border-neutral-300/40 mb-4">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-sm px-3 py-2 border-b-2 transition ${
              tab === t ? 'border-primary text-primary font-medium' : 'border-transparent text-neutral-700/50 hover:text-neutral-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((q, i) => {
          const status = progress[q.id] || 'not_started';
          return (
            <Link
              key={q.id}
              href={`/practice/${roleId}/${q.id}`}
              className="flex items-center justify-between bg-white border border-neutral-300/40 rounded-xl px-4 py-3 hover:border-primary/40 transition"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs text-neutral-700/40 w-4 shrink-0">{i + 1}</span>
                <div className="min-w-0">
                  <p className="text-sm truncate">{q.text}</p>
                  <div className="flex gap-2 mt-1.5">
                    <Badge type="category" value={q.category.name} />
                    <Badge type="difficulty" value={q.difficulty} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-3">
                <Badge type="status" value={status} />
                <ChevronRight className="w-4 h-4 text-neutral-700/30" />
              </div>
            </Link>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-sm text-neutral-700/50 text-center py-10">No questions in this filter yet.</p>
        )}
      </div>
    </div>
  );
}