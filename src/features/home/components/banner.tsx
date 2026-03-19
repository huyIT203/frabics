'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { StyleSheet } from '@/shared/utils/styles';
import { ExploreButton } from '@/shared/components/ui/ExploreButton';
import { useResponsive } from '@/shared/hooks/useResponsive';

const TITLE_TEXT = 'Thiện Oanh';

// Petal configuration
const PETAL_COLORS = [
    'rgba(244, 180, 160, 0.6)',   // soft peach
    'rgba(230, 200, 170, 0.5)',   // warm cream
    'rgba(220, 160, 140, 0.4)',   // dusty rose
    'rgba(200, 190, 230, 0.3)',   // soft lavender
    'rgba(180, 210, 200, 0.35)',  // mint
    'rgba(250, 220, 180, 0.4)',   // warm yellow
];

interface Petal {
    id: number;
    left: string;
    bottom: string;
    size: number;
    color: string;
    delay: number;
    duration: number;
    driftX: number;
    driftY: number;
    spin: number;
    shape: 'circle' | 'ellipse';
}

const generatePetals = (count: number): Petal[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        bottom: `${-5 - Math.random() * 10}%`,
        size: 6 + Math.random() * 14,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        delay: Math.random() * 12,
        duration: 8 + Math.random() * 10,
        driftX: -80 + Math.random() * 160,
        driftY: -(300 + Math.random() * 400),
        spin: 180 + Math.random() * 360,
        shape: Math.random() > 0.5 ? 'circle' : 'ellipse',
    }));
};

export const HomeBanner = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const sectionRef = useRef<HTMLElement>(null);
    const { isMobile, isTablet } = useResponsive();

    // Generate petals once
    const petals = useMemo(() => generatePetals(isMobile ? 8 : 15), [isMobile]);

    // Initial mount animation
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Mouse parallax tracking
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                setMousePos({ x, y });
            }
        };

        const section = sectionRef.current;
        if (section) {
            section.addEventListener('mousemove', handleMouseMove);
            return () => section.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    const scrollToCollections = () => {
        const element = document.getElementById('home-collections');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const textParallax = {
        transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 5}px)`,
        transition: 'transform 0.4s ease-out',
    };

    return (
        <section style={{
            ...styles.bannerSection,
            width: isMobile ? 'calc(100% - 20px)' : isTablet ? 'calc(100% - 40px)' : 'calc(100% - 60px)',
            height: isMobile ? '70vh' : 'calc(100vh - 30px)',
            borderRadius: isMobile ? '20px' : '36px',
        }} ref={sectionRef}>
            {/* Full background image */}
            <div style={styles.bgImage} />

            {/* Floating Petals */}
            {petals.map((petal) => (
                <div
                    key={petal.id}
                    style={{
                        position: 'absolute',
                        left: petal.left,
                        bottom: petal.bottom,
                        width: `${petal.size}px`,
                        height: petal.shape === 'ellipse' ? `${petal.size * 0.6}px` : `${petal.size}px`,
                        backgroundColor: petal.color,
                        borderRadius: petal.shape === 'ellipse' ? '50% 50% 50% 20%' : '50%',
                        zIndex: 3,
                        pointerEvents: 'none',
                        animation: `floatPetal ${petal.duration}s ease-in-out ${petal.delay}s infinite`,
                        ['--drift-x' as string]: `${petal.driftX}px`,
                        ['--drift-y' as string]: `${petal.driftY}px`,
                        ['--spin' as string]: `${petal.spin}deg`,
                    } as React.CSSProperties}
                />
            ))}

            {/* Mouse-following soft light - hide on mobile */}
            {!isMobile && (
                <div
                    style={{
                        position: 'absolute',
                        width: '500px',
                        height: '500px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(255, 230, 210, 0.2) 0%, transparent 70%)',
                        pointerEvents: 'none',
                        zIndex: 3,
                        left: `calc(${(mousePos.x + 0.5) * 100}% - 250px)`,
                        top: `calc(${(mousePos.y + 0.5) * 100}% - 250px)`,
                        transition: 'left 0.6s ease-out, top 0.6s ease-out',
                    }}
                />
            )}

            {/* Text + Button */}
            <div
                style={{
                    ...styles.leftContent,
                    left: isMobile ? '20px' : isTablet ? '40px' : '360px',
                    right: isMobile ? '20px' : 'auto',
                    maxWidth: isMobile ? 'none' : '480px',
                    justifyContent: isMobile ? 'flex-end' : 'center',
                    paddingBottom: isMobile ? '60px' : 0,
                    ...textParallax,
                    animation: isVisible
                        ? 'fadeInUp 1s ease-out 0.3s forwards'
                        : 'none',
                    opacity: 0,
                }}
            >
                {/* Title */}
                <div style={styles.textBlock}>
                    <h1 style={{
                        ...styles.titleAlexBrush,
                        fontSize: isMobile ? '48px' : isTablet ? '72px' : '100px',
                    }}>
                        {TITLE_TEXT}
                    </h1>
                    <p style={{
                        ...styles.subtitle,
                        fontSize: isMobile ? '13px' : '16px',
                    }}>
                        Vải vóc độc đáo, kết hợp nghệ thuật dệt & tư duy thiết kế.
                        <br />
                        Nâng tầm không gian sống.
                    </p>
                </div>

                {/* CTA Button */}
                <ExploreButton variant="light" onClick={scrollToCollections} />
            </div>
        </section>
    );
};

const styles = StyleSheet.create({
    bannerSection: {
        position: 'relative',
        width: 'calc(100% - 60px)',
        height: 'calc(100vh - 30px)',
        margin: '0 auto',
        overflow: 'hidden',
        marginTop: '10px',
        cursor: 'default',
        borderRadius: '36px',
    },
    bgImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/banner/fabrics.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 0,
    },
    leftContent: {
        position: 'absolute',
        top: 0,
        left: '360px',
        height: '100%',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '28px',
        maxWidth: '480px',
    },
    textBlock: {
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    titleAlexBrush: {
        fontSize: '100px',
        fontWeight: 400,
        letterSpacing: '2px',
        margin: 0,
        fontFamily: "'Alex Brush', cursive",
        color: '#4A3520',
        lineHeight: 1.1,
    },
    subtitle: {
        fontSize: '16px',
        fontWeight: 400,
        letterSpacing: '0.5px',
        lineHeight: 1.7,
        margin: 0,
        fontFamily: "'Inter', sans-serif",
        color: '#5C4433',
    },
});