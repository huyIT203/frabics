'use client';

import React from 'react';
import { StyleSheet } from '@/shared/utils/styles';
import Image from 'next/image';
import { ExploreButton } from '@/shared/components/ui/ExploreButton';
import { useScrollPopIn } from '@/shared/hooks/useScrollPopIn';

const FABRIC_IMAGES = [
    '/collections/linen/linen.jpg',
    '/collections/kaki/kaki.jpg',
    '/collections/thun/thun.jpg',
    '/collections/ren-luoi/ren.jpg',
    '/collections/gam/gam.jpg',
    '/collections/linen/l1.png',
    '/collections/kaki/k1.png',
    '/collections/thun/t1.png',
    '/collections/ren-luoi/r1.png',
    '/collections/gam/w1.png',
    '/collections/linen/l2.png',
    '/collections/kaki/k2.png',
];

const TOTAL = FABRIC_IMAGES.length;
const ANGLE_STEP = 360 / TOTAL; // 30° each

export const FabricShowcase = () => {
    const { ref, popStyle } = useScrollPopIn(0.1);

    return (
        <section ref={ref as React.RefObject<HTMLElement>} style={{ ...styles.section, ...popStyle }}>
            {/* Rotating circular loop */}
            <div style={styles.orbitCenter}>
                <div className="fabric-orbit-ring" style={styles.orbitRing}>
                    {FABRIC_IMAGES.map((src, i) => {
                        const angle = i * ANGLE_STEP;
                        return (
                            <div
                                key={i}
                                className="arc-item"
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    width: 0,
                                    height: 0,
                                    transform: `rotate(${angle}deg)`,
                                }}
                            >
                                {/* Push outward by radius, then counter-rotate */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '-45vw', // radius
                                        left: '-140px', // half card width
                                        width: '280px',
                                        height: '170px',
                                        borderRadius: '24px',
                                        overflow: 'hidden',
                                        transform: 'none', // keep cards straight
                                        boxShadow: '0 6px 25px rgba(0,0,0,0.1)',
                                    }}
                                >
                                    <Image
                                        src={src}
                                        alt={`Fabric ${i + 1}`}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Fade edges */}
            <div style={styles.fadeLeft} />
            <div style={styles.fadeRight} />

            {/* Center text */}
            <div style={styles.centerContent}>
                <h2 style={styles.title}>Khám phá bộ sưu tập</h2>
                <ExploreButton variant="dark" />
            </div>

            {/* Slow rotation animation */}
            <style>{`
                .fabric-orbit-ring {
                    animation: slowSpin 60s linear infinite;
                }
                @keyframes slowSpin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
};

const styles = StyleSheet.create({
    section: {
        position: 'relative',
        width: '100%',
        height: '80vh',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    orbitCenter: {
        position: 'absolute',
        top: '120%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 0,
        height: 0,
    },
    orbitRing: {
        position: 'relative',
        width: 0,
        height: 0,
    },
    centerContent: {
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        textAlign: 'center',
        marginTop: '15%',
    },
    title: {
        fontSize: '42px',
        fontWeight: 300,
        fontFamily: "'Playfair Display', serif",
        color: '#1a1a1a',
        margin: 0,
        letterSpacing: '1px',
        lineHeight: 1.2,
    },
    fadeLeft: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '200px',
        height: '100%',
        background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
        zIndex: 8,
        pointerEvents: 'none',
    },
    fadeRight: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '200px',
        height: '100%',
        background: 'linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
        zIndex: 8,
        pointerEvents: 'none',
    },
});
