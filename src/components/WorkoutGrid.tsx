
'use client';

import React, { useState } from 'react';
import WorkoutCard from './WorkoutCard';
import type { Workout } from '@/types/workout';
import { ArrowDownUp, Search } from 'lucide-react';

interface WorkoutGridProps {
    workouts: Workout[];
}

const WorkoutGrid = ({ workouts }: WorkoutGridProps) => {
    const [sortBy, setSortBy] = useState('default');
    const [searchTerm, setSearchTerm] = useState('');


    const filteredWorkouts = workouts.filter((workout) => {
        const search = searchTerm.toLowerCase().trim();

        if (!search) {
            return true;
        }

        const workoutName = workout.name?.toLowerCase() || '';
        const workoutCategory = Array.isArray(workout.category)
            ? workout.category.join(' ').toLowerCase()
            : workout.category?.toLowerCase() || '';

        return (
            workoutName.includes(search) ||
            workoutCategory.includes(search)
        );
    });


    const sortedWorkouts = [...filteredWorkouts].sort((a, b) => {
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

            <div className="mb-8 flex flex-col gap-4">

                <div className="relative w-full">
                    <Search
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                    />

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                        placeholder="Search workouts by name or category..."
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-lime-400"
                    />
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <p className="text-sm text-zinc-500">
                        Showing {sortedWorkouts.length} of {workouts.length} workouts
                    </p>

                    <div className="flex items-center gap-3">
                        <ArrowDownUp
                            size={18}
                            className="text-lime-400"
                        />

                        <select
                            value={sortBy}
                            onChange={(e) =>
                                setSortBy(e.target.value)
                            }
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

            </div>

            {sortedWorkouts.length === 0 ? (

                <div className="rounded-2xl border border-dashed border-zinc-800 px-6 py-16 text-center">
                    <Search
                        size={40}
                        className="mx-auto text-zinc-700"
                    />

                    <h3 className="mt-5 text-xl font-black uppercase">
                        No workouts found
                    </h3>

                    <p className="mt-2 text-sm text-zinc-500">
                        Try searching with another workout name or category.
                    </p>
                </div>

            ) : (

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {sortedWorkouts.map((workout) => (
                        <WorkoutCard
                            key={workout.id}
                            workout={workout}
                        />
                    ))}
                </div>

            )}

        </div>
    );
};

export default WorkoutGrid;