'use client';

import { useSyncExternalStore } from 'react';
import { Grid } from 'antd';

const { useBreakpoint } = Grid;

/**
 * Shared responsive hook providing consistent breakpoint booleans.
 * - isMobile: ≤576px (xs)
 * - isTablet: 577–768px (sm but not md)
 * - isDesktop: >768px (md+)
 */
export const useResponsive = () => {
    const screens = useBreakpoint();
    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );

    const isMobile = mounted ? !(screens.sm ?? false) : false;
    const isTablet = mounted ? (screens.sm ?? false) && !(screens.md ?? false) : false;
    const isDesktop = mounted ? (screens.md ?? true) : true;

    return { isMobile, isTablet, isDesktop, screens, mounted };
};
