import React from 'react';
import Link from 'next/link';
import { ArrowLeft, SearchX } from 'lucide-react';

const NotFound = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
            <div className="text-center">

                <SearchX
                    size={56}
                    className="mx-auto text-lime-400"
                />

                <p className="mt-6 text-sm font-bold tracking-[0.3em] text-lime-400">
                    FITLOG
                </p>

                <h1 className="mt-3 text-6xl font-black">
                    404
                </h1>

                <p className="mx-auto mt-4 max-w-md text-zinc-400">
                    The workout you are looking for does not exist
                    or may have been removed.
                </p>

                <Link
                    href="/"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-3 font-bold text-black transition hover:bg-lime-300"
                >
                    <ArrowLeft size={18} />
                    Back to Workouts
                </Link>

            </div>
        </main>
    );
};

export default NotFound;