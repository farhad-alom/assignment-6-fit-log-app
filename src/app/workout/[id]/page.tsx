import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import WorkoutActions from '@/components/WorkoutActions';
import {
    ArrowLeft,
    Clock3,
    Flame,
    Star,
    Dumbbell,
    Gauge,
    ListChecks,
} from 'lucide-react';
import { getWorkoutById } from '@/lib/api';

interface WorkoutDetailsProps {
    params: Promise<{
        id: string;
    }>;
}

const WorkoutDetails = async ({ params }: WorkoutDetailsProps) => {
    const { id } = await params;

    let workout;

    try {
        workout = await getWorkoutById(id);
    } catch {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black text-white">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                <Link
                    href="/"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-lime-400"
                >
                    <ArrowLeft size={18} />
                    Back to Workouts
                </Link>

                <div className="grid gap-8 lg:grid-cols-2">

                    <div className="relative overflow-hidden rounded-2xl border border-zinc-800">
                        <Image
                            src={workout.image}
                            alt={workout.name}
                            width="800"
                            height="600"
                            className="h-full min-h-[400px] w-full object-cover"
                        />
                    </div>

                    <div className="flex flex-col justify-center">

                        <span className="w-fit rounded-full bg-lime-400/10 px-4 py-2 text-xs font-bold uppercase text-lime-400">
                            {workout.category}
                        </span>

                        <h1 className="mt-5 text-4xl font-black uppercase sm:text-5xl">
                            {workout.name}
                        </h1>

                        <p className="mt-5 leading-7 text-zinc-400">
                            {workout.description}
                        </p>

                        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">

                            <div className="rounded-xl border border-zinc-800 p-4">
                                <Dumbbell size={20} className="text-lime-400" />
                                <p className="mt-3 text-xs text-zinc-500">
                                    Equipment
                                </p>
                                <p className="mt-1 font-semibold">
                                    {workout.equipment}
                                </p>
                            </div>

                            <div className="rounded-xl border border-zinc-800 p-4">
                                <Gauge size={20} className="text-lime-400" />
                                <p className="mt-3 text-xs text-zinc-500">
                                    Difficulty
                                </p>
                                <p className="mt-1 font-semibold">
                                    {workout.difficulty}
                                </p>
                            </div>

                            <div className="rounded-xl border border-zinc-800 p-4">
                                <ListChecks size={20} className="text-lime-400" />
                                <p className="mt-3 text-xs text-zinc-500">
                                    Sets × Reps
                                </p>
                                <p className="mt-1 font-semibold">
                                    {workout.sets} × {workout.reps}
                                </p>
                            </div>

                        </div>

                        <div className="mt-4 flex flex-wrap gap-5 border-y border-zinc-800 py-5 text-sm text-zinc-400">

                            <span className="flex items-center gap-2">
                                <Clock3 size={18} />
                                {workout.duration} min
                            </span>

                            <span className="flex items-center gap-2">
                                <Flame size={18} />
                                {workout.calories} kcal
                            </span>

                            <span className="flex items-center gap-2">
                                <Star size={18} />
                                {workout.rating}
                            </span>

                        </div>

                        <WorkoutActions workout={workout} />

                    </div>
                </div>

                <section className="mt-16 border-t border-zinc-800 pt-12">

                    <p className="text-sm font-bold tracking-[0.25em] text-lime-400">
                        HOW TO PERFORM
                    </p>

                    <h2 className="mt-3 text-3xl font-black uppercase">
                        Instructions
                    </h2>

                    <div className="mt-8 max-w-4xl space-y-4">
                        {workout.instructions.map((instruction, index) => (
                            <div
                                key={index}
                                className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-5"
                            >
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime-400 text-sm font-black text-black">
                                    {index + 1}
                                </span>

                                <p className="leading-7 text-zinc-400">
                                    {instruction}
                                </p>
                            </div>
                        ))}
                    </div>

                </section>

            </div>
        </main>
    );
};

export default WorkoutDetails;