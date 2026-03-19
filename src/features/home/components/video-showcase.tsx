'use client';

import React, { useState, useRef, useCallback, useSyncExternalStore } from 'react';
import { Typography, Grid } from 'antd';
import { PlayCircleFilled } from '@ant-design/icons';
import { StyleSheet } from '@/shared/utils/styles';
import { useScrollFadeIn } from '@/shared/hooks/useScrollFadeIn';

const { Title } = Typography;
const { useBreakpoint } = Grid;

const VIDEOS = [
    { id: 1, src: '/video/video1.mp4', title: 'Story 1', color: '#B4D2C8' },
    { id: 2, src: '/video/video2.mp4', title: 'Story 2', color: '#8874A3' },
    { id: 3, src: '/video/video3.mp4', title: 'Story 3', color: '#66B3D1' },
];

export const VideoShowcase = () => {
    const { ref, isVisible } = useScrollFadeIn(0.1);
    const screens = useBreakpoint();
    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );
    const isDesktop = mounted ? (screens.md ?? true) : true;

    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    // Track which videos are currently playing (they keep playing even when swiped away)
    const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set());
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    // Swipe handling
    const dragStartX = useRef(0);
    const isDragging = useRef(false);

    const handleVideoEnded = useCallback((index: number) => {
        setPlayingVideos(prev => {
            const next = new Set(prev);
            next.delete(index);
            return next;
        });
    }, []);

    const handleCardClick = (index: number) => {
        if (isDragging.current) return; // Ignore click after drag

        if (activeIndex === index) {
            // Toggle play/pause on the active card
            const video = videoRefs.current[index];
            if (video) {
                if (playingVideos.has(index)) {
                    video.pause();
                    setPlayingVideos(prev => {
                        const next = new Set(prev);
                        next.delete(index);
                        return next;
                    });
                } else {
                    video.play();
                    setPlayingVideos(prev => new Set(prev).add(index));
                }
            }
        } else {
            // Swipe to this card (don't stop any playing videos)
            setActiveIndex(index);
        }
    };

    // Mouse/Touch swipe handlers
    const handlePointerDown = (e: React.PointerEvent) => {
        dragStartX.current = e.clientX;
        isDragging.current = false;
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        const diff = e.clientX - dragStartX.current;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            isDragging.current = true;
            if (diff < 0) {
                // Swiped left → next card
                setActiveIndex(prev => (prev + 1) % VIDEOS.length);
            } else {
                // Swiped right → prev card
                setActiveIndex(prev => (prev - 1 + VIDEOS.length) % VIDEOS.length);
            }
            // Reset drag flag after a tick so click handler sees it
            setTimeout(() => { isDragging.current = false; }, 100);
        }
    };

    const getCardStyle = (index: number) => {
        let diff = index - activeIndex;
        if (diff === 2) diff = -1;
        if (diff === -2) diff = 1;

        const isCenter = diff === 0;
        const isLeft = diff === -1;

        let translateX = '0px';
        let translateY = '0px';
        let rotate = '0deg';
        let scale = 1;
        let zIndex = 1;

        const offsetBase = isDesktop ? 220 : 100;
        const scaleFactor = isDesktop ? 1 : 0.85;

        if (isCenter) {
            translateX = '0px';
            translateY = '0px';
            rotate = '0deg';
            scale = 1.05 * scaleFactor;
            zIndex = 3;
        } else if (isLeft) {
            translateX = `-${offsetBase}px`;
            translateY = '20px';
            rotate = '-12deg';
            scale = 0.9 * scaleFactor;
            zIndex = 2;
        } else {
            translateX = `${offsetBase}px`;
            translateY = '20px';
            rotate = '12deg';
            scale = 0.9 * scaleFactor;
            zIndex = 1;
        }

        return {
            transform: `translate(${translateX}, ${translateY}) rotate(${rotate}) scale(${scale})`,
            zIndex,
        };
    };

    return (
        <section ref={ref as React.RefObject<HTMLElement>} style={styles.container}>
            <div style={{
                ...styles.header,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.6)',
                transition: 'opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}>
                <Title level={2} style={styles.mainTitle}>Chia Sẻ & Cảm Hứng</Title>
                <div style={styles.subTitle}>Những khoảnh khắc ấn tượng từ Thiện Oanh</div>
            </div>

            <div style={{
                ...styles.contentWrapper,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.6)',
                transition: 'opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s',
            }}>
                {/* Dải băng chữ chạy ở nền */}
                <div style={styles.tapeBackground}>
                    <div className="scrolling-text">
                        <span>{'DISCOVER THE NEW COLLECTION • THIỆN OANH LACE & FABRICS • NEW ARRIVALS • KHÁM PHÁ BỘ SƯU TẬP MỚI NHẤT • DISCOVER THE NEW COLLECTION • THIỆN OANH LACE & FABRICS • NEW ARRIVALS • KHÁM PHÁ BỘ SƯU TẬP MỚI NHẤT • '}</span>
                        <span>{'DISCOVER THE NEW COLLECTION • THIỆN OANH LACE & FABRICS • NEW ARRIVALS • KHÁM PHÁ BỘ SƯU TẬP MỚI NHẤT • DISCOVER THE NEW COLLECTION • THIỆN OANH LACE & FABRICS • NEW ARRIVALS • KHÁM PHÁ BỘ SƯU TẬP MỚI NHẤT • '}</span>
                    </div>
                </div>

                {/* Vùng chứa các thẻ Video + Swipe */}
                <div
                    style={{
                        ...styles.cardsContainer,
                        height: isDesktop ? '560px' : '480px',
                        cursor: 'grab',
                    }}
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {VIDEOS.map((video, index) => {
                        const styleConfig = getCardStyle(index);
                        const isCenter = index === activeIndex;
                        const isVideoPlaying = playingVideos.has(index);

                        return (
                            <div
                                key={video.id}
                                style={{
                                    ...styles.card,
                                    backgroundColor: video.color,
                                    transform: styleConfig.transform,
                                    zIndex: styleConfig.zIndex,
                                }}
                                onClick={() => handleCardClick(index)}
                            >
                                <video
                                    ref={(el) => {
                                        videoRefs.current[index] = el;
                                    }}
                                    src={video.src}
                                    style={styles.videoElement}
                                    muted={false}
                                    playsInline
                                    onEnded={() => handleVideoEnded(index)}
                                />

                                {/* Overlay chỉ hiển thị Play icon khi chưa chạy */}
                                <div style={{
                                    ...styles.playOverlay,
                                    backgroundColor: 'transparent',
                                    pointerEvents: 'none',
                                }}>
                                    {isCenter && !isVideoPlaying && (
                                        <PlayCircleFilled style={{
                                            color: '#ffffff',
                                            fontSize: '64px',
                                            opacity: 0.9,
                                            filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.4))',
                                        }} />
                                    )}
                                    {!isCenter && !isVideoPlaying && (
                                        <PlayCircleFilled style={{
                                            color: '#ffffff',
                                            fontSize: '48px',
                                            opacity: 0.4,
                                            filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.4))',
                                        }} />
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* Chỉ dẫn Swipe - hiện khi hover */}
                    <div style={{
                        ...styles.swipeHint,
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? 'translate(-50%, 0)' : 'translate(-50%, 10px)',
                    }}>
                        <span style={styles.swipeArrow}>←</span>
                        <span style={styles.swipeText}>Swipe</span>
                        <span style={styles.swipeArrow}>→</span>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slideTextInfinite {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .scrolling-text {
                    display: inline-flex;
                    font-size: 24px;
                    font-weight: 800;
                    color: #000000;
                    white-space: nowrap;
                    animation: slideTextInfinite 25s linear infinite;
                    font-family: 'Playfair Display', serif;
                    letter-spacing: 3px;
                }
            `}</style>
        </section>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 'calc(100% - 60px)',
        margin: '0 auto',
        padding: '60px 30px',
        backgroundImage: 'url(/video/bg2.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '36px',
    },
    header: {
        textAlign: 'center',
        marginBottom: '40px',
    },
    mainTitle: {
        fontSize: '42px',
        fontWeight: 100,
        marginBottom: '15px',
        fontFamily: 'Playfair Display',
        color: '#000000',
    },
    subTitle: {
        fontSize: '15px',
        color: '#000000',
        fontFamily: 'Gotham Book, sans-serif',
        marginTop: '5px',
    },
    contentWrapper: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '600px',
    },
    tapeBackground: {
        position: 'absolute',
        top: '50%',
        left: '-10%',
        width: '120%',
        height: '60px',
        backgroundColor: '#FFB6C1',
        transform: 'translateY(-50%) rotate(-6deg)',
        display: 'flex',
        alignItems: 'center',
        zIndex: 0,
        overflow: 'hidden',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    },
    cardsContainer: {
        position: 'relative',
        width: '320px',
        zIndex: 1,
        perspective: '1000px',
        touchAction: 'pan-y',
        userSelect: 'none',
    },
    card: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '24px',
        overflow: 'hidden',
        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '3px solid #fff',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        cursor: 'pointer',
    },
    videoElement: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        backgroundColor: '#111',
    },
    playOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.4s ease',
    },
    swipeHint: {
        position: 'absolute',
        bottom: '-50px',
        left: '50%',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'rgba(0,0,0,0.75)',
        color: '#ffffff',
        padding: '8px 20px',
        borderRadius: '30px',
        zIndex: 10,
        transition: 'all 0.4s ease',
        backdropFilter: 'blur(4px)',
    },
    swipeArrow: {
        fontSize: '16px',
        fontWeight: 700,
        color: '#ffffff',
    },
    swipeText: {
        fontSize: '14px',
        fontWeight: 600,
        fontFamily: 'Open Sans, sans-serif',
        letterSpacing: '1px',
        textTransform: 'uppercase',
    },
});
