'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Hook to trigger a fade-in-from-bottom animation when element scrolls into view.
 * Uses IntersectionObserver for performance.
 * 
 * @param threshold - How much of the element must be visible (0-1), default 0.1
 * @param delay - Animation delay in ms, default 0
 */
export const useScrollFadeIn = (threshold = 0.1, delay = 0) => {
    const ref = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element);
                }
            },
            { threshold }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold]);

    const animationStyle: React.CSSProperties = {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`,
    };

    return { ref, animationStyle, isVisible };
};
