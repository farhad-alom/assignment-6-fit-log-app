import Image from 'next/image';
import React from 'react';

const Footer = () => {
    return (
        <footer className="border-t border-zinc-800 bg-black">
            <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

                <div className="flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        width="1280"
                        height="165"

                        alt="FitLog Logo"
                        className="h-8 w-8 object-contain"
                    />

                    <span className="font-bold tracking-wider text-white">
                        FITLOG
                    </span>
                </div>

                <p className="text-sm text-zinc-500">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>

            </div>
        </footer>
    );
};

export default Footer;