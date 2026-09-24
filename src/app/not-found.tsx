import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
            <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.3em] text-lime-400">
                    FITLOG
                </p>

                <h1 className="mt-4 text-6xl font-bold">
                    404
                </h1>

                <p className="mt-4 text-zinc-400">
                    The workout you are looking for does not exist.
                </p>

                <Link
                    href="/"
                    className="mt-8 inline-block rounded-full bg-lime-400 px-6 py-3 font-semibold text-black"
                >
                    Back to Workouts
                </Link>
            </div>
        </main>
    );
}