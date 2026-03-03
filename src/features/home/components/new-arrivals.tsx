'use client';

import React, { useRef, useState } from 'react';
import { Typography, Carousel, Button, Tooltip, Grid } from 'antd';
import { EyeOutlined, ShoppingCartOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { StyleSheet } from '@/shared/utils/styles';
import Image from 'next/image';
import { MOCK_PRODUCTS, Product } from '../data/products';
import { useCartStore } from '@/store/useCartStore';
import { CarouselRef } from 'antd/es/carousel';

const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

const NewArrivalCard = ({ product }: { product: Product }) => {
    const addToCart = useCartStore((state) => state.addToCart);
    const screens = useBreakpoint();
    const isDesktop = screens.md;

    const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
    const [isHovered, setIsHovered] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price) + '₫';
    };

    return (
        <div
            style={{
                ...styles.cardContainer,
                background: isHovered ? 'linear-gradient(to bottom, #ffffff, #F4EFE7)' : 'transparent',
                zIndex: isHovered ? 2 : 1,
                borderRadius: '15px',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={styles.imageWrapper}>
                <Image
                    src={selectedVariant.image}
                    alt={product.name}
                    fill
                    style={{
                        objectFit: 'cover',
                        transition: 'transform 2.2s cubic-bezier(0.2, 0, 0.2, 1)',
                        transform: (isHovered && isDesktop) ? 'scale(1.3)' : 'scale(1)',
                    }}
                />

                {/* Actions Overlay */}
                <div style={{
                    ...styles.actionOverlay,
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateX(0)' : 'translateX(10px)',
                }}>
                    <Tooltip title="Xem nhanh" placement="left">
                        <Button
                            shape="circle"
                            icon={<EyeOutlined />}
                            style={styles.actionButton}
                        />
                    </Tooltip>
                    <Tooltip title="Thêm vào giỏ" placement="left">
                        <Button
                            shape="circle"
                            icon={<ShoppingCartOutlined />}
                            style={styles.actionButton}
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart({
                                    id: selectedVariant.variantId,
                                    name: `${product.name} - ${selectedVariant.colorName}`,
                                    price: selectedVariant.price,
                                    quantity: 1,
                                    image: selectedVariant.image
                                });
                            }}
                        />
                    </Tooltip>
                </div>

                {/* Variant Thumbnails */}
                <div style={styles.variantList}>
                    {product.variants.map((v) => (
                        <div
                            key={v.variantId}
                            style={{
                                ...styles.variantCircle,
                                borderColor: selectedVariant.variantId === v.variantId ? '#000' : 'transparent'
                            }}
                            onMouseEnter={() => isDesktop && setSelectedVariant(v)}
                            onTouchStart={(e) => {
                                e.stopPropagation();
                                setSelectedVariant(v);
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (isDesktop) setSelectedVariant(v);
                            }}
                        >
                            <div style={{
                                ...styles.variantInner,
                                backgroundColor: v.colorCode.startsWith('#') ? v.colorCode : 'transparent',
                                backgroundImage: !v.colorCode.startsWith('#') ? `url(${v.colorCode})` : 'none',
                                backgroundSize: 'cover'
                            }} />
                        </div>
                    ))}
                </div>
            </div>
            <div style={styles.productInfo}>
                <Text style={{
                    ...styles.productName,
                    color: '#000000'
                }}>{product.name}</Text>
                <div style={styles.priceRow}>
                    <Text strong style={styles.price}>
                        {formatPrice(selectedVariant.price)}
                    </Text>
                </div>
            </div>
        </div>
    );
};

export const NewArrivals = () => {
    const carouselRef = useRef<CarouselRef>(null);

    return (
        <section style={styles.container}>
            <div style={styles.header}>
                <div style={styles.titleWrapper}>
                    <Title level={2} style={styles.title}>
                        Hàng Mới                    </Title>
                </div>
                <Text style={styles.subTitle}>
                    Thời trang luôn thay đổi&mdash;đó là lý do tại sao Thiện Oanh có hàng trăm sản phẩm mới mỗi tuần!
                </Text>
            </div>

            <div style={styles.carouselWrapper}>
                <Button
                    icon={<ArrowLeftOutlined />}
                    style={styles.arrowLeft}
                    shape="circle"
                    onClick={() => carouselRef.current?.prev()}
                />

                <Carousel
                    ref={carouselRef}
                    slidesToShow={4}
                    slidesToScroll={1}
                    dots={false}
                    infinite={true}
                    responsive={[
                        { breakpoint: 1200, settings: { slidesToShow: 3 } },
                        { breakpoint: 768, settings: { slidesToShow: 2 } },
                        { breakpoint: 480, settings: { slidesToShow: 1 } },
                    ]}
                >
                    {MOCK_PRODUCTS.map((product) => (
                        <div key={product.id}>
                            <NewArrivalCard product={product} />
                        </div>
                    ))}
                </Carousel>

                <Button
                    icon={<ArrowRightOutlined />}
                    style={styles.arrowRight}
                    shape="circle"
                    onClick={() => carouselRef.current?.next()}
                />
            </div>
        </section>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: '20px',
        backgroundColor: '#ffffff',
        maxWidth: '1652px',
        margin: '0 auto',
    },
    header: {
        marginBottom: '20px',
        paddingLeft: '20px',
    },
    titleWrapper: {
        marginBottom: '10px',
    },
    title: {
        fontSize: '42px',
        fontFamily: 'Playfair Display',
        fontWeight: 100,
        marginBottom: '15px',
        color: '#000000',
    },

    subTitle: {
        fontSize: '15px',
        color: '#000000',
        fontFamily: 'Gotham Book, sans-serif',
        marginBottom: '20px',
        marginTop: '5px',
    },
    carouselWrapper: {
        position: 'relative',
        padding: '0 50px',
    },
    cardContainer: {
        cursor: 'pointer',
        padding: '12px',
        borderRadius: '25px',
        transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
        position: 'relative',
    },
    imageWrapper: {
        position: 'relative',
        width: '100%',
        aspectRatio: '1 / 1',
        borderRadius: '15px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
    },
    variantList: {
        position: 'absolute',
        top: '10px',
        left: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        zIndex: 5,
    },
    variantCircle: {
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        padding: '2px',
        border: '1.5px solid transparent',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    variantInner: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        boxShadow: 'inset 0 0 2px rgba(0,0,0,0.1)',
    },
    actionOverlay: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        zIndex: 10,
        transition: 'all 0.4s cubic-bezier(0.2, 0, 0.2, 1)',
    },
    actionButton: {
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        border: 'none',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        color: '#333',
        fontSize: '16px',
        transition: 'all 0.3s ease',
    },
    playIcon: {
        position: 'absolute',
        right: '10px',
        bottom: '10px',
        zIndex: 2,
    },
    productInfo: {
        textAlign: 'center',
        paddingTop: '14px',
    },
    productName: {
        display: 'block',
        fontSize: '16px',
        color: '#000000',
        marginBottom: '14px',
        fontWeight: 400,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontFamily: 'Lato, sans-serif',
    },
    priceRow: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    price: {
        fontSize: '14px',
        fontWeight: 800,
        color: '#1a1a1a',
        fontFamily: 'Open Sans, sans-serif',
        fontStyle: 'italic',
        marginBottom: '25px',
    },
    arrowLeft: {
        position: 'absolute',
        left: '0px',
        top: '40%',
        zIndex: 10,
        width: '44px',
        height: '44px',
        backgroundColor: '#F4EFE7',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#1a1a1a',
        fontSize: '18px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    },
    arrowRight: {
        position: 'absolute',
        right: '0px',
        top: '40%',
        zIndex: 10,
        width: '44px',
        height: '44px',
        backgroundColor: '#F4EFE7',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#1a1a1a',
        fontSize: '18px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    }
});
