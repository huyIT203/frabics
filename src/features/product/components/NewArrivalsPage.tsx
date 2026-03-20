'use client';

import { MOCK_PRODUCTS } from '@/features/home/data/products';
import { ProductListingLayout } from './ProductListingLayout';

export default function NewArrivalsPage() {
    const newProducts = MOCK_PRODUCTS.filter(p => p.badge === 'new');

    return (
        <ProductListingLayout
            title="Hàng Mới"
            description="Khám phá những mẫu vải mới nhất vừa được cập nhật. Với hàng trăm sản phẩm mới mỗi tuần, hãy chọn cho mình những mẫu vải ưng ý nhất!"
            breadcrumbLabel="Hàng mới"
            products={newProducts}
        />
    );
}
