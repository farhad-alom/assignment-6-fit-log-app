# FitLog

FitLog is a modern workout tracking web application where users can explore workouts, view workout details, add workouts to their daily plan, save workouts for later, and track completed exercises.

## Technologies Used

* Next.js
* React
* TypeScript
* Tailwind CSS
* Lucide React
* React Toastify
* LocalStorage
* Next.js App Router

## Key Features

1. **Workout Library**
   Browse available workouts with workout images, categories, difficulty, duration, and calorie information.

2. **Workout Details**
   View detailed information about each workout, including exercises, target muscles, equipment, and workout instructions.

3. **My Plan**
   Add workouts to today's plan and manage planned workouts from a dedicated My Plan page.

4. **Save Workouts**
   Save favorite workouts for later and access them from the Saved section.

5. **Workout Progress & Notifications**
   Mark workouts as completed, remove workouts from the plan, and receive toast notifications for important actions.

## Main Features

* Add workout to today's plan
* Save workouts for later
* Mark planned workouts as done
* Remove workouts from My Plan
* Search workouts
* Responsive design
* LocalStorage data persistence
* Toast notifications
* Maximum 5 workouts in today's plan

## Project Structure

```text
src/
├── app/
│   ├── my-plan/
│   │   └── page.tsx
│   ├── workout/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── Navbar.tsx
│   ├── WorkoutCard.tsx
│   ├── WorkoutGrid.tsx
│   ├── WorkoutActions.tsx
│   ├── PlanCard.tsx
│   └── MyPlan.tsx
│
├── lib/
│   └── storage.ts
│
└── types/
    └── workout.ts
```

## Getting Started

Install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

## Production Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Deployment

The project can be deployed using platforms such as Vercel, Netlify, or Cloudflare Pages.

## Author
### Md. Farhad Alom
Built as part of the Programming Hero B14 Assignment-6.