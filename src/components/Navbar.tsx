'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPlan, getSaved } from '@/lib/storage';
import Image from 'next/image';

const Navbar = () => {
    const [planCount, setPlanCount] = useState(0);
    const [savedCount, setSavedCount] = useState(0);

    const updateCounts = () => {
        setPlanCount(getPlan().length);
        setSavedCount(getSaved().length);
    };

    useEffect(() => {
        updateCounts();

        window.addEventListener('storage', updateCounts);

        return () => {
            window.removeEventListener('storage', updateCounts);
        };
    }, []);

    return (
        <nav className="border-b border-zinc-800 bg-black">
            <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                <Link
                    href="/"
                    className="flex items-center gap-3"
                >
                    <Image
                        src="/logo.png"
                        alt="FitLog Logo"
                        width="40"
                        height="40"
                        className="h-10 w-10 object-contain"
                    />

                    <span className="text-xl font-bold tracking-wider text-white">
                        FITLOG
                    </span>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    <Link
                        href="/"
                        className="text-sm font-semibold uppercase tracking-wider text-lime-400"
                    >
                        Workout
                    </Link>

                    <Link
                        href="/my-plan"
                        className="text-sm font-semibold uppercase tracking-wider text-zinc-400 transition hover:text-white"
                    >
                        My Plan
                    </Link>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">

                    <Link
                        href="/my-plan"
                        className="rounded-full bg-lime-400 px-3 py-2 text-xs font-bold text-black sm:px-4"
                    >
                        Plan {planCount}
                    </Link>

                    <Link
                        href="/my-plan"
                        className="rounded-full border border-zinc-600 px-3 py-2 text-xs font-bold text-white sm:px-4"
                    >
                        Saved {savedCount}
                    </Link>

                </div>

            </div>
        </nav>
    );
};

export default Navbar;