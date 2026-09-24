'use client';

import React, { useState } from 'react';
import { Bookmark, Check, Plus } from 'lucide-react';
import { toast } from 'react-toastify';

import type { Workout } from '@/types/workout';
import { getPlan, getSaved, savePlan, saveSaved } from '../lib/storage';

interface WorkoutActionsProps {
    workout: Workout;
}

const WorkoutActions = ({ workout }: WorkoutActionsProps) => {
    const [planAdded, setPlanAdded] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleAction = (
        type: 'plan' | 'saved',
        currentItems: Workout[],
        saveFn: (items: Workout[]) => void,
        setStatus: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        const exists = currentItems.some((item) => item.id === workout.id);

        if (exists) {
            setStatus(true);
            toast.info(type === 'plan' ? "Workout is already in today's plan." : 'Workout is already saved.');
            return;
        }

        if (type === 'plan' && currentItems.length >= 5) {
            toast.error("Today's plan can contain up to 5 workouts.");
            return;
        }

        saveFn([...currentItems, workout]);
        setStatus(true);
        toast.success(type === 'plan' ? "Added to today's plan." : 'Saved for later.');
    };

    return (
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            {/* Add to Plan Button */}
            <button
                type="button"
                onClick={() => handleAction('plan', getPlan(), savePlan, setPlanAdded)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-lime-400 px-6 py-3.5 text-sm font-bold uppercase text-black transition hover:bg-lime-300"
            >
                {planAdded ? <Check size={18} /> : <Plus size={18} />}
                {planAdded ? 'Added to Plan' : 'Add to Plan'}
            </button>

            {/* Save for Later Button */}
            <button
                type="button"
                onClick={() => handleAction('saved', getSaved(), saveSaved, setSaved)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-zinc-700 px-6 py-3.5 text-sm font-bold uppercase text-white transition hover:border-lime-400 hover:text-lime-400"
            >
                {saved ? <Check size={18} /> : <Bookmark size={18} />}
                {saved ? 'Saved' : 'Save for Later'}
            </button>
        </div>
    );
};

export default WorkoutActions;