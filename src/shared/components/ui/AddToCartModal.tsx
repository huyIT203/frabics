'use client';

import React, { useState } from 'react';
import { Modal, Typography, InputNumber, Button, Grid, Input } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { StyleSheet } from '@/shared/utils/styles';
import Image from 'next/image';
import { Product, Variant } from '@/features/home/data/products';
import { useCartStore } from '@/store/useCartStore';

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
};

interface AddToCartModalProps {
    product: Product;
    open: boolean;
    onClose: () => void;
}

export const AddToCartModal = ({ product, open, onClose }: AddToCartModalProps) => {
    const addToCart = useCartStore((state) => state.addToCart);
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const [selectedVariant, setSelectedVariant] = useState<Variant>(product.variants[0]);
    const [meters, setMeters] = useState<number>(1);
    const [note, setNote] = useState<string>('');
    const [prevOpen, setPrevOpen] = useState(open);

    // Reset state when modal opens (without useEffect)
    if (open && !prevOpen) {
        setSelectedVariant(product.variants[0]);
        setMeters(1);
        setNote('');
    }
    if (open !== prevOpen) {
        setPrevOpen(open);
    }

    const totalPrice = selectedVariant.price * meters;

    const handleAddToCart = () => {
        addToCart({
            id: `${selectedVariant.variantId}-${meters}m`,
            name: product.name,
            price: totalPrice,
            quantity: 1,
            image: selectedVariant.image,
            colorName: selectedVariant.colorName,
            colorCode: selectedVariant.colorCode,
            meters: meters,
            note: note,
        });
        onClose();
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            centered
            width={isMobile ? '95%' : 480}
            styles={{
                body: { padding: '0' },
            }}
            closable
        >
            <div onDoubleClick={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
            {/* Product Header */}
            <div style={styles.header}>
                <div style={styles.headerImage}>
                    <Image
                        src={selectedVariant.image}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div style={styles.headerInfo}>
                    <Title level={5} style={styles.productName}>{product.name}</Title>
                    <Text style={styles.variantName}>{selectedVariant.colorName}</Text>
                    <Text strong style={styles.unitPrice}>{formatPrice(selectedVariant.price)}/m</Text>
                </div>
            </div>

            {/* Body */}
            <div style={styles.body}>
                {/* Color Selection */}
                <div style={styles.section}>
                    <Text strong style={styles.sectionLabel}>Chọn màu</Text>
                    <div style={styles.colorGrid}>
                        {product.variants.map((v) => {
                            const isSelected = selectedVariant.variantId === v.variantId;
                            return (
                                <div
                                    key={v.variantId}
                                    style={{
                                        ...styles.colorOption,
                                        borderColor: isSelected ? '#B38728' : '#e8e8e8',
                                        boxShadow: isSelected ? '0 0 0 1px #B38728' : 'none',
                                    }}
                                    onClick={() => setSelectedVariant(v)}
                                >
                                    <div style={styles.colorThumb}>
                                        <Image
                                            src={v.image}
                                            alt={v.colorName}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <Text style={{
                                        ...styles.colorLabel,
                                        color: isSelected ? '#B38728' : '#666',
                                        fontWeight: isSelected ? 600 : 400,
                                    }}>
                                        {v.colorName}
                                    </Text>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Meters Selection */}
                <div style={styles.section}>
                    <Text strong style={styles.sectionLabel}>Số mét vải</Text>
                    <div style={styles.metersRow}>
                        <InputNumber
                            min={0.5}
                            max={100}
                            step={0.5}
                            value={meters}
                            onChange={(val) => setMeters(val || 0.5)}
                            style={styles.metersInput}
                            addonAfter="mét"
                            size="large"
                        />
                    </div>
                </div>

                {/* Note */}
                <div style={styles.section}>
                    <Text strong style={styles.sectionLabel}>Ghi chú</Text>
                    <Input.TextArea
                        placeholder="Nhập ghi chú (tùy chọn)..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        autoSize={{ minRows: 2, maxRows: 4 }}
                        style={{ borderRadius: '8px', fontFamily: 'Gotham Book, sans-serif', fontSize: '14px' }}
                    />
                </div>

                {/* Total Price */}
                <div style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Tổng cộng</Text>
                    <Text strong style={styles.totalPrice}>{formatPrice(totalPrice)}</Text>
                </div>

                {/* Add to Cart Button */}
                <Button
                    type="primary"
                    block
                    size="large"
                    icon={<ShoppingCartOutlined />}
                    style={styles.addButton}
                    onClick={handleAddToCart}
                >
                    Thêm vào giỏ hàng
                </Button>
            </div>
            </div>
        </Modal>
    );
};

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        gap: '16px',
        padding: '24px 24px 16px',
        borderBottom: '1px solid #f0f0f0',
    },
    headerImage: {
        position: 'relative',
        width: '90px',
        height: '90px',
        borderRadius: '12px',
        overflow: 'hidden',
        flexShrink: 0,
    },
    headerInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '2px',
    },
    productName: {
        margin: '0 !important',
        fontFamily: 'Gotham Book, sans-serif',
        fontSize: '18px',
        fontWeight: 600,
        color: '#1a1a1a',
    },
    variantName: {
        fontSize: '13px',
        color: '#888',
        fontFamily: 'Gotham Book, sans-serif',
    },
    unitPrice: {
        fontSize: '15px',
        color: '#B38728',
        fontFamily: 'Gotham Book, sans-serif',
    },
    body: {
        padding: '20px 24px 24px',
    },
    section: {
        marginBottom: '24px',
    },
    sectionLabel: {
        display: 'block',
        fontSize: '14px',
        color: '#333',
        marginBottom: '12px',
        fontFamily: 'Gotham Book, sans-serif',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
    },
    colorGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
    },
    colorOption: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        padding: '8px',
        borderRadius: '12px',
        border: '2px solid #e8e8e8',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        minWidth: '72px',
    },
    colorThumb: {
        position: 'relative',
        width: '48px',
        height: '48px',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    colorLabel: {
        fontSize: '11px',
        fontFamily: 'Gotham Book, sans-serif',
        textAlign: 'center',
    },
    metersRow: {
        display: 'flex',
        alignItems: 'center',
    },
    metersInput: {
        width: '100%',
        borderRadius: '8px',
    },
    totalRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 0',
        borderTop: '1px solid #f0f0f0',
        marginBottom: '16px',
    },
    totalLabel: {
        fontSize: '15px',
        color: '#555',
        fontFamily: 'Gotham Book, sans-serif',
        letterSpacing: '1px',
        textTransform: 'uppercase',
    },
    totalPrice: {
        fontSize: '22px',
        color: '#B38728',
        fontFamily: 'Gotham Book, sans-serif',
        fontWeight: 800,
    },
    addButton: {
        height: '50px',
        borderRadius: '12px',
        backgroundColor: '#1a1a1a',
        borderColor: '#1a1a1a',
        fontSize: '15px',
        fontWeight: 600,
        letterSpacing: '1px',
        fontFamily: 'Gotham Book, sans-serif',
    },
});
