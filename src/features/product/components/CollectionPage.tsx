'use client';

import { MOCK_PRODUCTS } from '@/features/home/data/products';
import { ProductListingLayout } from './ProductListingLayout';

export default function CollectionPage() {
    return (
        <ProductListingLayout
            title="Bộ Sưu Tập"
            description="Khám phá toàn bộ bộ sưu tập vải cao cấp của chúng tôi. Từ lụa, gấm, linen đến nhiều chất liệu đa dạng khác."
            breadcrumbLabel="Bộ sưu tập"
            products={MOCK_PRODUCTS}
        />
    );
}
