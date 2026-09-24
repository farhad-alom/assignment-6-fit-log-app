import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock3, Flame, Star } from 'lucide-react';
import type { Workout } from '@/types/workout';

interface WorkoutCardProps {
    workout: Workout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
    return (
        <Link
            href={`/workout/${workout.id}`}
            className="group block overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 transition hover:-translate-y-1 hover:border-lime-400"
        >
            <div className="relative h-[240px] w-full overflow-hidden bg-zinc-900">
                <Image
                    src={workout.image}
                    alt={workout.name}
                    width="500"
                    height="350"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
            </div>

            <div className="p-5">
                <div>
                    <span className="rounded-full bg-lime-400/10 px-3 py-1 text-xs font-bold uppercase text-lime-400">
                        {workout.category}
                    </span>
                </div>

                <h3 className="mt-4 text-xl font-black uppercase text-white">
                    {workout.name}
                </h3>

                <p className="mt-2 text-sm text-zinc-500">
                    {workout.equipment}
                </p>

                <div className="mt-5 flex items-center gap-4 border-t border-zinc-800 pt-4 text-xs text-zinc-400">
                    <span className="flex items-center gap-1.5">
                        <Clock3 size={15} />
                        {workout.duration} min
                    </span>

                    <span className="flex items-center gap-1.5">
                        <Flame size={15} />
                        {workout.calories} kcal
                    </span>

                    <span className="flex items-center gap-1.5">
                        <Star size={15} />
                        {workout.rating}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default WorkoutCard;