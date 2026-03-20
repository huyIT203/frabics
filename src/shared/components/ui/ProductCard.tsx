'use client';

import React, { useState } from 'react';
import { Typography, Button, Tooltip, Grid } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { StyleSheet } from '@/shared/utils/styles';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product } from '@/features/home/data/products';
import { AddToCartModal } from './AddToCartModal';

const { useBreakpoint } = Grid;
const { Text } = Typography;

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
};

export const ProductCard = ({ product }: { product: Product }) => {
    const screens = useBreakpoint();
    const isDesktop = screens.md;
    const router = useRouter();

    const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
    const [isHovered, setIsHovered] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const goToDetail = () => router.push(`/san-pham/${product.slug}`);

    return (
        <div
            style={{
                ...styles.cardContainer,
                background: isHovered ? 'linear-gradient(to bottom, #ffffff, #F4EFE7)' : 'transparent',
                zIndex: isHovered ? 2 : 1,
                cursor: 'default',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onDoubleClick={goToDetail}
        >
            <div style={styles.imageWrapper}>
                {/* Badge */}
                {product.badge && (
                    <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        zIndex: 3,
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.5px',
                        fontFamily: 'Gotham Book, sans-serif',
                        backgroundColor: product.badge === 'new' ? '#1a2744' : '#B38728',
                        color: '#ffffff',
                        textTransform: 'uppercase',
                    }}>
                        {product.badge === 'new' ? 'Mới' : 'Bán nhiều'}
                    </div>
                )}
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
                    <Tooltip title="Xem chi tiết" placement="left">
                        <Button
                            shape="circle"
                            icon={<EyeOutlined />}
                            style={styles.actionButton}
                            onClick={(e) => {
                                e.stopPropagation();
                                goToDetail();
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="Thêm vào giỏ" placement="left">
                        <Button
                            shape="circle"
                            icon={<ShoppingCartOutlined />}
                            style={styles.actionButton}
                            onClick={(e) => {
                                e.stopPropagation();
                                setModalOpen(true);
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
                <Text style={styles.category}>{product.category}</Text>
                <Text style={styles.productName}>{product.name}</Text>
                <div style={styles.priceRow}>
                    <Text strong style={styles.price}>
                        {formatPrice(selectedVariant.price)}/m
                    </Text>
                </div>
            </div>

            <AddToCartModal
                product={product}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        cursor: 'pointer',
        padding: '12px',
        borderRadius: '15px',
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
        top: '40px',
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
    productInfo: {
        textAlign: 'center',
        paddingTop: '14px',
    },
    category: {
        display: 'block',
        fontSize: '12px',
        color: 'rgba(139, 115, 85, 0.65)',
        fontFamily: 'Gotham Book, sans-serif',
        letterSpacing: '0.5px',
        marginBottom: '4px',
        textAlign: 'left',
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
        marginBottom: 0,
    },
});
