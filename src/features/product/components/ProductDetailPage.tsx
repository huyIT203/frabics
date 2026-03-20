'use client';

import React, { useState, useMemo, useRef, useSyncExternalStore } from 'react';
import { useParams } from 'next/navigation';
import { Typography, Tabs, InputNumber, Input, Button, Grid, Breadcrumb, Carousel } from 'antd';
import { ShoppingCartOutlined, HomeOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { StyleSheet } from '@/shared/utils/styles';
import { MOCK_PRODUCTS, FEATURED_PRODUCTS_DATA } from '@/features/home/data/products';
import { Variant } from '@/features/home/data/products';
import { useCartStore } from '@/store/useCartStore';
import { CarouselArrowButton } from '@/shared/components/ui/CarouselArrowButton';
import { ProductCard } from '@/shared/components/ui/ProductCard';
import { CarouselRef } from 'antd/es/carousel';

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

const emptySubscribe = () => () => {};
const useIsClient = () => useSyncExternalStore(emptySubscribe, () => true, () => false);

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
};

export const ProductDetailPage = () => {
    const params = useParams();
    const slug = params?.slug as string;
    const screens = useBreakpoint();
    const isClient = useIsClient();

    const isMobile = isClient ? !screens.md : false;
    const addToCart = useCartStore((state) => state.addToCart);
    const relatedCarouselRef = useRef<CarouselRef>(null);

    // Find product by slug
    const allProducts = [...FEATURED_PRODUCTS_DATA, ...MOCK_PRODUCTS];
    const product = allProducts.find((p) => p.slug === slug);

    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
        product?.variants[0] || null
    );
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [meters, setMeters] = useState<number>(1);
    const [note, setNote] = useState('');

    // Gather all images from all variants
    const allImages = useMemo(() => {
        if (!product) return [];
        const images: { src: string; variantId: string; colorName: string }[] = [];
        product.variants.forEach((v) => {
            // Avoid duplicates
            if (!images.find((img) => img.src === v.image)) {
                images.push({ src: v.image, variantId: v.variantId, colorName: v.colorName });
            }
        });
        return images;
    }, [product]);

    if (!product || !selectedVariant) {
        return (
            <div style={{ padding: '100px 40px', textAlign: 'center' }}>
                <Title level={3}>Không tìm thấy sản phẩm</Title>
                <Link href="/">
                    <Button type="primary">Về trang chủ</Button>
                </Link>
            </div>
        );
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
            meters,
            note,
        });
    };

    const handleVariantClick = (v: Variant) => {
        setSelectedVariant(v);
        const imgIdx = allImages.findIndex((img) => img.src === v.image);
        if (imgIdx >= 0) setSelectedImageIndex(imgIdx);
    };

    const tabItems = [
        {
            key: 'description',
            label: 'Mô tả',
            children: (
                <div style={styles.tabContent}>
                    <Text style={styles.descriptionText}>
                        {product.description}
                    </Text>
                    <div style={{ marginTop: '20px' }}>
                        <Text strong style={{ fontSize: '15px' }}>Đặc điểm nổi bật:</Text>
                        <ul style={styles.featureList}>
                            <li>Chất liệu cao cấp, mềm mịn, thoáng mát</li>
                            <li>Phù hợp may áo dài, đầm dạ hội, váy cưới</li>
                            <li>Đa dạng màu sắc, dễ phối đồ</li>
                            <li>Độ bền cao, không phai màu sau nhiều lần giặt</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            key: 'specs',
            label: 'Thông số sản phẩm',
            children: (
                <div style={styles.tabContent}>
                    <div style={styles.specsContainer}>
                        <div style={styles.specRow}>
                            <Text strong style={styles.specLabel}>Loại vải</Text>
                            <Text style={styles.specValue}>{product.category}</Text>
                        </div>
                        <div style={styles.specRow}>
                            <Text strong style={styles.specLabel}>Chiều rộng</Text>
                            <Text style={styles.specValue}>1.5m (150cm)</Text>
                        </div>
                        <div style={styles.specRow}>
                            <Text strong style={styles.specLabel}>Màu sắc</Text>
                            <Text style={styles.specValue}>
                                {product.variants.map((v) => v.colorName).join(', ')}
                            </Text>
                        </div>
                        <div style={styles.specRow}>
                            <Text strong style={styles.specLabel}>Chất liệu</Text>
                            <Text style={styles.specValue}>
                                {product.category.includes('Gấm') ? 'Polyester pha tơ tằm' :
                                    product.category.includes('Linen') ? '100% Linen tự nhiên' :
                                        product.category.includes('Lụa') ? 'Lụa tổng hợp cao cấp' : 'Hỗn hợp'}
                            </Text>
                        </div>
                        <div style={styles.specRow}>
                            <Text strong style={styles.specLabel}>Xuất xứ</Text>
                            <Text style={styles.specValue}>Việt Nam</Text>
                        </div>
                        <div style={styles.specRow}>
                            <Text strong style={styles.specLabel}>Họa tiết</Text>
                            <Text style={styles.specValue}>
                                {product.name.includes('In') ? 'In hoa văn' : 'Trơn / Dệt hoa'}
                            </Text>
                        </div>
                        <div style={styles.specRow}>
                            <Text strong style={styles.specLabel}>Tình trạng</Text>
                            <Text style={{ ...styles.specValue, color: '#52c41a' }}>Còn hàng</Text>
                        </div>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div style={{
            ...styles.pageContainer,
            width: isMobile ? 'calc(100% - 20px)' : 'calc(100% - 60px)',
            padding: isMobile ? '20px 16px' : '30px 30px',
        }}>
            {/* Breadcrumb */}
            <Breadcrumb
                style={styles.breadcrumb}
                items={[
                    {
                        title: (
                            <Link href="/" style={{ color: '#888' }}>
                                <HomeOutlined style={{ marginRight: 4 }} />
                                Trang chủ
                            </Link>
                        ),
                    },
                    {
                        title: <Text style={{ color: '#333' }}>{product.name}</Text>,
                    },
                ]}
            />

            {/* Main Content */}
            <div style={{
                ...styles.mainContent,
                flexDirection: isMobile ? 'column' : 'row',
            }}>
                {/* LEFT Column: Gallery + Related Products */}
                <div style={{ width: isMobile ? '100%' : '55%' }}>
                    {/* Image Gallery */}
                    <div style={{
                        ...styles.gallerySection,
                        flexDirection: isMobile ? 'column-reverse' : 'row',
                    }}>
                        {/* Thumbnails */}
                        <div style={{
                            ...styles.thumbnailList,
                            flexDirection: isMobile ? 'row' : 'column',
                            width: isMobile ? '100%' : '80px',
                            overflowX: isMobile ? 'auto' : 'hidden',
                            marginTop: isMobile ? '12px' : '0',
                        }}>
                            {allImages.map((img, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        ...styles.thumbnail,
                                        borderColor: selectedImageIndex === idx ? '#B38728' : '#e0e0e0',
                                        opacity: selectedImageIndex === idx ? 1 : 0.6,
                                    }}
                                    onClick={() => {
                                        setSelectedImageIndex(idx);
                                        const variant = product.variants.find(v => v.image === img.src);
                                        if (variant) setSelectedVariant(variant);
                                    }}
                                >
                                    <Image
                                        src={img.src}
                                        alt={img.colorName}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div style={{
                            ...styles.mainImage,
                            height: isMobile ? '400px' : '560px',
                        }}>
                            <Image
                                src={allImages[selectedImageIndex]?.src || selectedVariant.image}
                                alt={product.name}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                    {/* Related Products Slider */}
                    <div style={{ marginTop: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <Text strong style={{ ...styles.relatedTitle, marginBottom: 0 }}>Sản phẩm liên quan</Text>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <CarouselArrowButton
                                    direction="left"
                                    onClick={() => relatedCarouselRef.current?.prev()}
                                    style={{ position: 'static', width: '36px', height: '36px', fontSize: '14px' }}
                                />
                                <CarouselArrowButton
                                    direction="right"
                                    onClick={() => relatedCarouselRef.current?.next()}
                                    style={{ position: 'static', width: '36px', height: '36px', fontSize: '14px' }}
                                />
                            </div>
                        </div>
                        <Carousel
                            ref={relatedCarouselRef}
                            slidesToShow={isMobile ? 2 : 3}
                            slidesToScroll={1}
                            dots={false}
                            infinite={true}
                            responsive={[
                                { breakpoint: 1200, settings: { slidesToShow: 2 } },
                                { breakpoint: 768, settings: { slidesToShow: 2 } },
                            ]}
                        >
                            {(() => {
                                const related = FEATURED_PRODUCTS_DATA.filter(p => p.category === product.category && p.id !== product.id);
                                const items = related.length > 0 ? related : FEATURED_PRODUCTS_DATA.filter(p => p.id !== product.id);
                                return items.map((p) => (
                                    <div key={p.id} style={{ padding: '0 6px' }}>
                                        <ProductCard product={p} />
                                    </div>
                                ));
                            })()}
                        </Carousel>
                    </div>
                </div>

                {/* RIGHT: Product Info */}
                <div style={{
                    ...styles.infoSection,
                    width: isMobile ? '100%' : '42%',
                    marginTop: isMobile ? '24px' : '0',
                }}>
                    {/* Category tag */}
                    <Text style={styles.categoryTag}>{product.category}</Text>

                    {/* Product name */}
                    <Title level={2} style={styles.productTitle}>{product.name}</Title>

                    {/* Price */}
                    <div style={styles.priceSection}>
                        <Text style={styles.price}>{formatPrice(selectedVariant.price)}</Text>
                        <Text style={styles.priceUnit}> / mét</Text>
                    </div>

                    {/* Tags */}
                    <div style={styles.tagRow}>
                        <span style={styles.tag}>{product.category}</span>
                        <span style={styles.tag}>{selectedVariant.colorName}</span>
                        <span style={styles.tag}>1.5m rộng</span>
                    </div>

                    {/* Divider */}
                    <div style={styles.divider} />

                    {/* Available Colors */}
                    <div style={styles.fieldSection}>
                        <Text strong style={styles.fieldLabel}>Màu có sẵn:</Text>
                        <div style={styles.colorRow}>
                            {product.variants.map((v) => (
                                <div
                                    key={v.variantId}
                                    onClick={() => handleVariantClick(v)}
                                    style={{
                                        ...styles.colorCircle,
                                        borderColor: selectedVariant.variantId === v.variantId ? '#B38728' : '#ddd',
                                        boxShadow: selectedVariant.variantId === v.variantId ? '0 0 0 2px #B38728' : 'none',
                                    }}
                                >
                                    <Image
                                        src={v.image}
                                        alt={v.colorName}
                                        fill
                                        style={{ objectFit: 'cover', borderRadius: '50%' }}
                                    />
                                </div>
                            ))}
                        </div>
                        <Text type="secondary" style={{ fontSize: '13px', marginTop: '4px' }}>
                            Đã chọn: <strong>{selectedVariant.colorName}</strong>
                        </Text>
                    </div>

                    {/* Note */}
                    <div style={styles.fieldSection}>
                        <Text strong style={styles.fieldLabel}>Ghi chú:</Text>
                        <Input.TextArea
                            placeholder="Nhập ghi chú (tùy chọn)..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            autoSize={{ minRows: 2, maxRows: 4 }}
                            style={{ borderRadius: '8px', fontSize: '14px' }}
                        />
                    </div>

                    {/* Total */}
                    <div style={styles.divider} />
                    <div style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Tổng cộng:</Text>
                        <Text strong style={styles.totalPrice}>{formatPrice(totalPrice)}</Text>
                    </div>

                    {/* Meters + Add to Cart Row */}
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'stretch' }}>
                        <InputNumber
                            min={0.5}
                            max={100}
                            step={0.5}
                            value={meters}
                            onChange={(val) => setMeters(val || 0.5)}
                            addonAfter="mét"
                            size="large"
                            style={{ width: '140px', height: '54px' }}
                        />
                        <Button
                            type="primary"
                            size="large"
                            icon={<ShoppingCartOutlined />}
                            style={{ ...styles.addToCartBtn, flex: 1 }}
                            onClick={handleAddToCart}
                        >
                            Thêm vào giỏ hàng
                        </Button>
                    </div>

                    <div style={styles.stockInfo}>
                        <Text style={{ color: '#52c41a', fontSize: '13px' }}>✓ Còn hàng</Text>
                    </div>

                    {/* Tabs Section - Folder style */}
                    <div style={{
                        ...styles.tabsSection,
                        marginTop: '30px',
                    }}>
                        <Tabs
                            defaultActiveKey="description"
                            items={tabItems}
                            size="large"
                            className="folder-tabs"
                            style={{ fontFamily: 'Gotham Book, sans-serif' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        width: '100%',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        minHeight: '100vh',
        marginTop: '70px',
    },
    breadcrumb: {
        marginBottom: '24px',
        fontFamily: 'Gotham Book, sans-serif',
        fontSize: '13px',
    },
    mainContent: {
        display: 'flex',
        gap: '40px',
    },
    /* ========== Gallery ========== */
    gallerySection: {
        display: 'flex',
        gap: '12px',
    },
    thumbnailList: {
        display: 'flex',
        gap: '8px',
        flexShrink: 0,
    },
    thumbnail: {
        position: 'relative',
        width: '70px',
        height: '85px',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        border: '2px solid #e0e0e0',
        flexShrink: 0,
        transition: 'all 0.2s ease',
    },
    mainImage: {
        position: 'relative',
        flex: 1,
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#f9f6f1',
    },
    /* ========== Info ========== */
    infoSection: {
        display: 'flex',
        flexDirection: 'column',
    },
    categoryTag: {
        fontSize: '12px',
        color: 'rgba(139, 115, 85, 0.65)',
        fontFamily: 'Gotham Book, sans-serif',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
    },
    productTitle: {
        fontFamily: 'Playfair Display, serif',
        fontWeight: 500,
        color: '#1a1a1a',
    },
    priceSection: {
        display: 'flex',
        alignItems: 'baseline',
        marginBottom: '10px',
    },
    price: {
        fontSize: '26px',
        fontWeight: 700,
        color: '#1a1a1a',
        fontFamily: 'Gotham Book, sans-serif',
    },
    priceUnit: {
        fontSize: '15px',
        color: '#888',
        fontFamily: 'Gotham Book, sans-serif',
    },
    tagRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '20px',
    },
    tag: {
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: '4px',
        border: '1px solid #e0e0e0',
        fontSize: '12px',
        color: '#555',
        fontFamily: 'Gotham Book, sans-serif',
        backgroundColor: '#fafafa',
    },
    divider: {
        height: '1px',
        backgroundColor: '#f0f0f0',
        margin: '8px 0',
    },
    fieldSection: {
        marginBottom: '20px',
    },
    fieldLabel: {
        display: 'block',
        fontSize: '14px',
        color: '#333',
        marginBottom: '10px',
        fontFamily: 'Gotham Book, sans-serif',
    },
    colorRow: {
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
    },
    colorCircle: {
        position: 'relative',
        width: '42px',
        height: '42px',
        borderRadius: '50%',
        overflow: 'hidden',
        cursor: 'pointer',
        border: '2px solid #ddd',
        transition: 'all 0.2s ease',
    },
    totalRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    },
    totalLabel: {
        fontSize: '16px',
        color: '#555',
        fontFamily: 'Gotham Book, sans-serif',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    totalPrice: {
        fontSize: '24px',
        color: '#B38728',
        fontFamily: 'Gotham Book, sans-serif',
        fontWeight: 800,
    },
    addToCartBtn: {
        height: '54px',
        borderRadius: '8px',
        backgroundColor: '#1a1a1a',
        borderColor: '#1a1a1a',
        fontSize: '15px',
        fontWeight: 600,
        letterSpacing: '2px',
        fontFamily: 'Gotham Book, sans-serif',
        textTransform: 'uppercase',
    },
    stockInfo: {
        marginTop: '14px',
        textAlign: 'center',
    },
    /* ========== Tabs ========== */
    tabsSection: {
        paddingTop: '0',
    },
    tabContent: {
        padding: '24px',
        fontFamily: 'Gotham Book, sans-serif',
        backgroundColor: '#faf8f5',
        borderRadius: '0 0 10px 10px',
        borderLeft: '1px solid #ece6dd',
        borderRight: '1px solid #ece6dd',
        borderBottom: '1px solid #ece6dd',
    },
    descriptionText: {
        fontSize: '15px',
        lineHeight: '1.8',
        color: '#444',
        fontFamily: 'Gotham Book, sans-serif',
    },
    featureList: {
        paddingLeft: '20px',
        marginTop: '10px',
        lineHeight: '2',
        color: '#555',
        fontFamily: 'Gotham Book, sans-serif',
        fontSize: '14px',
    },
    specsContainer: {
        backgroundColor: '#faf8f5',
        borderRadius: '8px',
        padding: '20px 24px',
    },
    specRow: {
        display: 'flex',
        padding: '10px 0',
        borderBottom: '1px solid #f0ece6',
    },
    specLabel: {
        width: '160px',
        fontSize: '14px',
        color: '#333',
        fontFamily: 'Gotham Book, sans-serif',
        flexShrink: 0,
    },
    specValue: {
        fontSize: '14px',
        color: '#666',
        fontFamily: 'Gotham Book, sans-serif',
    },
    /* ========== Related Products ========== */
    relatedTitle: {
        display: 'block',
        fontSize: '18px',
        fontFamily: 'Playfair Display',
        marginBottom: '16px',
    },
    relatedCarouselWrapper: {
        position: 'relative',
        padding: '0 40px',
    },
});
