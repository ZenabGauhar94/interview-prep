'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/Badge';

type Question = { id: string; text: string; description: string | null; difficulty: string; category: { name: string } };

export default function MockInterview() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState<Question | null>(null);
  const [answer, setAnswer] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/api/questions').then((r) => r.json()).then((qs: Question[]) => {
      setQuestions(qs);
      setCurrent(qs[Math.floor(Math.random() * qs.length)]);
    });
  }, []);

  const nextQuestion = () => {
    setCurrent(questions[Math.floor(Math.random() * questions.length)]);
    setAnswer('');
    setRating(0);
    setSubmitted(false);
  };

  if (!current) return null;

  return (
    <div className="px-8 py-8 max-w-2xl">
      <button onClick={() => router.push('/dashboard')} className="flex items-center gap-1.5 text-sm text-neutral-700/60 hover:text-neutral-700 mb-6">
        <ArrowLeft className="w-4 h-4" /> Exit Mock
      </button>

      <div className="flex gap-2 mb-4">
        <Badge type="category" value={current.category.name} />
        <Badge type="difficulty" value={current.difficulty} />
      </div>

      <h1 className="text-[20px] font-semibold mb-2">{current.text}</h1>
      {current.description && <p className="text-sm text-neutral-700/70 mb-4 whitespace-pre-line">{current.description}</p>}

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write your approach or answer here..."
        rows={6}
        className="w-full border border-neutral-300 rounded-xl p-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
      />

      {!submitted ? (
        <button onClick={() => setSubmitted(true)} className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition">
          Submit &amp; See Question
        </button>
      ) : (
        <div>
          <p className="text-sm text-neutral-700/60 mb-2">When you're done, self-rate your performance</p>
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} onClick={() => setRating(n)}>
                <Star className={`w-6 h-6 ${n <= rating ? 'fill-medium text-medium' : 'text-neutral-300'}`} />
              </button>
            ))}
          </div>
          <button onClick={nextQuestion} className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition">
            Next Question
          </button>
        </div>
      )}
    </div>
  );
}