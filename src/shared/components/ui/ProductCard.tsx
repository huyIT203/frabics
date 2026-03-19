'use client';

import React, { useState } from 'react';
import { Typography, Button, Tooltip, Grid } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { StyleSheet } from '@/shared/utils/styles';
import Image from 'next/image';
import { Product } from '@/features/home/data/products';
import { useCartStore } from '@/store/useCartStore';

const { useBreakpoint } = Grid;
const { Text } = Typography;

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
};

export const ProductCard = ({ product }: { product: Product }) => {
    const addToCart = useCartStore((state) => state.addToCart);
    const screens = useBreakpoint();
    const isDesktop = screens.md;

    const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            style={{
                ...styles.cardContainer,
                background: isHovered ? 'linear-gradient(to bottom, #ffffff, #F4EFE7)' : 'transparent',
                zIndex: isHovered ? 2 : 1,
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
                <Text style={styles.productName}>{product.name}</Text>
                <div style={styles.priceRow}>
                    <Text strong style={styles.price}>
                        {formatPrice(selectedVariant.price)}
                    </Text>
                </div>
            </div>
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
        marginBottom: 0,
    },
});
