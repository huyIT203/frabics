'use client';

import React from 'react';
import { Carousel, Row, Col, Typography } from 'antd';
import { StyleSheet } from '@/shared/utils/styles';
import Image from 'next/image';
import { RoundedButton } from '@/shared/components/ui/RoundedButton';
import {
    CarOutlined,
    SyncOutlined,
    ShopOutlined,
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

// Mock Data cho Tin tức
const NEWS_DATA = [
    {
        id: 1,
        title: 'Checklist Chọn Vải Khi Mở Thương Hiệu Thời Trang',
        image: '/news/vai1.jpg',
        link: '/blog/checklist-chon-vai'
    },
    {
        id: 2,
        title: 'Mẹo Bảo Quản Vải Lụa Để Giữ Độ Óng Ánh Lâu Dài',
        image: '/news/vai2.jpg',
        link: '/blog/meo-bao-quan-lua'
    },
    {
        id: 3,
        title: 'Vải Thun – Lựa Chọn Số 1 Cho Local Brand Trẻ',
        image: '/news/vai3.jpg',
        link: '/blog/vai-thun-local-brand'
    },
    {
        id: 4,
        title: 'Xu Hướng Màu Sắc Thời Trang Xuân Hè 2026',
        image: '/news/vai1.jpg',
        link: '/blog/xu-huong-mau-sac'
    }
];

// Mock Data cho phần Cam kết (Icon bên dưới)
const POLICY_DATA = [
    {
        id: 1,
        icon: <CarOutlined />,
        title: 'Miễn phí vận chuyển',
        desc: 'Cho đơn hàng từ 5 triệu (bán kính 10km)'
    },
    {
        id: 2,
        icon: <SyncOutlined />,
        title: 'Hoàn trả dễ dàng',
        desc: 'Khi vải lỗi, sai màu, sai mẫu'
    },
    {
        id: 3,
        icon: <ShopOutlined />,
        title: 'Cung cấp vải sỉ/lẻ',
        desc: 'Lẻ từ 1m, sỉ tiết kiệm từ 10m'
    },
    {
        id: 4,
        icon: <ShopOutlined />,
        title: 'Cung cấp vải sỉ/lẻ',
        desc: 'Lẻ từ 1m, sỉ tiết kiệm từ 10m'
    },

];

// Nút điều hướng custom cho Carousel
const CarouselArrow = ({ type, onClick }: { type: 'prev' | 'next', onClick?: () => void }) => (
    <div
        onClick={onClick}
        style={{
            ...styles.arrow,
            [type === 'prev' ? 'left' : 'right']: '-60px',
        }}
    >
        {type === 'prev' ? <LeftOutlined /> : <RightOutlined />}
    </div>
);

const NewsCardItem = ({ item }: { item: typeof NEWS_DATA[0] }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div style={{ padding: '0 15px' }}> {/* Gutter cho slider */}
            <div
                style={styles.newsCard}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Hình ảnh tin tức */}
                <div style={styles.imageWrapper}>
                    <style>
                        {`
                        @keyframes rippleEffect {
                            0% { transform: scale(0); opacity: 0; }
                            50% { opacity: 0.5; }
                            100% { transform: scale(1); opacity: 0; }
                        }
                        `}
                    </style>
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        style={{
                            objectFit: 'cover',
                            transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                        }}
                    />
                    {/* Ripple Overlay - Ellipse shape covering whole image */}
                    {isHovered && (
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.4)',
                            opacity: 0,
                            borderRadius: '50%',
                            animation: 'rippleEffect 0.6s ease-out',
                            pointerEvents: 'none',
                            zIndex: 2
                        }} />
                    )}
                </div>

                {/* Tiêu đề tin tức */}
                <Title level={4} style={styles.newsTitle}>
                    {item.title}
                </Title>

                {/* Nút Xem chi tiết (Tái sử dụng Component) */}
                <RoundedButton
                    text="Xem chi tiết"
                    style={{
                        fontSize: '12px',
                        height: '40px',
                        padding: '0 24px',
                    }}
                />
            </div>
        </div>
    );
};

export const LatestNews = () => {
    return (
        <section style={styles.wrapper}>
            <div style={styles.container}>
                {/* --- PHẦN 1: TIN TỨC --- */}
                <div style={styles.header}>
                    <Title level={2} style={styles.sectionTitle}>Tin Tức Mới Nhất</Title>
                    <Text type="secondary" style={styles.sectionSubtitle}>
                        Cập nhật tin tức về ngành thời trang - may mặc
                    </Text>
                </div>

                <div style={styles.carouselWrapper}>
                    <Carousel
                        arrows
                        prevArrow={<CarouselArrow type="prev" />}
                        nextArrow={<CarouselArrow type="next" />}
                        dots={false}
                        slidesToShow={3}
                        slidesToScroll={1}
                        infinite={false} // Tắt chế độ chạy vô hạn
                        autoplay={false} // Tắt tự động chạy vì dữ liệu ít (chỉ 4 tin)
                        draggable={true}
                        swipeToSlide={true}
                        responsive={[
                            {
                                breakpoint: 1024,
                                settings: { slidesToShow: 2 }
                            },
                            {
                                breakpoint: 768,
                                settings: { slidesToShow: 1 }
                            }
                        ]}
                    >
                        {NEWS_DATA.map((item) => (
                            <NewsCardItem key={item.id} item={item} />
                        ))}
                    </Carousel>
                </div>

                {/* --- PHẦN 2: CAM KẾT / POLICY (Footer Features) --- */}
                <div style={styles.policySection}>
                    <Row gutter={[16, 32]} justify="space-between">
                        {POLICY_DATA.map((item) => (
                            <Col key={item.id} xs={12} md={6} style={{ textAlign: 'center' }}>
                                <div style={styles.iconWrapper}>{item.icon}</div>
                                <Text strong style={styles.policyTitle}>{item.title}</Text>
                                <Text type="secondary" style={styles.policyDesc}>{item.desc}</Text>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </section>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        backgroundColor: '#ffffff',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        paddingBottom: '40px',
        display: 'block',
    },
    header: {
        textAlign: 'center',
        marginBottom: '30px',
        marginTop: 0,
    },
    sectionTitle: {
        fontSize: '42px',
        fontWeight: 100,
        margin: '0 0 15px 0',
        fontFamily: 'Playfair Display',
    },
    sectionSubtitle: {
        fontSize: '15px',
        color: '#231F20',
        fontFamily: 'Lato, sans-serif',
        lineHeight: '1.5',
    },
    carouselWrapper: {
        position: 'relative',
        marginBottom: '40px',
        padding: '0 10px',
    },
    arrow: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '24px',
        color: '#000',
        cursor: 'pointer',
        zIndex: 10,
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: '50%',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: '#000',
            color: '#fff',
        }
    },
    newsCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#F5F5F5',
        paddingBottom: '30px',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        width: '370px',
        margin: '0 auto',
    },
    imageWrapper: {
        position: 'relative',
        width: '100%',
        height: '270px',
        marginBottom: '25px',
        overflow: 'hidden',
    },
    newsTitle: {
        fontSize: '15px',
        fontFamily: 'Lato, sans-serif',
        lineHeight: '24px',
        minHeight: '48px',
        marginBottom: '25px',
        padding: '0 25px',
        color: '#231F20',
        display: 'block',
        textAlign: 'center',
    },
    // Phần Policy
    policySection: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    iconWrapper: {
        fontSize: '32px',
        marginBottom: '10px',
        color: '#333',
    },
    policyTitle: {
        fontSize: '16px',
        lineHeight: '20px',
        fontWeight: 700,
        display: 'block',
        marginBottom: '4px',
    },
    policyDesc: {
        fontSize: '14px',
        display: 'block',
    }
});