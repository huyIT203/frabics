'use client';

import React, { useRef, useState, useCallback } from 'react';
import { Typography } from 'antd';
import { StyleSheet } from '@/shared/utils/styles';
import Image from 'next/image';
import { useScrollPopIn } from '@/shared/hooks/useScrollPopIn';


const { Title, Text } = Typography;

const CATEGORIES = [
    { key: 'linen', label: 'Linen' },
    { key: 'kaki', label: 'Kaki' },
    { key: 'thun', label: 'Thun' },
    { key: 'ren-luoi', label: 'Ren/lưới' },
    { key: 'gam', label: 'Gấm' },
];

interface CollectionData {
    fabricImage: string;
    fabricName: string;
    fabricDesc: string;
    specs: { label: string; value: string }[];
    looks: { id: number; image: string; label: string }[];
}

const COLLECTIONS_DATA: Record<string, CollectionData> = {
    linen: {
        fabricImage: '/collections/linen/linen.jpg',
        fabricName: 'Linen',
        fabricDesc: 'Chất liệu linen tự nhiên, thoáng mát, phù hợp cho thời trang xuân hè. Bề mặt vải có nếp gấp tự nhiên tạo vẻ đẹp thanh lịch.',
        specs: [
            { label: 'Thành phần', value: '100% Linen' },
            { label: 'Khổ vải', value: '1.4m - 1.5m' },
            { label: 'Định lượng', value: '150 - 200 GSM' },
            { label: 'Bảo quản', value: 'Giặt tay, ủi nhẹ' },
        ],
        looks: [
            { id: 1, image: '/collections/linen/l1.png', label: 'Mẫu 01' },
            { id: 2, image: '/collections/linen/l2.png', label: 'Mẫu 02' },
            { id: 3, image: '/collections/linen/l3.png', label: 'Mẫu 03' },
            { id: 4, image: '/collections/linen/l4.png', label: 'Mẫu 04' },
        ],
    },
    kaki: {
        fabricImage: '/collections/kaki/kaki.jpg',
        fabricName: 'Kaki',
        fabricDesc: 'Vải kaki bền chắc, dễ phối đồ, phù hợp cho cả trang phục công sở và casual.',
        specs: [
            { label: 'Thành phần', value: '100% Cotton' },
            { label: 'Khổ vải', value: '1.5m - 1.6m' },
            { label: 'Định lượng', value: '200 - 280 GSM' },
            { label: 'Bảo quản', value: 'Giặt máy, ủi nhiệt vừa' },
        ],
        looks: [
            { id: 1, image: '/collections/kaki/k1.png', label: 'Mẫu 01' },
            { id: 2, image: '/collections/kaki/k2.png', label: 'Mẫu 02' },
            { id: 3, image: '/collections/kaki/k3.png', label: 'Mẫu 03' },
            { id: 4, image: '/collections/kaki/k4.png', label: 'Mẫu 04' },
        ],
    },
    thun: {
        fabricImage: '/collections/thun/thun.jpg',
        fabricName: 'Thun',
        fabricDesc: 'Vải thun co giãn tốt, mềm mại, lý tưởng cho trang phục thể thao và đời thường.',
        specs: [
            { label: 'Thành phần', value: '95% Cotton, 5% Spandex' },
            { label: 'Khổ vải', value: '1.6m - 1.8m' },
            { label: 'Định lượng', value: '180 - 220 GSM' },
            { label: 'Bảo quản', value: 'Giặt máy, không vắt' },
        ],
        looks: [
            { id: 1, image: '/collections/thun/t1.png', label: 'Mẫu 01' },
            { id: 2, image: '/collections/thun/t2.png', label: 'Mẫu 02' },
            { id: 3, image: '/collections/thun/t3.png', label: 'Mẫu 03' },
            { id: 4, image: '/collections/thun/t4.png', label: 'Mẫu 04' },
            { id: 5, image: '/collections/thun/t5.png', label: 'Mẫu 05' },

        ],
    },
    'ren-luoi': {
        fabricImage: '/collections/ren-luoi/ren.jpg',
        fabricName: 'Ren/lưới',
        fabricDesc: 'Ren tinh xảo và lưới mềm mại, tạo điểm nhấn sang trọng cho thiết kế thời trang cao cấp.',
        specs: [
            { label: 'Thành phần', value: 'Polyester/Nylon' },
            { label: 'Khổ vải', value: '1.3m - 1.5m' },
            { label: 'Định lượng', value: '80 - 120 GSM' },
            { label: 'Bảo quản', value: 'Giặt tay, phơi râm' },
        ],
        looks: [
            { id: 1, image: '/collections/ren-luoi/r1.png', label: 'Mẫu 01' },
            { id: 2, image: '/collections/ren-luoi/r2.png', label: 'Mẫu 02' },
            { id: 3, image: '/collections/ren-luoi/r3.png', label: 'Mẫu 03' },
            { id: 4, image: '/collections/ren-luoi/r4.png', label: 'Mẫu 04' },
        ],
    },
    gam: {
        fabricImage: '/collections/gam/gam.jpg',
        fabricName: 'Gấm',
        fabricDesc: 'Vải gấm hoa văn công phu, chất liệu dày dặn, thường dùng trong áo dài và trang phục truyền thống.',
        specs: [
            { label: 'Thành phần', value: 'Tơ tằm/Polyester' },
            { label: 'Khổ vải', value: '1.4m - 1.5m' },
            { label: 'Định lượng', value: '200 - 300 GSM' },
            { label: 'Bảo quản', value: 'Giặt khô, ủi hơi' },
        ],
        looks: [
            { id: 1, image: '/collections/gam/w1.png', label: 'Mẫu 01' },
            { id: 2, image: '/collections/gam/w2.png', label: 'Mẫu 02' },
            { id: 3, image: '/collections/gam/w3.png', label: 'Mẫu 03' },
            { id: 4, image: '/collections/gam/w4.png', label: 'Mẫu 04' },
        ],
    },
};

export const Homecollections = () => {
    const [activeKey, setActiveKey] = useState('linen');
    const [activeLook, setActiveLook] = useState(0);
    const currentData = COLLECTIONS_DATA[activeKey] || COLLECTIONS_DATA.linen;
    const looks = currentData.looks;
    const { ref: popRef, popStyle } = useScrollPopIn(0.1);

    // Swipe for looks slider
    const swipeStartX = useRef(0);
    const swiping = useRef(false);

    const handleSliderDown = useCallback((e: React.PointerEvent) => {
        swiping.current = true;
        swipeStartX.current = e.clientX;
    }, []);

    const handleSliderUp = useCallback((e: React.PointerEvent) => {
        if (!swiping.current) return;
        swiping.current = false;
        const diff = e.clientX - swipeStartX.current;
        if (Math.abs(diff) > 50) {
            if (diff < 0 && activeLook < looks.length - 1) {
                setActiveLook(prev => prev + 1);
            } else if (diff > 0 && activeLook > 0) {
                setActiveLook(prev => prev - 1);
            }
        }
    }, [activeLook, looks.length]);

    // Reset look index when switching fabric
    const handleCategoryClick = (key: string) => {
        setActiveKey(key);
        setActiveLook(0);
    };

    // Calculate style for each look image based on distance from active
    const getLookStyle = (index: number): React.CSSProperties => {
        const diff = index - activeLook;
        const absDiff = Math.abs(diff);

        // Position: each card offset horizontally
        const offsetX = diff * 450;
        // Scale: active is full, others shrink
        const scale = absDiff === 0 ? 1 : Math.max(0.7, 1 - absDiff * 0.12);
        // Opacity + blur: further = more faded
        const opacity = absDiff === 0 ? 1 : Math.max(0.15, 1 - absDiff * 0.35);
        const blur = absDiff === 0 ? 0 : Math.min(absDiff * 4, 12);
        // Z-index: active on top
        const zIndex = 10 - absDiff;

        return {
            position: 'absolute' as const,
            left: '50%',
            height: '100%',
            width: '340px',
            transform: `translateX(calc(-50% + ${offsetX}px)) scale(${scale})`,
            opacity,
            filter: `blur(${blur}px)`,
            zIndex,
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: absDiff === 0 ? 'default' : 'pointer',
        };
    };

    return (
        <section ref={popRef as React.RefObject<HTMLElement>} style={{ ...styles.section, ...popStyle }}>
            {/* Content: Lookbook slider + Fabric info */}
            <div style={styles.content}>
                {/* BÊN TRÁI: Look slider */}
                <div
                    style={styles.sliderArea}
                    onPointerDown={handleSliderDown}
                    onPointerUp={handleSliderUp}
                >
                    {/* Tên bộ sưu tập ở trên */}
                    <div style={styles.lookHeader}>
                        <Text style={styles.lookSeason}>BỘ SƯU TẬP 2026</Text>
                        <Text style={styles.lookSubtext}>
                            Các thiết kế nổi bật sử dụng chất liệu {currentData.fabricName}
                        </Text>
                    </div>

                    {/* Slider khu vực ảnh */}
                    <div style={styles.sliderTrack}>
                        {looks.map((look, index) => (
                            <div
                                key={look.id}
                                style={getLookStyle(index)}
                                onClick={() => index !== activeLook && setActiveLook(index)}
                            >
                                <Image
                                    src={look.image}
                                    alt={look.label}
                                    fill
                                    style={{ objectFit: 'cover', objectPosition: 'bottom' }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Look label ở dưới */}
                    <div style={styles.lookFooter}>
                        <Title level={3} style={styles.lookLabel}>
                            {looks[activeLook]?.label.toUpperCase()}
                        </Title>
                        <Text style={styles.lookShop}>khám phá</Text>
                    </div>
                </div>

                {/* BÊN PHẢI: Fabric info */}
                <div style={styles.rightSide}>
                    {/* Filter loại vải */}
                    <div style={styles.filterTabs}>
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.key}
                                style={{
                                    ...styles.tabItem,
                                    ...(activeKey === cat.key ? styles.tabItemActive : {}),
                                }}
                                onClick={() => handleCategoryClick(cat.key)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <div style={styles.fabricImageWrapper}>
                        <Image
                            src={currentData.fabricImage}
                            alt={currentData.fabricName}
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>

                    <div style={styles.fabricInfo}>
                        <div style={styles.fabricLabelRow}>
                            <div style={styles.fabricDot} />
                            <span style={styles.fabricLabelText}>CHẤT LIỆU</span>
                        </div>
                        <Title level={2} style={styles.fabricName}>
                            {currentData.fabricName}
                        </Title>
                        <Text style={styles.fabricDesc}>
                            {currentData.fabricDesc}
                        </Text>

                        {/* Thông số vải */}
                        <div style={styles.specsGrid}>
                            {currentData.specs.map((spec, i) => (
                                <div key={i} style={styles.specItem}>
                                    <Text style={styles.specLabel}>{spec.label}</Text>
                                    <Text style={styles.specValue}>{spec.value}</Text>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const styles = StyleSheet.create({
    section: {
        position: 'relative',
        width: 'calc(100% - 60px)',
        height: 'calc(100vh - 30px)',
        margin: '0 auto',
        overflow: 'hidden',
        borderRadius: '36px',
        backgroundColor: '#F4EFE7',
        display: 'flex',
        flexDirection: 'column',
    },
    // Tabs
    tabsContainer: {
        position: 'relative',
        width: '100%',
        padding: '20px 0',
        flexShrink: 0,
    },
    tabsScroller: {
        display: 'flex',
        gap: '10px',
        overflowX: 'auto',
        scrollBehavior: 'smooth',
        cursor: 'grab',
        padding: '8px 50px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        userSelect: 'none',
    },
    tabItem: {
        flexShrink: 0,
        padding: '8px 24px',
        borderRadius: '30px',
        border: '1.5px solid #ccc',
        backgroundColor: 'transparent',
        color: '#555',
        fontSize: '14px',
        fontWeight: 500,
        fontFamily: 'Open Sans, sans-serif',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        whiteSpace: 'nowrap',
        letterSpacing: '0.5px',
    },
    tabItemActive: {
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        borderColor: '#1a1a1a',
    },
    fadeLeft: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '60px',
        height: '100%',
        background: 'linear-gradient(to right, #F4EFE7, transparent)',
        zIndex: 2,
        pointerEvents: 'none',
    },
    fadeRight: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '60px',
        height: '100%',
        background: 'linear-gradient(to left, #F4EFE7, transparent)',
        zIndex: 2,
        pointerEvents: 'none',
    },
    // Content
    content: {
        flex: 1,
        display: 'flex',
        gap: '16px',
        padding: '0 30px 30px',
        minHeight: 0,
    },
    // Left: Look slider
    sliderArea: {
        flex: 1.8,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        userSelect: 'none',
        touchAction: 'pan-y',
        cursor: 'grab',
    },
    lookHeader: {
        textAlign: 'center',
        marginBottom: '10px',
        flexShrink: 0,
    },
    lookSeason: {
        fontSize: '18px',
        fontWeight: 300,
        fontFamily: 'Playfair Display, serif',
        fontStyle: 'italic',
        letterSpacing: '3px',
        color: '#666',
        display: 'block',
        marginBottom: '4px',
        paddingTop: '16px',
    },
    lookSubtext: {
        fontSize: '14px',
        color: '#999',
        fontFamily: 'Open Sans, sans-serif',
        display: 'block',
    },
    sliderTrack: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        minHeight: 0,
    },
    lookFooter: {
        textAlign: 'center',
        paddingTop: '4px',
        flexShrink: 0,
    },
    lookLabel: {
        fontSize: '28px',
        fontFamily: 'Playfair Display, serif',
        fontWeight: 100,
        color: '#1a1a1a',
        margin: '0 0 2px 0',
        letterSpacing: '4px',
    },
    lookShop: {
        fontSize: '12px',
        color: '#999',
        letterSpacing: '2px',
        fontFamily: 'Open Sans, sans-serif',
        cursor: 'pointer',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
    },
    // Right: Fabric
    rightSide: {
        flex: 0.8,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        minHeight: 0,
    },
    fabricImageWrapper: {
        position: 'relative',
        flex: 0.6,
        borderRadius: '24px',
        overflow: 'hidden',
        minHeight: 0,
    },
    fabricInfo: {
        padding: '4px 8px',
    },
    fabricLabelRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '10px',
    },
    fabricDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#C0976E',
    },
    fabricLabelText: {
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '2.5px',
        color: '#C0976E',
        fontFamily: 'Open Sans, sans-serif',
    },
    fabricName: {
        fontSize: '36px',
        fontWeight: 100,
        fontFamily: 'Playfair Display',
        color: '#1a1a1a',
        margin: '0 0 8px 0',
        lineHeight: 1.1,
    },
    fabricDesc: {
        fontSize: '13px',
        lineHeight: 1.7,
        color: '#777',
        fontFamily: 'Open Sans, sans-serif',
        display: 'block',
        marginBottom: '16px',
    },
    exploreBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        padding: '10px 24px',
        borderRadius: '30px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: 600,
        fontFamily: 'Open Sans, sans-serif',
        letterSpacing: '0.5px',
        transition: 'all 0.3s ease',
    },
    filterTabs: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        padding: '16px 8px',
    },
    exploreBtnText: {
        fontSize: '13px',
        fontWeight: 600,
        fontFamily: 'Open Sans, sans-serif',
    },
    specsGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginTop: '16px',
        borderTop: '1px solid #e0d6ca',
        paddingTop: '16px',
    },
    specItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
    },
    specLabel: {
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '1px',
        color: '#999',
        textTransform: 'uppercase',
        fontFamily: 'Open Sans, sans-serif',
    },
    specValue: {
        fontSize: '13px',
        fontWeight: 500,
        color: '#333',
        fontFamily: 'Open Sans, sans-serif',
    },
});