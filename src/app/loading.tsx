import React from 'react';

const Loading = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-black">
            <div className="text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-zinc-800 border-t-lime-400" />

                <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                    Loading workouts...
                </p>
            </div>
        </main>
    );
};

export default Loading;