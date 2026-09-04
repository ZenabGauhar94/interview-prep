'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { StickyNote } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/Badge';

type ProgressItem = {
  questionId: string;
  status: string;
  notes: string | null;
  question: { id: string; text: string; difficulty: string; roleId: string };
};

export default function NotesPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<ProgressItem[]>([]);

  useEffect(() => {
    if (!token) return;
    fetch('/api/progress', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data: ProgressItem[]) => setItems(data.filter((i) => i.notes && i.notes.trim().length > 0)));
  }, [token]);

  return (
    <div className="px-8 py-8 max-w-3xl">
      <h1 className="text-[24px] font-semibold mb-1">Notes</h1>
      <p className="text-sm text-neutral-700/60 mb-6">Everything you've written down while practicing, in one place.</p>

      {items.length === 0 ? (
        <div className="bg-white border border-neutral-300/40 rounded-xl p-10 text-center">
          <StickyNote className="w-6 h-6 text-neutral-700/30 mx-auto mb-3" />
          <p className="text-sm text-neutral-700/50">No notes yet. Add notes while practicing questions and they'll show up here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Link
              key={item.questionId}
              href={`/practice/${item.question.roleId}/${item.question.id}`}
              className="block bg-white border border-neutral-300/40 rounded-xl p-4 hover:border-primary/40 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">{item.question.text}</p>
                <Badge type="status" value={item.status} />
              </div>
              <p className="text-sm text-neutral-700/70 line-clamp-2">{item.notes}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}