# Football Quiz Application

A comprehensive, modern football quiz application built with Next.js, featuring real-time scoring, leaderboards, achievements, and an immersive user experience with animations and 3D graphics.

## Features

### Core Functionality
- **6 Quiz Categories**: Premier League, Champions League, World Cup, Legendary Players, Club History, and Tactics & Rules
- **300+ Questions**: Constantly updated football trivia questions
- **Real-time Scoring**: Instant feedback on answers with detailed statistics
- **Leaderboards**: Global rankings with filters for all-time, weekly, and monthly
- **Achievement System**: Unlock badges and achievements as you progress
- **User Dashboard**: Track your progress, statistics, and performance metrics

### Technical Features
- **Authentication**: Secure JWT-based authentication with bcryptjs password hashing
- **Database**: SQLite with Prisma ORM for robust data management
- **Animations**: Smooth Framer Motion animations throughout the app
- **Responsive Design**: Mobile-first design that works on all devices
- **Performance**: Optimized for speed with Next.js 15

## Quick Start

### Prerequisites
- Node.js 18+ and npm/pnpm
- Git

### Installation

1. **Clone or extract the project**
```bash
cd football-quiz-app
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
Create a `.env.local` file:
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-change-in-production"
NODE_ENV="development"
```

4. **Set up the database**
```bash
pnpm run db:push
pnpm run db:seed
```

5. **Start the development server**
```bash
pnpm dev
```

6. **Open your browser**
Navigate to `http://localhost:3000`

## User Guide

### Getting Started
1. Visit the landing page at `/`
2. Click "Sign Up" to create a new account
3. Fill in your email, username, and password
4. You'll be redirected to the quiz home page

### Taking a Quiz
1. From the quiz home page, select a category
2. Answer 10 questions from that category
3. Your answers are timed and tracked
4. Submit your quiz to see your score
5. View detailed results including accuracy and time spent

### Tracking Progress
- Visit your **Dashboard** to see your statistics
- Check the **Leaderboard** to compete with other players
- Collect **Achievements** by completing challenges
- Edit your **Profile** to customize your information

## Project Structure

```
football-quiz-app/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx              # Root layout with auth provider
│   ├── globals.css             # Global styles and theme
│   ├── auth/
│   │   ├── login/page.tsx       # Login page
│   │   └── signup/page.tsx      # Sign up page
│   ├── quiz-home/page.tsx       # Quiz category selection
│   ├── quiz/page.tsx            # Quiz interface
│   ├── quiz-results/page.tsx    # Results page
│   ├── dashboard/page.tsx       # User dashboard
│   ├── profile/page.tsx         # Profile editing
│   ├── leaderboard/page.tsx     # Global leaderboard
│   ├── achievements/page.tsx    # Achievements page
│   └── api/
│       ├── auth/
│       │   ├── signup/route.ts  # Signup endpoint
│       │   ├── login/route.ts   # Login endpoint
│       │   └── logout/route.ts  # Logout endpoint
│       ├── categories/route.ts  # Get categories
│       ├── questions/route.ts   # Get questions by category
│       └── quiz/submit/route.ts # Submit quiz answers
├── components/
│   ├── AnimatedQuizQuestion.tsx # Quiz question component
│   ├── Football3D.tsx          # 3D football animation
│   ├── QuizCategories.tsx      # Category grid
│   └── ui/                      # Shadcn UI components
├── lib/
│   ├── auth.ts                 # Authentication utilities
│   ├── auth-context.tsx        # Auth context provider
│   └── prisma.ts               # Prisma client
├── prisma/
│   ├── schema.prisma           # Database schema
│   ├── migrations/             # Database migrations
│   └── seed.ts                 # Seed script
└── scripts/
    ├── seed.ts                 # Database seeding
    └── install-deps.js         # Dependency installer
```

## Database Schema

### User
- id: String (primary)
- email: String (unique)
- username: String (unique)
- password: String (hashed)
- avatar: String (optional)
- bio: String (optional)
- createdAt: DateTime
- updatedAt: DateTime

### Category
- id: String (primary)
- name: String (unique)
- description: String
- icon: String
- color: String
- difficulty: String

### Question
- id: String (primary)
- question: String
- optionA, B, C, D: String
- answer: String
- difficulty: String
- categoryId: String (foreign key)

### QuizResult
- id: String (primary)
- userId: String (foreign key)
- score: Int
- totalQuestions: Int
- correctAnswers: Int
- accuracy: Float
- timeSpent: Int
- completedAt: DateTime

### UserStatistics
- id: String (primary)
- userId: String (unique, foreign key)
- totalQuizzes: Int
- totalScore: Int
- averageAccuracy: Float
- bestScore: Int
- level: Int
- experience: Int

### Achievement
- id: String (primary)
- name: String
- description: String
- icon: String
- criteria: String
- reward: Int

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login to existing account
- `POST /api/auth/logout` - Logout current user

### Quiz
- `GET /api/categories` - Get all quiz categories
- `GET /api/questions?categoryId=...&limit=10` - Get questions for category
- `POST /api/quiz/submit` - Submit quiz answers and get results

## Styling

The app uses Tailwind CSS with a custom theme based on a professional sports aesthetic:
- **Primary**: Deep Blue (#1e40af) - Professional and trustworthy
- **Accent**: Golden Amber (#f59e0b) - Energy and achievement
- **Neutral**: Dark slate backgrounds with proper contrast

Color system supports both light and dark modes with semantic design tokens.

## Authentication Flow

1. User signs up with email and password
2. Password is hashed using bcryptjs
3. JWT token is created and stored in HttpOnly cookie
4. Token is verified on protected routes
5. User can logout to clear the session

## Performance Optimizations

- Next.js 15 with Turbopack bundler
- Framer Motion for smooth animations
- CSS animations for blob effects
- Image optimization with Next.js
- Database query optimization with Prisma
- Responsive design for all screen sizes

## Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Vercel will automatically deploy on each push

### Environment Variables for Production
```
DATABASE_URL=your_production_database_url
JWT_SECRET=your_strong_secret_key
NODE_ENV=production
```

## Troubleshooting

### Database Issues
- Make sure `DATABASE_URL` is set correctly
- Run `pnpm run db:push` to sync schema
- Use `pnpm run db:seed` to populate sample data

### Authentication Issues
- Clear browser cookies if stuck on login
- Check that `JWT_SECRET` is set
- Verify user exists in database

### Quiz Loading Issues
- Ensure categories are seeded with `pnpm run db:seed`
- Check that questions exist for the selected category
- Verify API endpoints are responding

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## License

This project is open source and available under the MIT License.

## Support

For support, issues, or questions:
1. Check the troubleshooting section
2. Review the code structure and comments
3. Contact the development team

---

**Happy Quizzing! Test your football knowledge and become a true expert.** ⚽
