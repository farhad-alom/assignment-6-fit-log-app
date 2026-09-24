'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    Bookmark,
    CalendarDays,
    Dumbbell,
    Flame,
} from 'lucide-react';

import PlanCard from './PlanCard';
import type { Workout } from '@/types/workout';
import {
    getPlan,
    getSaved,
    savePlan,
    saveSaved,
} from '@/lib/storage';

type Tab = 'plan' | 'saved';

// লোকাল স্টোরেজ থেকে নিরাপদভাবে completed ডাটা লোড করার ফাংশন
const getInitialCompleted = (): string[] => {
    if (typeof window === 'undefined') return [];
    try {
        const completedData = localStorage.getItem('fitlog-completed');
        if (!completedData) return [];
        const parsedData = JSON.parse(completedData);
        return Array.isArray(parsedData) ? parsedData : [];
    } catch {
        return [];
    }
};

const MyPlan = () => {
    const [activeTab, setActiveTab] = useState<Tab>('plan');

    const [plan, setPlan] = useState<Workout[]>([]);
    const [saved, setSaved] = useState<Workout[]>([]);
    const [completed, setCompleted] = useState<string[]>(getInitialCompleted);

    useEffect(() => {
        const loadData = () => {
            setPlan(getPlan());
            setSaved(getSaved());
        };

        loadData();

        const handleStorageChange = () => {
            loadData();
        };

        window.addEventListener('fitlog-storage', handleStorageChange);
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('fitlog-storage', handleStorageChange);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const currentItems = activeTab === 'plan' ? plan : saved;

    const metrics = useMemo(() => {
        const totalMinutes = plan.reduce(
            (total, workout) => total + Number(workout.duration || 0),
            0
        );

        const totalCalories = plan.reduce(
            (total, workout) => total + Number(workout.calories || 0),
            0
        );

        return {
            exercises: plan.length,
            minutes: totalMinutes,
            calories: totalCalories,
        };
    }, [plan]);

    const handleRemove = (id: string) => {
        if (activeTab === 'plan') {
            const updatedPlan = plan.filter((workout) => workout.id !== id);
            setPlan(updatedPlan);
            savePlan(updatedPlan);
            return;
        }

        const updatedSaved = saved.filter((workout) => workout.id !== id);
        setSaved(updatedSaved);
        saveSaved(updatedSaved);
    };

    const handleDone = (id: string) => {
        if (completed.includes(id)) {
            return;
        }

        const updatedCompleted = [...completed, id];
        setCompleted(updatedCompleted);

        localStorage.setItem(
            'fitlog-completed',
            JSON.stringify(updatedCompleted)
        );

        window.dispatchEvent(new Event('fitlog-storage'));
    };

    return (
        <main className="min-h-screen bg-black text-white">
            {/* Header */}
            <section className="border-b border-zinc-800">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 transition hover:text-lime-400"
                    >
                        <ArrowLeft size={18} />
                        Back to Workouts
                    </Link>

                    <p className="mt-8 text-sm font-bold tracking-[0.25em] text-lime-400">
                        YOUR WORKOUTS
                    </p>

                    <h1 className="mt-3 text-4xl font-black uppercase sm:text-5xl">
                        My Plan
                    </h1>

                    <p className="mt-4 max-w-2xl text-zinc-400">
                        Track today&apos;s training and keep your favorite workouts saved for later.
                    </p>
                </div>
            </section>

            {/* Metrics */}
            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                        <Dumbbell size={22} className="text-lime-400" />
                        <p className="mt-4 text-sm text-zinc-500">Exercises</p>
                        <p className="mt-1 text-3xl font-black">{metrics.exercises}</p>
                    </div>

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                        <CalendarDays size={22} className="text-lime-400" />
                        <p className="mt-4 text-sm text-zinc-500">Total Minutes</p>
                        <p className="mt-1 text-3xl font-black">{metrics.minutes}</p>
                    </div>

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                        <Flame size={22} className="text-lime-400" />
                        <p className="mt-4 text-sm text-zinc-500">Calories</p>
                        <p className="mt-1 text-3xl font-black">{metrics.calories}</p>
                    </div>
                </div>
            </section>

            {/* Tabs & Content */}
            <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
                <div className="mb-8 flex border-b border-zinc-800">
                    <button
                        type="button"
                        onClick={() => setActiveTab('plan')}
                        className={`flex items-center gap-2 border-b-2 px-5 py-4 text-sm font-bold uppercase transition ${activeTab === 'plan'
                            ? 'border-lime-400 text-lime-400'
                            : 'border-transparent text-zinc-500 hover:text-white'
                            }`}
                    >
                        <Dumbbell size={17} />
                        Today&apos;s Plan
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('saved')}
                        className={`flex items-center gap-2 border-b-2 px-5 py-4 text-sm font-bold uppercase transition ${activeTab === 'saved'
                            ? 'border-lime-400 text-lime-400'
                            : 'border-transparent text-zinc-500 hover:text-white'
                            }`}
                    >
                        <Bookmark size={17} />
                        Saved
                    </button>
                </div>

                {/* Empty State */}
                {currentItems.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-zinc-800 px-6 py-16 text-center">
                        <Dumbbell size={42} className="mx-auto text-zinc-700" />
                        <h2 className="mt-5 text-2xl font-black uppercase">
                            {activeTab === 'plan' ? 'Your plan is empty' : 'No saved workouts'}
                        </h2>
                        <p className="mx-auto mt-3 max-w-md text-zinc-500">
                            {activeTab === 'plan'
                                ? "Add workouts from the library to build today's plan."
                                : 'Save workouts you want to come back to later.'}
                        </p>
                        <Link
                            href="/"
                            className="mt-7 inline-block rounded-full bg-lime-400 px-6 py-3 text-sm font-bold uppercase text-black transition hover:bg-lime-300"
                        >
                            Browse Workouts
                        </Link>
                    </div>
                ) : (
                    /* Workout List */
                    <div className="space-y-5">
                        {currentItems.map((workout) => (
                            <PlanCard
                                key={workout.id}
                                workout={workout}
                                completed={activeTab === 'plan' && completed.includes(workout.id)}
                                onRemove={handleRemove}
                                onDone={activeTab === 'plan' ? handleDone : undefined}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default MyPlan;