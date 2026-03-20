'use client';

import React, { useState, useMemo, useSyncExternalStore } from 'react';
import { Typography, Breadcrumb, Select, Collapse, Checkbox, Slider, Grid } from 'antd';
import { HomeOutlined, FilterOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { StyleSheet } from '@/shared/utils/styles';
import { Product } from '@/features/home/data/products';
import { ProductCard } from '@/shared/components/ui/ProductCard';

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

const emptySubscribe = () => () => { };
const useIsClient = () => useSyncExternalStore(emptySubscribe, () => true, () => false);

// Filter options
const CATEGORIES = ['Vải Gấm', 'Vải Linen', 'Vải Lụa', 'Vải Cotton', 'Vải Tơ'];
const SORT_OPTIONS = [
    { value: 'newest', label: 'Mới nhất' },
    { value: 'price-asc', label: 'Giá: Thấp đến Cao' },
    { value: 'price-desc', label: 'Giá: Cao đến Thấp' },
    { value: 'best-selling', label: 'Bán chạy nhất' },
];

interface ProductListingLayoutProps {
    title: string;
    description: string;
    breadcrumbLabel: string;
    products: Product[];
}

export const ProductListingLayout = ({
    title,
    description,
    breadcrumbLabel,
    products,
}: ProductListingLayoutProps) => {
    const screens = useBreakpoint();
    const isClient = useIsClient();
    const isMobile = isClient ? !screens.md : false;

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
    const [sortBy, setSortBy] = useState('newest');
    const [showMobileFilter, setShowMobileFilter] = useState(false);

    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        // Filter by category
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(p => selectedCategories.includes(p.category));
        }

        // Filter by price range
        filtered = filtered.filter(p => {
            const minPrice = Math.min(...p.variants.map(v => v.price));
            return minPrice >= priceRange[0] && minPrice <= priceRange[1];
        });

        // Sort
        switch (sortBy) {
            case 'price-asc':
                filtered.sort((a, b) => a.variants[0].price - b.variants[0].price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.variants[0].price - a.variants[0].price);
                break;
            case 'best-selling':
                filtered.sort((a, b) => b.soldMeters - a.soldMeters);
                break;
            case 'newest':
            default:
                filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
        }

        return filtered;
    }, [products, selectedCategories, priceRange, sortBy]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price) + '₫';
    };

    const filterContent = (
        <div style={styles.filterPanel}>
            <Collapse
                ghost
                expandIconPlacement="end"
                defaultActiveKey={['category', 'price']}
                items={[
                    {
                        key: 'category',
                        label: <Text strong style={styles.filterTitle}>Loại vải</Text>,
                        children: (
                            <div style={styles.filterOptions}>
                                {CATEGORIES.map(cat => (
                                    <Checkbox
                                        key={cat}
                                        checked={selectedCategories.includes(cat)}
                                        onChange={() => handleCategoryChange(cat)}
                                        style={styles.checkboxItem}
                                    >
                                        {cat}
                                    </Checkbox>
                                ))}
                            </div>
                        ),
                    },
                    {
                        key: 'price',
                        label: <Text strong style={styles.filterTitle}>Khoảng giá</Text>,
                        children: (
                            <div style={styles.priceFilter}>
                                <Slider
                                    range
                                    min={0}
                                    max={200000}
                                    step={5000}
                                    value={priceRange}
                                    onChange={(val) => setPriceRange(val as [number, number])}
                                    styles={{
                                        track: { backgroundColor: '#B38728' },
                                        handle: { borderColor: '#B38728' },
                                    }}
                                />
                                <div style={styles.priceLabels}>
                                    <Text style={styles.priceLabel}>{formatPrice(priceRange[0])}</Text>
                                    <Text style={styles.priceLabel}>{formatPrice(priceRange[1])}</Text>
                                </div>
                            </div>
                        ),
                    },
                ]}
            />
        </div>
    );

    return (
        <div style={{
            ...styles.pageContainer,
            padding: isMobile ? '0 16px' : '0 30px',
            marginTop: isMobile ? '90px' : '120px',
        }}>
            {/* Breadcrumb */}
            <Breadcrumb
                style={styles.breadcrumb}
                items={[
                    {
                        title: (
                            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <HomeOutlined /> Trang chủ
                            </Link>
                        ),
                    },
                    { title: 'Sản phẩm' },
                    { title: breadcrumbLabel },
                ]}
            />

            {/* Page Header */}
            <div style={styles.pageHeader}>
                <Title level={2} style={styles.pageTitle}>{title}</Title>
                <Text style={styles.pageDescription}>{description}</Text>
            </div>

            {/* Divider */}
            <div style={styles.headerDivider} />

            {/* Mobile Filter Toggle */}
            {isMobile && (
                <div
                    style={styles.mobileFilterToggle}
                    onClick={() => setShowMobileFilter(!showMobileFilter)}
                >
                    <FilterOutlined />
                    <Text strong style={{ fontSize: '13px', letterSpacing: '1px' }}>BỘ LỌC</Text>
                </div>
            )}

            {/* Main Content */}
            <div style={{
                ...styles.mainContent,
                flexDirection: isMobile ? 'column' : 'row',
            }}>
                {/* Sidebar Filters */}
                {(!isMobile || showMobileFilter) && (
                    <div style={{
                        ...styles.sidebar,
                        width: isMobile ? '100%' : '240px',
                        marginBottom: isMobile ? '24px' : '0',
                    }}>
                        <div style={styles.filterHeader}>
                            <Text strong style={styles.filterHeaderText}>BỘ LỌC</Text>
                        </div>
                        {filterContent}
                    </div>
                )}

                {/* Products Area */}
                <div style={{
                    ...styles.productsArea,
                    flex: 1,
                    paddingLeft: isMobile ? '0' : '40px',
                }}>
                    {/* Toolbar */}
                    <div style={styles.toolbar}>
                        <Text style={styles.resultCount}>
                            {filteredProducts.length} sản phẩm
                        </Text>
                        <div style={styles.sortWrapper}>
                            <Text style={styles.sortLabel}>Sắp xếp:</Text>
                            <Select
                                value={sortBy}
                                onChange={setSortBy}
                                options={SORT_OPTIONS}
                                style={{ width: 180 }}
                                variant="borderless"
                            />
                        </div>
                    </div>

                    {/* Product Grid */}
                    {filteredProducts.length > 0 ? (
                        <div style={{
                            ...styles.productGrid,
                            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
                            gap: isMobile ? '12px' : '20px',
                        }}>
                            {filteredProducts.map((product) => (
                                <div key={product.id}>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={styles.emptyState}>
                            <Text style={styles.emptyText}>Không tìm thấy sản phẩm nào phù hợp với bộ lọc.</Text>
                        </div>
                    )}
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
        paddingBottom: '60px',
    },
    breadcrumb: {
        marginBottom: '24px',
        fontFamily: 'Gotham Book, sans-serif',
        fontSize: '13px',
    },
    pageHeader: {
        marginBottom: '24px',
    },
    pageTitle: {
        fontFamily: 'Playfair Display',
        fontWeight: 100,
        color: '#000000ff',
        marginBottom: '8px !important',
        fontSize: '32px',
    },
    pageDescription: {
        fontSize: '14px',
        color: '#666',
        fontFamily: 'Gotham Book, sans-serif',
        lineHeight: '1.6',
    },
    headerDivider: {
        height: '1px',
        backgroundColor: '#e8e8e8',
        marginBottom: '30px',
    },
    mobileFilterToggle: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 0',
        cursor: 'pointer',
        borderBottom: '1px solid #e8e8e8',
        marginBottom: '20px',
    },
    mainContent: {
        display: 'flex',
        gap: '0',
    },
    sidebar: {
        flexShrink: 0,
        borderRight: '1px solid #f0f0f0',
        paddingRight: '24px',
    },
    filterHeader: {
        paddingBottom: '16px',
        borderBottom: '1px solid #e8e8e8',
        marginBottom: '8px',
    },
    filterHeaderText: {
        fontSize: '14px',
        letterSpacing: '2px',
        fontFamily: 'Playfair Display',
        textTransform: 'uppercase',
    },
    filterPanel: {},
    filterTitle: {
        fontSize: '13px',
        fontFamily: 'Playfair Display',
        letterSpacing: '0.5px',
        color: '#000000ff',
    },
    filterOptions: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    checkboxItem: {
        fontFamily: 'Gotham Book, sans-serif',
        fontSize: '13px',
        color: '#555',
    },
    priceFilter: {
        padding: '0 4px',
    },
    priceLabels: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    priceLabel: {
        fontSize: '12px',
        color: '#888',
        fontFamily: 'Gotham Book, sans-serif',
    },
    productsArea: {},
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '1px solid #f0f0f0',
    },
    resultCount: {
        fontSize: '13px',
        color: '#888',
        fontFamily: 'Gotham Book, sans-serif',
    },
    sortWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
    sortLabel: {
        fontSize: '13px',
        color: '#666',
        fontFamily: 'Gotham Book, sans-serif',
    },
    productGrid: {
        display: 'grid',
    },
    emptyState: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '300px',
    },
    emptyText: {
        fontSize: '15px',
        color: '#999',
        fontFamily: 'Gotham Book, sans-serif',
    },
});
