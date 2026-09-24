import React from 'react';
import Link from 'next/link';
import { ArrowDownRight } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
    return (
        <section className="border-b border-zinc-800 bg-black">
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">

                {/* Content */}
                <div>
                    <p className="mb-5 text-sm font-bold tracking-[0.25em] text-lime-400">
                        WORKOUT LIBRARY
                    </p>

                    <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
                        Train With Intent. Log Every Set.
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
                        FitLog is a dark, no-nonsense gym companion: pick a lift,
                        lock it into today&apos;s plan, and watch the week&apos;s work add up.
                    </p>

                    <Link
                        href="#library"
                        className="mt-8 inline-flex items-center gap-3 rounded-full bg-lime-400 px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-lime-300"
                    >
                        Browse Workouts
                        <ArrowDownRight size={18} />
                    </Link>
                </div>

                {/* Image */}
                <div className="overflow-hidden rounded-2xl border border-zinc-800">
                    <Image
                        src="/banner.png"
                        height="500"
                        width="1000"
                        alt="FitLog workout banner"
                        className="h-full min-h-80 w-full object-cover"
                    />
                </div>

            </div>
        </section>
    );
};

export default Hero;