'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Bookmark, CalendarDays, Dumbbell, Flame } from 'lucide-react';
import { toast } from 'react-toastify';

import PlanCard from './PlanCard';
import type { Workout } from '@/types/workout';
import { getPlan, getSaved, savePlan, saveSaved } from '../lib/storage';

type Tab = 'plan' | 'saved';

const getInitialCompleted = (): string[] => {
    if (typeof window === 'undefined') return [];
    try {
        const data = localStorage.getItem('fitlog-completed');
        return data && Array.isArray(JSON.parse(data)) ? JSON.parse(data) : [];
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
        const handleStorage = () => loadData();

        window.addEventListener('fitlog-storage', handleStorage);
        window.addEventListener('storage', handleStorage);

        return () => {
            window.removeEventListener('fitlog-storage', handleStorage);
            window.removeEventListener('storage', handleStorage);
        };
    }, []);

    const currentItems = activeTab === 'plan' ? plan : saved;

    const metrics = useMemo(() => ({
        exercises: plan.length,
        minutes: plan.reduce((acc, w) => acc + Number(w.duration || 0), 0),
        calories: plan.reduce((acc, w) => acc + Number(w.calories || 0), 0),
    }), [plan]);

    const handleRemove = (id: string) => {
        if (activeTab === 'plan') {
            const updated = plan.filter((w) => w.id !== id);
            setPlan(updated);
            savePlan(updated);
            toast.success('Workout removed from your plan.');
            return;
        }

        const updated = saved.filter((w) => w.id !== id);
        setSaved(updated);
        saveSaved(updated);
        toast.success('Workout removed from saved.');
    };

    const handleDone = (id: string) => {
        if (completed.includes(id)) {
            toast.info('Workout is already marked as done.');
            return;
        }

        const updated = [...completed, id];
        setCompleted(updated);
        localStorage.setItem('fitlog-completed', JSON.stringify(updated));
        toast.success('Workout marked as done.');
    };

    return (
        <main className="min-h-screen bg-black text-white">
            {/* Header */}
            <section className="border-b border-zinc-800">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 transition hover:text-lime-400">
                        <ArrowLeft size={18} /> Back to Workouts
                    </Link>
                    <p className="mt-8 text-sm font-bold tracking-[0.25em] text-lime-400">YOUR WORKOUTS</p>
                    <h1 className="mt-3 text-4xl font-black uppercase sm:text-5xl">My Plan</h1>
                    <p className="mt-4 max-w-2xl text-zinc-400">
                        Track today&apos;s training and keep your favorite workouts saved for later.
                    </p>
                </div>
            </section>

            {/* Metrics */}
            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid gap-4 sm:grid-cols-3">
                    {[
                        { label: 'Exercises', value: metrics.exercises, icon: Dumbbell },
                        { label: 'Total Minutes', value: metrics.minutes, icon: CalendarDays },
                        { label: 'Calories', value: metrics.calories, icon: Flame },
                    ].map((m, i) => (
                        <div key={i} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                            <m.icon size={22} className="text-lime-400" />
                            <p className="mt-4 text-sm text-zinc-500">{m.label}</p>
                            <p className="mt-1 text-3xl font-black">{m.value}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tabs & Content */}
            <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
                <div className="mb-8 flex border-b border-zinc-800">
                    {(['plan', 'saved'] as Tab[]).map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`flex items-center gap-2 border-b-2 px-5 py-4 text-sm font-bold uppercase transition ${activeTab === tab ? 'border-lime-400 text-lime-400' : 'border-transparent text-zinc-500 hover:text-white'
                                }`}
                        >
                            {tab === 'plan' ? <Dumbbell size={17} /> : <Bookmark size={17} />}
                            {tab === 'plan' ? "Today's Plan" : 'Saved'}
                        </button>
                    ))}
                </div>

                {/* Content / Empty State */}
                {currentItems.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-zinc-800 px-6 py-16 text-center">
                        <Dumbbell size={42} className="mx-auto text-zinc-700" />
                        <h2 className="mt-5 text-2xl font-black uppercase">
                            {activeTab === 'plan' ? 'Your plan is empty' : 'No saved workouts'}
                        </h2>
                        <p className="mx-auto mt-3 max-w-md text-zinc-500">
                            {activeTab === 'plan' ? "Add workouts from the library to build today's plan." : 'Save workouts you want to come back to later.'}
                        </p>
                        <Link href="/" className="mt-7 inline-block rounded-full bg-lime-400 px-6 py-3 text-sm font-bold uppercase text-black transition hover:bg-lime-300">
                            Browse Workouts
                        </Link>
                    </div>
                ) : (
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