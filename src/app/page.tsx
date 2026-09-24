import React from 'react';
import Navbar from '@/components/Navbar';

const Home = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold">
          FITLOG
        </h1>

        <p className="mt-4 text-zinc-400">
          Workout Library
        </p>
      </section>
    </main>
  );
};

export default Home;