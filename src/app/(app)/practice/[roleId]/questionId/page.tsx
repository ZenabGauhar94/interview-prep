'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/Badge';

type Question = {
  id: string; text: string; description: string | null; example: string | null;
  difficulty: string; category: { name: string };
};

export default function QuestionDetail() {
  const { roleId, questionId } = useParams<{ roleId: string; questionId: string }>();
  const router = useRouter();
  const { token } = useAuth();
  const [question, setQuestion] = useState<Question | null>(null);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('not_started');

  useEffect(() => {
    fetch(`/api/questions?roleId=${roleId}`).then((r) => r.json()).then((qs: Question[]) => {
      setQuestion(qs.find((q) => q.id === questionId) || null);
    });
    if (token) {
      fetch('/api/progress', { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((items: any[]) => {
          const existing = items.find((i) => i.questionId === questionId);
          if (existing) {
            setStatus(existing.status);
            setNotes(existing.notes || '');
          }
        });
    }
  }, [roleId, questionId, token]);

  const markStatus = async (newStatus: string) => {
    setStatus(newStatus);
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ questionId, status: newStatus, notes }),
    });
  };

  if (!question) return null;

  return (
    <div className="px-8 py-8 max-w-3xl">
      <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-neutral-700/60 hover:text-neutral-700 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <Badge type="category" value={question.category.name} />
          <Badge type="difficulty" value={question.difficulty} />
        </div>
        <button
          onClick={() => markStatus('mastered')}
          className={`flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg transition ${
            status === 'mastered' ? 'bg-mastered text-white' : 'border border-neutral-300 hover:bg-neutral-300/20'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" /> Mark as Mastered
        </button>
      </div>

      <h1 className="text-[22px] font-semibold mb-4">{question.text}</h1>

      {question.description && (
        <p className="text-sm text-neutral-700/80 whitespace-pre-line mb-4">{question.description}</p>
      )}

      {question.example && (
        <div className="bg-neutral-700 text-white rounded-xl p-4 mb-6">
          <p className="text-xs text-white/50 mb-2">Example:</p>
          <pre className="text-sm whitespace-pre-wrap font-mono">{question.example}</pre>
        </div>
      )}

      <div className="mb-6">
        <label className="text-sm font-medium block mb-2">Your notes / answer (visible only to you)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={() => markStatus(status)}
          placeholder="Write your approach, notes, or answer here..."
          rows={5}
          className="w-full border border-neutral-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
      </div>

      <div className="flex gap-2">
        <button onClick={() => markStatus('needs_work')} className={`text-sm px-4 py-2 rounded-lg border transition ${status === 'needs_work' ? 'bg-needswork text-white border-needswork' : 'border-medium/40 text-medium hover:bg-medium-bg'}`}>
          Mark as Needs Work
        </button>
        <button onClick={() => markStatus('mastered')} className={`text-sm px-4 py-2 rounded-lg transition ${status === 'mastered' ? 'bg-mastered text-white' : 'bg-primary text-white hover:bg-primary/90'}`}>
          Mark as Mastered
        </button>
        <button onClick={() => markStatus('not_started')} className={`text-sm px-4 py-2 rounded-lg border transition ${status === 'not_started' ? 'bg-notstarted text-white border-notstarted' : 'border-neutral-300 hover:bg-neutral-300/20'}`}>
          Not Started
        </button>
      </div>
    </div>
  );
}