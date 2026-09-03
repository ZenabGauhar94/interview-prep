import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromRequest } from '@/lib/auth';

const REVIEW_INTERVALS: Record<string, number> = {
  needs_work: 1,
  mastered: 7,
};

export async function POST(req: NextRequest) {
  const userId = getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { questionId, status, notes } = await req.json();

  const daysAhead = REVIEW_INTERVALS[status] ?? 1;
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + daysAhead);

  const progress = await prisma.userProgress.upsert({
    where: { userId_questionId: { userId, questionId } },
    update: { status, notes, lastReviewed: new Date(), nextReview },
    create: { userId, questionId, status, notes, lastReviewed: new Date(), nextReview },
  });

  return NextResponse.json(progress);
}

export async function GET(req: NextRequest) {
  const userId = getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const progress = await prisma.userProgress.findMany({
    where: { userId },
    include: { question: true },
  });

  return NextResponse.json(progress);
}