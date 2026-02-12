'use client';

import React from 'react';
import { StyleSheet } from '@/shared/utils/styles';

export const PartnerBar = () => {
    return (
        <div style={styles.wrapper}>
            <style>
                {`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                `}
            </style>
            <div
                className="partner-marquee"
                style={{
                    ...styles.marquee,
                    animation: 'marquee 60s linear infinite',
                }}
            >
                <div style={styles.content}>
                    {[...Array(10)].map((_, i) => (
                        <div key={i} style={styles.item}>
                            <span style={styles.textBlack}>CHẤT LƯỢNG</span>
                            <span style={styles.separator}>⚜</span>
                            <span style={styles.textBold}>TINH TẾ</span>
                            <span style={styles.separator}>⚜</span>
                            <span style={styles.textBlack}>SANG TRỌNG</span>
                            <span style={styles.separator}>⚜</span>
                        </div>
                    ))}
                </div>
                <div style={styles.content}>
                    {[...Array(10)].map((_, i) => (
                        <div key={i} style={styles.item}>
                            <span style={styles.textBlack}>CHẤT LƯỢNG</span>
                            <span style={styles.separator}>⚜</span>
                            <span style={styles.textBold}>TINH TẾ</span>
                            <span style={styles.separator}>⚜</span>
                            <span style={styles.textBlack}>SANG TRỌNG</span>
                            <span style={styles.separator}>⚜</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '46px',
        background: 'linear-gradient(90deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
        backgroundSize: '200% auto',
        animation: 'shimmer 10s linear infinite',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px solid #AA771C',
        borderBottom: '1px solid #AA771C',
        cursor: 'default',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    },
    marquee: {
        display: 'flex',
        whiteSpace: 'nowrap',
    },
    content: {
        display: 'flex',
        flexShrink: 0,
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        paddingRight: '120px',
        fontFamily: 'Gotham Book, sans-serif',
        letterSpacing: '4px',
    },
    textBlack: {
        fontSize: '11px',
        fontWeight: 400,
        color: '#1a1a1a', // Chữ đen trên nền vàng để cực kỳ nổi bật
        textTransform: 'uppercase',
        opacity: 0.8,
    },
    textBold: {
        fontSize: '11px',
        fontWeight: 700,
        color: '#000000',
        textTransform: 'uppercase',
    },
    separator: {
        fontSize: '18px',
        color: '#1a1a1a',
        margin: '0 40px',
        opacity: 0.7,
    }
});
