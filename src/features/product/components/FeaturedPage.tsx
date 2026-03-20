'use client';

import { MOCK_PRODUCTS } from '@/features/home/data/products';
import { ProductListingLayout } from './ProductListingLayout';

export default function FeaturedPage() {
    const bestSellerProducts = MOCK_PRODUCTS.filter(p => p.badge === 'best-seller');

    return (
        <ProductListingLayout
            title="Sản Phẩm Nổi Bật"
            description="Những mẫu vải được yêu thích và bán chạy nhất. Đã bán trên 100 mét, được khách hàng tin tưởng lựa chọn."
            breadcrumbLabel="Nổi bật"
            products={bestSellerProducts}
        />
    );
}
