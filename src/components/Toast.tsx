'use client';

import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface ToastProps {
    message: string;
    type?: 'success' | 'error';
    onClose: () => void;
}

const Toast = ({
    message,
    type = 'success',
    onClose,
}: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2500);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-2xl">
            {type === 'success' ? (
                <Check
                    size={18}
                    className="text-lime-400"
                />
            ) : (
                <X
                    size={18}
                    className="text-red-400"
                />
            )}

            <span>{message}</span>
        </div>
    );
};

export default Toast;








