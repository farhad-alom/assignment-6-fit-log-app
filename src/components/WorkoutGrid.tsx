'use client';

import React, { useState } from 'react';
import WorkoutCard from './WorkoutCard';
import type { Workout } from '@/types/workout';
import { ArrowDownUp } from 'lucide-react';

interface WorkoutGridProps {
    workouts: Workout[];
}

const WorkoutGrid = ({ workouts }: WorkoutGridProps) => {
    const [sortBy, setSortBy] = useState('default');

    const sortedWorkouts = [...workouts].sort((a, b) => {
        if (sortBy === 'duration') {
            return a.duration - b.duration;
        }

        if (sortBy === 'calories') {
            return a.calories - b.calories;
        }

        if (sortBy === 'rating') {
            return b.rating - a.rating;
        }

        return 0;
    });

    return (
        <div>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-zinc-500">
                    Showing {workouts.length} workouts
                </p>

                <div className="flex items-center gap-3">
                    <ArrowDownUp
                        size={18}
                        className="text-lime-400"
                    />

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none focus:border-lime-400"
                    >
                        <option value="default">
                            Sort By
                        </option>

                        <option value="duration">
                            Duration
                        </option>

                        <option value="calories">
                            Calories
                        </option>

                        <option value="rating">
                            Rating
                        </option>
                    </select>
                </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sortedWorkouts.map((workout) => (
                    <WorkoutCard
                        key={workout.id}
                        workout={workout}
                    />
                ))}
            </div>
        </div>
    );
};

export default WorkoutGrid;