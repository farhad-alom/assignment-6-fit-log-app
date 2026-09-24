import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import WorkoutGrid from '@/components/WorkoutGrid';
import { getWorkouts } from '@/lib/api';

const Home = async () => {
  const workouts = await getWorkouts();

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <Hero />

      <section
        id="library"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mb-10">
          <p className="text-sm font-bold tracking-[0.25em] text-lime-400">
            WORKOUT LIBRARY
          </p>

          <h2 className="mt-3 text-4xl font-black uppercase sm:text-5xl">
            The Library
          </h2>

          <p className="mt-4 text-zinc-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <WorkoutGrid workouts={workouts} />
      </section>

      <Footer />
    </main>
  );
};

export default Home;