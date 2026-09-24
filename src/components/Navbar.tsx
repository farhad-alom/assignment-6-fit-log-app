'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPlan, getSaved } from '../lib/storage';

const Navbar = () => {
    const [planCount, setPlanCount] = useState(0);
    const [savedCount, setSavedCount] = useState(0);

    useEffect(() => {
        const updateCounts = () => {
            setPlanCount(getPlan().length);
            setSavedCount(getSaved().length);
        };

        updateCounts();

        window.addEventListener(
            'fitlog-storage',
            updateCounts
        );

        window.addEventListener(
            'storage',
            updateCounts
        );

        return () => {
            window.removeEventListener(
                'fitlog-storage',
                updateCounts
            );

            window.removeEventListener(
                'storage',
                updateCounts
            );
        };
    }, []);

    return (
        <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black/95 backdrop-blur">

            <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex shrink-0 items-center gap-3"
                >
                    <Image
                        src="/logo.png"
                        alt="FitLog Logo"
                        width="40"
                        height="40"
                        className="h-10 w-10 object-contain"
                    />

                    <span className="hidden text-xl font-bold tracking-wider text-white sm:block">
                        FITLOG
                    </span>
                </Link>

                {/* Navigation */}
                <div className="hidden items-center gap-8 md:flex">

                    <Link
                        href="/"
                        className="text-sm font-semibold uppercase tracking-wider text-zinc-300 transition hover:text-lime-400"
                    >
                        Workouts
                    </Link>

                    <Link
                        href="/my-plan"
                        className="text-sm font-semibold uppercase tracking-wider text-zinc-300 transition hover:text-lime-400"
                    >
                        My Plan
                    </Link>

                </div>

                {/* Counters */}
                <div className="flex items-center gap-2">

                    <Link
                        href="/my-plan"
                        className="rounded-full bg-lime-400 px-3 py-2 text-xs font-bold text-black transition hover:bg-lime-300 sm:px-4"
                    >
                        Plan {planCount}
                    </Link>

                    <Link
                        href="/my-plan"
                        className="rounded-full border border-zinc-700 px-3 py-2 text-xs font-bold text-white transition hover:border-lime-400 hover:text-lime-400 sm:px-4"
                    >
                        Saved {savedCount}
                    </Link>

                </div>

            </div>

        </nav>
    );
};

export default Navbar;