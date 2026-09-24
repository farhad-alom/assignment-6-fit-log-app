'use client';

import React, { useState } from 'react';
import type { Workout } from '@/types/workout';
import { getPlan, getSaved, savePlan, saveSaved } from '@/lib/storage';
import { Check, Bookmark, Plus } from 'lucide-react';

interface WorkoutActionsProps {
    workout: Workout;
}

const WorkoutActions = ({ workout }: WorkoutActionsProps) => {
    const [planAdded, setPlanAdded] = useState(false);
    const [saved, setSaved] = useState(false);
    const [message, setMessage] = useState('');

    const showMessage = (text: string) => {
        setMessage(text);

        setTimeout(() => {
            setMessage('');
        }, 2500);
    };

    const handleAddToPlan = () => {
        const currentPlan = getPlan();

        const alreadyAdded = currentPlan.some(
            (item) => item.id === workout.id
        );

        if (alreadyAdded) {
            setPlanAdded(true);
            showMessage('Already in today’s plan');
            return;
        }

        if (currentPlan.length >= 5) {
            showMessage('Today’s plan can contain up to 5 workouts');
            return;
        }

        savePlan([...currentPlan, workout]);

        setPlanAdded(true);
        showMessage('Added to today’s plan');
    };

    const handleSave = () => {
        const currentSaved = getSaved();

        const alreadySaved = currentSaved.some(
            (item) => item.id === workout.id
        );

        if (alreadySaved) {
            setSaved(true);
            showMessage('Already saved');
            return;
        }

        saveSaved([...currentSaved, workout]);

        setSaved(true);
        showMessage('Saved for later');
    };

    return (
        <>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                <button
                    onClick={handleAddToPlan}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-lime-400 px-6 py-3.5 text-sm font-bold uppercase text-black transition hover:bg-lime-300"
                >
                    {planAdded ? (
                        <>
                            <Check size={18} />
                            Added to Plan
                        </>
                    ) : (
                        <>
                            <Plus size={18} />
                            Add to Plan
                        </>
                    )}
                </button>

                <button
                    onClick={handleSave}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full border border-zinc-700 px-6 py-3.5 text-sm font-bold uppercase text-white transition hover:border-lime-400 hover:text-lime-400"
                >
                    {saved ? (
                        <>
                            <Check size={18} />
                            Saved
                        </>
                    ) : (
                        <>
                            <Bookmark size={18} />
                            Save for Later
                        </>
                    )}
                </button>

            </div>

            {message && (
                <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-xl">
                    {message}
                </div>
            )}
        </>
    );
};

export default WorkoutActions;