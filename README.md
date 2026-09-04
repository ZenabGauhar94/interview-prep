# PrepPath — Role-Based Interview Prep

A full-stack web app for practicing interview questions curated by job role (SWE, AI/ML, Product), with per-user progress tracking and spaced repetition.

## Live demo
https://interview-prep-px42.vercel.app/

## Why I built this
As a CS grad job-hunting for Associate SWE / AI-ML roles, I wanted a single place to practice role-specific questions instead of scattered spreadsheets and browser tabs. Built as a portfolio project to demonstrate full-stack skills: relational schema design, JWT auth, REST API design, and deployment.

## Tech stack
- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** Next.js API routes (REST)
- **Database:** PostgreSQL (Supabase), Prisma ORM
- **Auth:** JWT + bcrypt password hashing
- **Deployment:** Vercel

## Features
- Role-based question filtering (SWE / AI-ML / Product, extensible)
- User auth (signup/login) with hashed passwords and JWT sessions
- Per-user progress tracking (`not_started` / `needs_work` / `mastered`)
- Spaced-repetition scheduling: "needs work" resurfaces sooner than "mastered"

## Running locally
1. Clone the repo and run `npm install`
2. Create a `.env` file with `DATABASE_URL` and `JWT_SECRET`
3. Run `npx prisma db push && npx prisma db seed`
4. Run `npm run dev`

## Schema
See `prisma/schema.prisma` — four core models (`User`, `Role`, `Question`, `UserProgress`) with `UserProgress` as a join table driving both progress tracking and the review-scheduling logic.

## Roadmap
- Timer-based mock interview mode
- Community-submitted questions with moderation
- Weak-area analytics dashboard