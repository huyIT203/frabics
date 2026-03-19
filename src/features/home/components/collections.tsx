'use client';

import React from 'react';
import { Row, Col, Typography, Carousel, Grid } from 'antd';
import { useSyncExternalStore } from 'react';
import { StyleSheet } from '@/shared/utils/styles';
import Image from 'next/image';
import Link from 'next/link';
import { RightOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const BANNER_ITEMS = {
    gam: {
        title: 'Vải gấm hoa mai',
        subTitle: 'Xem thêm BST Vải gấm',
        image: '/collections/vai1.png',
        link: '/products?category=gam',
    },
    voan: {
        title: 'Voan lá hồ điệp',
        subTitle: 'Xem thêm BST Vải tơ/voan',
        image: '/collections/vai2.jpg',
        link: '/products?category=to-voan',
    },
    linen: {
        title: 'Vải linen gân',
        subTitle: 'Xem thêm BST Vải linen',
        image: '/collections/vai3.jpg',
        link: '/products?category=linen',
    },
    lua: {
        title: 'Vải lụa Quảng Châu',
        subTitle: 'Xem thêm BST Vải lụa',
        image: '/collections/vai4.jpg',
        link: '/products?category=lua',
    },
    thun: {
        title: 'Vải thun len ấm áp',
        subTitle: 'Xem thêm BST Vải thun',
        image: '/collections/vai5.jpg',
        link: '/products?category=thun',
    }
};

interface collections {
    title: string;
    subTitle: string;
    image: string;
    link: string;
}

const BannerCard = ({ item, height, priority = false }: { item: collections, height: number | string, priority?: boolean }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <Link
            href={item.link}
            style={{ ...styles.bannerCard, height }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Image
                src={item.image}
                alt={item.title}
                fill
                style={{
                    objectFit: 'cover',
                    transition: 'transform 0.8s cubic-bezier(0.2, 0, 0.2, 1)',
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                }}
                priority={priority}
            />
            <div style={{
                ...styles.overlay,
                backgroundColor: isHovered ? 'rgba(0,0,0,0.2)' : 'transparent',
            }} />
            <div style={styles.content}>
                <Title level={3} style={styles.title}>
                    {item.title}
                </Title>
                <div style={styles.subTitleWrapper}>
                    <Text style={styles.subTitle}>{item.subTitle}</Text>
                    <RightOutlined style={styles.icon} />
                </div>
            </div>
        </Link>
    );
};

const { useBreakpoint } = Grid;

export const Homecollections = () => {
    const screens = useBreakpoint();
    const mounted = useSyncExternalStore(
        () => () => { },
        () => true,
        () => false
    );

    const isMobile = mounted ? !screens.md : false;

    if (isMobile) {
        return (
            <section style={styles.bannerSection}>
                <Carousel
                    autoplay
                    infinite
                    draggable
                    dots={{ className: 'custom-dots' }}
                    autoplaySpeed={4000}
                >
                    {Object.values(BANNER_ITEMS).map((item, index) => (
                        <div key={index}>
                            <BannerCard item={item} height={500} />
                        </div>
                    ))}
                </Carousel>
            </section>
        );
    }

    return (
        <section style={styles.bannerSection}>
            <Row gutter={[12, 12]}>
                {/* Cột trái & giữa: Chứa 4 ô (2x2) */}
                <Col xs={24} md={16}>
                    <Row gutter={[12, 12]}>
                        <Col span={12}>
                            <BannerCard item={BANNER_ITEMS.gam} height={400} priority />
                        </Col>
                        <Col span={12}>
                            <BannerCard item={BANNER_ITEMS.voan} height={400} priority />
                        </Col>
                        <Col span={12}>
                            <BannerCard item={BANNER_ITEMS.linen} height={400} />
                        </Col>
                        <Col span={12}>
                            <BannerCard item={BANNER_ITEMS.lua} height={400} />
                        </Col>
                    </Row>
                </Col>

                {/* Cột phải: 1 ô cao bằng 2 ô bên trái cộng lại + gap */}
                <Col xs={24} md={8}>
                    <BannerCard item={BANNER_ITEMS.thun} height={812} />
                </Col>
            </Row>
        </section>
    );
};

const styles = StyleSheet.create({
    bannerSection: {
        width: '100%',
        margin: '0 auto',
        padding: '20px 30px',
        background: 'linear-gradient(to right, #87693e9f 66.7%, #F4EFE7 66.6%)',
    },
    bannerCard: {
        position: 'relative',
        display: 'block',
        width: '100%',
        overflow: 'hidden',
        cursor: 'pointer',
        borderRadius: '15px',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        transition: 'background 0.3s ease',
    },
    content: {
        position: 'absolute',
        bottom: '30px',
        left: '30px',
        zIndex: 2,
    },
    title: {
        color: '#FFFFFF',
        marginBottom: '8px',
        fontWeight: 500,
        fontSize: '30px',
        fontFamily: 'Gotham Book, sans-serif',
        letterSpacing: '0.5px',
        textAlign: 'left',
    },
    subTitleWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        opacity: 0.9,
    },
    subTitle: {
        color: '#FFFFFF',
        fontSize: '14px',
        fontWeight: 300,
        fontFamily: 'Gotham Book, sans-serif',
        letterSpacing: '0.5px',
        textAlign: 'left',
    },
    icon: {
        color: '#FFFFFF',
        fontSize: '10px',
    }
});