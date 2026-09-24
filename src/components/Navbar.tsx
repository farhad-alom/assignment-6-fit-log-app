import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    return (
        <nav className="border-b border-zinc-800 bg-black">
            <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="FitLog Logo"
                        width="500"
                        height="300"
                        className="h-10 w-10 object-contain"
                    />

                    <span className="text-xl font-bold tracking-wider text-white">
                        FITLOG
                    </span>
                </Link>

                {/* Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    <Link
                        href="/"
                        className="text-sm font-semibold uppercase tracking-wider text-lime-400 transition hover:text-white"
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

                {/* Counters */}
                <div className="flex items-center gap-2 sm:gap-3">

                    <Link
                        href="/my-plan"
                        className="rounded-full bg-lime-400 px-3 py-2 text-xs font-bold text-black sm:px-4"
                    >
                        Plan <span>0</span>
                    </Link>

                    <Link
                        href="/my-plan"
                        className="rounded-full border border-zinc-600 px-3 py-2 text-xs font-bold text-white sm:px-4"
                    >
                        Saved <span>0</span>
                    </Link>

                </div>

            </div>
        </nav>
    );
};

export default Navbar;