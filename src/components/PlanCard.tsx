'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Clock3, Flame, Trash2 } from 'lucide-react';
import type { Workout } from '@/types/workout';

interface PlanCardProps {
    workout: Workout;
    completed?: boolean;
    onRemove: (id: string) => void;
    onDone?: (id: string) => void;
}

const PlanCard = ({
    workout,
    completed = false,
    onRemove,
    onDone,
}: PlanCardProps) => {
    return (
        <div
            className={`overflow-hidden rounded-2xl border bg-zinc-950 ${completed
                ? 'border-lime-400/40 opacity-70'
                : 'border-zinc-800'
                }`}
        >
            <div className="grid md:grid-cols-[220px_1fr]">

                <div className="relative h-52 md:h-full">
                    <Image
                        src={workout.image}
                        alt={workout.name}
                        width="500"
                        height="350"
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="p-5">

                    <span className="text-xs font-bold uppercase tracking-wider text-lime-400">
                        {workout.category}
                    </span>

                    <h3 className="mt-2 text-2xl font-black uppercase">
                        {workout.name}
                    </h3>

                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-400">
                        <span className="flex items-center gap-2">
                            <Clock3 size={16} />
                            {workout.duration} min
                        </span>

                        <span className="flex items-center gap-2">
                            <Flame size={16} />
                            {workout.calories} kcal
                        </span>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">

                        <Link
                            href={`/workout/${workout.id}`}
                            className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-bold text-white transition hover:border-lime-400 hover:text-lime-400"
                        >
                            View Details
                        </Link>

                        {onDone && (
                            <button
                                onClick={() => onDone(workout.id)}
                                disabled={completed}
                                className="flex items-center gap-2 rounded-full bg-lime-400 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-lime-300 disabled:cursor-default"
                            >
                                <Check size={16} />
                                {completed ? 'Done' : 'Mark as Done'}
                            </button>
                        )}

                        <button
                            onClick={() => onRemove(workout.id)}
                            className="flex items-center gap-2 rounded-full border border-red-900 px-5 py-2.5 text-sm font-bold text-red-400 transition hover:border-red-500 hover:text-red-300"
                        >
                            <Trash2 size={16} />
                            Remove
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default PlanCard;