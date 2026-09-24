import type { Workout } from '@/types/workout';

const PLAN_KEY = 'fitlog-plan';
const SAVED_KEY = 'fitlog-saved';

export const getPlan = (): Workout[] => {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        const data = localStorage.getItem(PLAN_KEY);

        if (!data) {
            return [];
        }

        const parsed = JSON.parse(data);

        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed;
    } catch {
        return [];
    }
};

export const savePlan = (workouts: Workout[]) => {
    if (typeof window === 'undefined') {
        return;
    }

    localStorage.setItem(
        PLAN_KEY,
        JSON.stringify(workouts)
    );

    window.dispatchEvent(
        new Event('fitlog-storage')
    );
};

export const getSaved = (): Workout[] => {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        const data = localStorage.getItem(SAVED_KEY);

        if (!data) {
            return [];
        }

        const parsed = JSON.parse(data);

        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed;
    } catch {
        return [];
    }
};

export const saveSaved = (workouts: Workout[]) => {
    if (typeof window === 'undefined') {
        return;
    }

    localStorage.setItem(
        SAVED_KEY,
        JSON.stringify(workouts)
    );

    window.dispatchEvent(
        new Event('fitlog-storage')
    );
};