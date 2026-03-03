'use client';

import React, { useState } from 'react';
import { StyleSheet } from '@/shared/utils/styles';
import { ArrowRightOutlined } from '@ant-design/icons';

export const HomeBanner = () => {
    const [isHovered, setIsHovered] = useState(false);

    const scrollToCollections = () => {
        const element = document.getElementById('home-collections');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section style={styles.bannerSection}>
            <video
                style={styles.video}
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/banner/video-banner.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div style={styles.overlay} />
            <div style={styles.content}>
                <h1 style={styles.title}>FRABICS</h1>
                <p style={styles.subtitle}>ELEGANCE IN EVERY THREAD</p>

                <div
                    style={{
                        ...styles.buttonWrapper,
                        width: isHovered ? '160px' : '100px',
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={scrollToCollections}
                >
                    <div style={styles.buttonContent}>
                        <span style={{
                            ...styles.buttonText,
                            opacity: isHovered ? 1 : 0,
                            transform: isHovered ? 'translateX(0)' : 'translateX(-10px)',
                        }}>
                            Mua sắm
                        </span>
                        <div style={{
                            ...styles.iconWrapper,
                            position: 'absolute',
                            right: isHovered ? '16px' : 'calc(50% - 12px)',
                            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}>
                            <ArrowRightOutlined style={styles.icon} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const styles = StyleSheet.create({
    bannerSection: {
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 84px)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    video: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        minWidth: '100%',
        minHeight: '100%',
        width: 'auto',
        height: 'auto',
        transform: 'translate(-50%, -50%)',
        objectFit: 'cover',
        zIndex: 0,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Tăng độ tối một chút để nổi bật nút trắng
        zIndex: 1,
    },
    content: {
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        color: '#ffffff',
    },
    title: {
        fontSize: '64px', // Tăng size cho sang trọng
        fontWeight: 700,
        letterSpacing: '12px',
        margin: '0 0 16px 0',
        fontFamily: 'Playfair Display, serif',
        textTransform: 'uppercase',
    },
    subtitle: {
        fontSize: '16px',
        fontWeight: 300,
        letterSpacing: '6px',
        margin: 0,
        fontFamily: 'Gotham Book, sans-serif',
        opacity: 0.9,
    },
    buttonWrapper: {
        marginTop: '40px',
        height: '48px',
        backgroundColor: '#F4EFE7',
        borderRadius: '4px',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        margin: '40px auto 0',
    },
    buttonContent: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    buttonText: {
        color: '#1a1a1a',
        fontSize: '14px',
        fontWeight: 500,
        letterSpacing: '1px',
        whiteSpace: 'nowrap',
        transition: 'all 0.4s ease',
        position: 'absolute',
        left: '24px',
    },
    iconWrapper: {
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: '#1a1a1a',
        fontSize: '16px',

    }
});