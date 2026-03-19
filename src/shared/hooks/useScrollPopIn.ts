'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Hook for a "pop in" animation: scale from small to full + fade in on scroll.
 * Similar to useScrollFadeIn but uses scale instead of translateY.
 *
 * @param threshold - IntersectionObserver threshold (0-1), default 0.1
 * @param delay - Animation delay in ms, default 0
 */
export const useScrollPopIn = (threshold = 0.1, delay = 0) => {
    const ref = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold]);

    const popStyle: React.CSSProperties = {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.6)',
        transition: `opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
    };

    return { ref, popStyle, isVisible };
};
