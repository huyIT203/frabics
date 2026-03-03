'use client';
import { useState } from 'react';


import { Typography, Grid, Button, Tooltip, Carousel } from 'antd';
import { StyleSheet } from '@/shared/utils/styles';
import Image from 'next/image';
import { EyeOutlined, ShoppingCartOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { MOCK_PRODUCTS, Product } from '../data/products';
import { useCartStore } from '@/store/useCartStore';
import { CarouselRef } from 'antd/es/carousel';
import { useRef } from 'react';

const { useBreakpoint } = Grid;

const ProductCard = ({ product }: { product: Product }) => {
    const addToCart = useCartStore((state) => state.addToCart);
    const screens = useBreakpoint();
    const isDesktop = screens.md; // md trở lên là desktop/tablet lớn

    const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
    const [isHovered, setIsHovered] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price) + '₫';
    };

    return (
        <div
            style={styles.productCard}
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
                        transform: (isHovered && isDesktop) ? 'scale(1.5)' : 'scale(1)',
                    }}
                />

                {/* Product Actions Overlay */}
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

                {/* Variant Thumbnails Overlay */}
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

            <div style={styles.info}>
                <Typography.Text style={{
                    ...styles.productName,
                    color: isHovered ? '#1677ff' : '#333'
                }}>
                    {product.name}
                </Typography.Text>
                <br />
                <Typography.Text strong style={styles.productPrice}>
                    {formatPrice(selectedVariant.price)}
                </Typography.Text>
            </div>
        </div>
    );
};

export const FeaturedProducts = () => {
    const carouselRef = useRef<CarouselRef>(null);

    return (
        <section style={styles.container}>
            {/* Tiêu đề phần Sản phẩm nổi bật */}
            <div style={styles.header}>
                <Typography.Title level={2} style={styles.mainTitle}>Sản Phẩm Nổi Bật</Typography.Title>
                <Typography.Text type="secondary" style={styles.subTitle}>
                    Khám phá những mẫu vải được yêu thích nhất
                </Typography.Text>
            </div>

            {/* Danh sách sản phẩm với Carousel và nút điều hướng */}
            <div style={styles.carouselWrapper}>
                <Button
                    icon={<ArrowLeftOutlined />}
                    style={styles.arrowLeft}
                    shape="circle"
                    onClick={() => carouselRef.current?.prev()}
                />

                <Carousel
                    ref={carouselRef}
                    slidesToShow={5}
                    slidesToScroll={1}
                    dots={false}
                    infinite={true}
                    responsive={[
                        { breakpoint: 1200, settings: { slidesToShow: 4 } },
                        { breakpoint: 992, settings: { slidesToShow: 3 } },
                        { breakpoint: 768, settings: { slidesToShow: 2 } },
                        { breakpoint: 480, settings: { slidesToShow: 1 } },
                    ]}
                >
                    {MOCK_PRODUCTS.map((product) => (
                        <div key={product.id}>
                            <div style={styles.productCol}>
                                <ProductCard product={product} />
                            </div>
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
        backgroundColor: '#ffffff',
        marginBottom: '60px',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    mainTitle: {
        fontSize: '42px',
        fontWeight: 100,
        letterSpacing: '1px',
        marginBottom: '15px ',
        lineHeight: '40px',
        fontFamily: 'Playfair Display',
        fontStyle: 'Bold',
    },
    subTitle: {
        fontSize: '15px',
        fontFamily: 'Lato, sans-serif',
        color: '#231F20',
        lineHeight: '20px',
        display: 'block',
    },
    carouselWrapper: {
        position: 'relative',
        padding: '0 50px',
    },
    productCol: {
        borderRight: '1px solid #e8e8e8',
        padding: '30px 20px',
        transition: 'all 0.3s ease',
    },
    productCard: {
        cursor: 'pointer',
    },
    imageWrapper: {
        position: 'relative',
        width: '100%',
        aspectRatio: '1 / 1',
        marginBottom: '16px',
        overflow: 'hidden',
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
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        padding: '2px',
        border: '1.5px solid transparent',
        transition: 'all 0.2s ease',
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
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        border: 'none',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        color: '#333',
        fontSize: '18px',
        transition: 'all 0.3s ease',
    },
    info: {
        textAlign: 'left',
    },
    productName: {
        fontSize: '13px',
        color: '#333',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    productPrice: {
        fontSize: '15px',
        color: '#000',
        marginTop: '4px',
        display: 'block',
        fontStyle: 'italic',
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