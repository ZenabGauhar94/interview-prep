import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const roleId = req.nextUrl.searchParams.get('roleId');

  const questions = await prisma.question.findMany({
    where: roleId ? { roleId } : undefined,
    include: { category: true, role: true },
  });

  return NextResponse.json(questions);
}