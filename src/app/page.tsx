import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <Hero />

      <section
        id="library"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <p className="text-sm font-bold tracking-[0.25em] text-lime-400">
          WORKOUTS
        </p>

        <h2 className="mt-3 text-4xl font-black uppercase sm:text-5xl">
          The Library
        </h2>

        <p className="mt-4 text-zinc-400">
          Twelve lifts covering every major muscle group.
        </p>
      </section>

      <Footer />
    </main>
  );
};

export default Home;