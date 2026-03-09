# Football Quiz App - Development Guide

## Overview

This document provides comprehensive guidance for developers working on the Football Quiz Application. The app is a full-stack Next.js application with authentication, database, and real-time features.

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (React 18)
- **Styling**: Tailwind CSS 3
- **Animation**: Framer Motion 10
- **Components**: Shadcn/ui (pre-built component library)
- **State Management**: React Context API + localStorage

### Backend
- **Runtime**: Node.js (Next.js API Routes)
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT with bcryptjs
- **Validation**: Custom TypeScript validation

## Directory Structure Explained

### `/app` - Next.js App Router
- **page.tsx files**: Route pages (automatically become routes based on filename)
- **layout.tsx**: Shared layout components for routes
- **api/**: API route handlers (`api/path/route.ts` → `/api/path`)

### `/components` - Reusable React Components
- **ui/**: Shadcn UI components (Button, Input, Card, etc.)
- **AnimatedQuizQuestion.tsx**: Quiz question with animations
- **Football3D.tsx**: 3D football canvas animation
- **QuizCategories.tsx**: Category grid with Framer Motion

### `/lib` - Utility Functions
- **auth.ts**: JWT and password hashing utilities
- **auth-context.tsx**: React Context for authentication state
- **prisma.ts**: Prisma client instance

### `/prisma` - Database
- **schema.prisma**: Database schema definition
- **migrations/**: Database migration files
- **seed.ts**: Initial data seeding script

## Key Features Implementation

### 1. Authentication System

**Flow:**
1. User signs up with email/password
2. Password hashed with bcryptjs (10 salt rounds)
3. User record created in database
4. JWT token generated and stored in HttpOnly cookie
5. Token verified on protected routes

**Files Involved:**
- `/app/auth/login/page.tsx` - Login UI
- `/app/auth/signup/page.tsx` - Signup UI
- `/app/api/auth/login/route.ts` - Login API
- `/app/api/auth/signup/route.ts` - Signup API
- `/lib/auth.ts` - Auth utilities
- `/lib/auth-context.tsx` - Auth provider

**Protected Routes:**
Use `useAuth()` hook to check `isAuthenticated` status:
```tsx
const { isAuthenticated, user } = useAuth();
if (!isAuthenticated) redirect('/auth/login');
```

### 2. Quiz System

**Quiz Flow:**
1. User selects category from home page
2. Questions fetched from `/api/questions?categoryId=X`
3. User answers 10 questions (can navigate between them)
4. Quiz submitted to `/api/quiz/submit`
5. Answers validated and score calculated
6. Results displayed with detailed statistics

**Key Components:**
- `AnimatedQuizQuestion.tsx` - Single question display
- `/app/quiz/page.tsx` - Quiz interface
- `/app/api/questions/route.ts` - Question fetching
- `/app/api/quiz/submit/route.ts` - Answer submission

**Scoring Algorithm:**
```
Score = (Correct Answers / Total Questions) × 100
Accuracy = (Correct Answers / Total Questions) × 100
XP Earned = Score / 10
```

### 3. User Statistics

**Auto-Updated On Quiz Submit:**
- totalQuizzes: Incremented by 1
- totalScore: Added current score
- averageAccuracy: Recalculated from all attempts
- bestScore: Max of all scores
- currentStreak: Incremented if > 70% accuracy
- experience: Added XP earned

### 4. Leaderboard System

**Ranking Calculation:**
- Primary: Total points (totalScore)
- Secondary: Number of quizzes completed
- Tertiary: Average accuracy

**Filters Available:**
- All-time rankings
- Weekly rankings (top performers this week)
- Monthly rankings (top performers this month)

### 5. Achievements System

**Achievement Types:**
- **First Steps**: Unlock on first quiz completion
- **Perfect Score**: 100% accuracy on any quiz
- **Streak Master**: 10 consecutive correct answers
- **Quiz Master**: Complete 10 quizzes
- **Speed Runner**: Complete quiz in under 5 minutes
- **Leaderboard Legend**: Reach top 10 globally

**Achievement Rewards:**
Each achievement gives XP and unlocks badge for profile.

## Animation & UI Features

### Framer Motion Animations
- **Page Transitions**: `motion.div` with `initial`, `animate`, `exit`
- **Staggered Lists**: `containerVariants` with `staggerChildren`
- **Hover Effects**: `whileHover` props for interactive feedback
- **Load Animations**: Fade-in and slide-up on page load

### CSS Animations
- **Blob Effect**: Background blobs with CSS keyframes
- **Pulse/Spin**: Loading indicators with Tailwind utilities
- **Progress Bars**: Smooth width transitions

### 3D Football
- **Canvas Drawing**: 2D canvas with rotation simulation
- **Floating Animation**: Y-axis bounce with Framer Motion
- **Stitching Details**: SVG-like drawing on canvas

## Database Operations

### Common Patterns

**Fetching Data:**
```typescript
const questions = await prisma.question.findMany({
  where: { categoryId },
  take: 10,
});
```

**Creating Records:**
```typescript
const result = await prisma.quizResult.create({
  data: {
    userId,
    score: 85,
    // ...
  },
});
```

**Updating Nested Relations:**
```typescript
await prisma.userStatistics.update({
  where: { userId },
  data: {
    totalQuizzes: stats.totalQuizzes + 1,
  },
});
```

### Migration Process
1. Update `/prisma/schema.prisma`
2. Create migration: `npx prisma migrate dev --name your_migration_name`
3. Migration file created in `/prisma/migrations/`
4. Automatically applied to database

## API Route Patterns

### Standard API Response
```typescript
// Success
return NextResponse.json(
  { message: 'Success', data: {...} },
  { status: 200 }
);

// Error
return NextResponse.json(
  { error: 'Error message' },
  { status: 400 }
);
```

### Authentication in API Routes
```typescript
const authHeader = req.headers.get('authorization');
const token = authHeader?.replace('Bearer ', '');
const decoded = await verifyToken(token);
```

### Query Parameters
```typescript
const { searchParams } = new URL(req.url);
const categoryId = searchParams.get('categoryId');
```

## Styling & Theme

### Design Tokens (CSS Variables)
Located in `/app/globals.css`:
```css
--primary: #1e40af
--accent: #f59e0b
--background: #0f172a
--foreground: #f8fafc
```

### Using Tokens in Tailwind
```tsx
// Direct class usage
className="bg-slate-900 text-white"

// With CSS variables
style={{ color: 'var(--primary)' }}
```

### Responsive Design
```tsx
// Mobile-first
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
```

## Common Development Tasks

### Add a New Quiz Category
1. Add to seed script: `/prisma/seed.ts`
2. Run: `pnpm run db:seed`
3. Category appears in UI automatically

### Add a New Achievement
1. Define in seed script
2. Add unlock logic to quiz submit endpoint
3. Display in achievements page

### Create a New Page
1. Create folder: `/app/new-page/`
2. Add `page.tsx` file
3. Route automatically available at `/new-page`

### Add API Endpoint
1. Create: `/app/api/endpoint/route.ts`
2. Export async functions: `GET`, `POST`, etc.
3. Accessible at `/api/endpoint`

## Debugging Tips

### Enable Console Logging
```typescript
console.log('[quiz/submit] Debug message:', data);
```

### Check Network Requests
- Open DevTools → Network tab
- Monitor API calls in real-time
- Check request/response payloads

### Database Debugging
```bash
# View database content
npx prisma studio

# Check migrations
npx prisma migrate status
```

### Authentication Issues
- Check browser cookies (DevTools → Application)
- Verify token in localStorage
- Test auth endpoints with curl:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Performance Considerations

### Database Query Optimization
- Use `select` to fetch only needed fields
- Implement pagination for large datasets
- Index frequently queried columns

### Frontend Optimization
- Lazy load components with `dynamic()`
- Memoize expensive computations
- Minimize animation complexity on mobile

### Caching Strategy
- User stats cached in Context for quick access
- Leaderboard cached with reasonable TTL
- Categories cached at build time if possible

## Security Best Practices

### Never
- Store passwords in plain text (✓ using bcryptjs)
- Send tokens in URL query params
- Expose sensitive data in API responses
- Trust client-side validation alone

### Always
- Validate input on backend
- Use HTTPS in production
- Set secure JWT secrets
- Implement rate limiting on auth endpoints
- Use HttpOnly cookies for tokens

## Testing Locally

### Test User Credentials
Email: test@example.com
Password: password123

### Test Scenarios
1. **Sign up flow**: Create new account
2. **Quiz flow**: Take a quiz and verify scoring
3. **Leaderboard**: Verify rankings update
4. **Profile**: Edit profile information
5. **Achievements**: Complete challenges for badges

## Deployment Checklist

- [ ] Update environment variables
- [ ] Run database migrations
- [ ] Seed initial data
- [ ] Test auth flow
- [ ] Verify API endpoints
- [ ] Check responsive design
- [ ] Performance audit
- [ ] Security review

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Framer Motion Documentation](https://www.framer.com/motion)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

## Support & Troubleshooting

See `/README.md` for common troubleshooting steps and user guide.
