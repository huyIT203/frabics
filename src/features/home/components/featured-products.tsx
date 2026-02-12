'use client';
import { useState } from 'react';


import { Typography, Row, Col, Grid, Button, Tooltip } from 'antd';
import { StyleSheet } from '@/shared/utils/styles';
import Image from 'next/image';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { MOCK_PRODUCTS, Product } from '../data/products';
import { useCartStore } from '@/store/useCartStore';

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
    return (
        <section style={styles.container}>
            {/* Tiêu đề phần Sản phẩm nổi bật */}
            <div style={styles.header}>
                <Typography.Title level={2} style={styles.mainTitle}>SẢN PHẨM NỔI BẬT</Typography.Title>
                <Typography.Text type="secondary" style={styles.subTitle}>
                    Khám phá những mẫu vải được yêu thích nhất
                </Typography.Text>
            </div>

            {/* Danh sách sản phẩm với đường kẻ lưới */}
            <div style={styles.gridWrapper}>
                <Row gutter={0}>
                    {MOCK_PRODUCTS.map((product) => (
                        <Col
                            key={product.id}
                            xs={{ flex: '50%' }}
                            sm={{ flex: '33.33%' }}
                            md={{ flex: '25%' }}
                            lg={{ flex: '20%' }}
                            style={{
                                ...styles.productCol,
                            }}
                        >
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
            </div>
        </section>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: '60px 0',
        backgroundColor: '#ffffff',
    },
    header: {
        textAlign: 'center',
        marginBottom: '60px',
    },
    mainTitle: {
        fontSize: '24px',
        fontWeight: 600,
        letterSpacing: '1px',
        marginBottom: '8px ',
        textTransform: 'uppercase',
        lineHeight: '40px',
        fontFamily: 'Gotham Book, sans-serif',
        fontStyle: 'Bold',
    },
    subTitle: {
        fontSize: '17px',
        fontFamily: 'Gotham Book, sans-serif',
        color: '#231F20',
        lineHeight: '20px',
        display: 'block',
    },
    gridWrapper: {
        borderTop: '1px solid #e8e8e8',
        borderLeft: '1px solid #e8e8e8',
        width: '100%',
    },
    productCol: {
        borderRight: '1px solid #e8e8e8',
        borderBottom: '1px solid #e8e8e8',
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
    }
});