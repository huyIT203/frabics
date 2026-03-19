export interface Variant {
    variantId: string;
    colorName: string;
    colorCode: string; // Hex code or image path for the thumbnail
    price: number;
    image: string;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    variants: Variant[];
}

export const FEATURED_PRODUCTS_DATA: Product[] = [
    {
        id: 1,
        name: 'Gấm Hoa Lan',
        slug: 'gam-hoa-lan',
        description: 'Vải gấm hoa lan cao cấp',
        variants: [
            { variantId: 'v1-1', colorName: 'Đỏ', colorCode: '/products/vai1.jpg', price: 79000, image: '/products/vai1.jpg' },
            { variantId: 'v1-2', colorName: 'Xanh', colorCode: '/products/vai2.jpg', price: 85000, image: '/products/vai2.jpg' },
            { variantId: 'v1-3', colorName: 'Vàng', colorCode: '/products/vai3.jpg', price: 79000, image: '/products/vai3.jpg' },
        ]
    },
    {
        id: 2,
        name: 'Linen Gân',
        slug: 'linen-gan',
        description: 'Vải linen gân thoáng mát',
        variants: [
            { variantId: 'v2-1', colorName: 'Tím', colorCode: '/products/vai6.jpg', price: 75000, image: '/products/vai6.jpg' },
            { variantId: 'v2-2', colorName: 'Trắng', colorCode: '/products/vai7.jpg', price: 75000, image: '/products/vai7.jpg' },
            { variantId: 'v2-3', colorName: 'Kem', colorCode: '/products/vai10.png', price: 75000, image: '/products/vai10.png' },
        ]
    },
    {
        id: 3,
        name: 'Lụa In Bi Đại',
        slug: 'lua-in-bi-dai',
        description: 'Lụa in họa tiết bi đại',
        variants: [
            { variantId: 'v3-1', colorName: 'Hồng', colorCode: '/products/vai4.jpg', price: 75000, image: '/products/vai4.jpg' },
            { variantId: 'v3-2', colorName: 'Đen', colorCode: '/products/vai5.jpg', price: 75000, image: '/products/vai5.jpg' },
        ]
    },
    {
        id: 4,
        name: 'Lụa In Bi Lớn',
        slug: 'lua-in-bi-lon',
        description: 'Lụa in họa tiết bi lớn',
        variants: [
            { variantId: 'v4-1', colorName: 'Xanh dương', colorCode: '/products/vai8.jpg', price: 64000, image: '/products/vai8.jpg' },
            { variantId: 'v4-2', colorName: 'Xám', colorCode: '/products/vai8.png', price: 64000, image: '/products/vai8.png' },
        ]
    },
    {
        id: 5,
        name: 'Lụa In Bi Nhỏ',
        slug: 'lua-in-bi-nho',
        description: 'Lụa in họa tiết bi nhỏ',
        variants: [
            { variantId: 'v5-1', colorName: 'Đa sắc', colorCode: '/products/vai1.jpg', price: 57000, image: '/products/vai1.jpg' },
        ]
    }
];

// Tạo 20 sản phẩm mẫu bằng cách nhân bản dữ liệu
export const MOCK_PRODUCTS: Product[] = [
    ...FEATURED_PRODUCTS_DATA,
    ...FEATURED_PRODUCTS_DATA.map(p => ({ ...p, id: p.id + 5, slug: `${p.slug}-2` })),
    ...FEATURED_PRODUCTS_DATA.map(p => ({ ...p, id: p.id + 10, slug: `${p.slug}-3` })),
    ...FEATURED_PRODUCTS_DATA.map(p => ({ ...p, id: p.id + 15, slug: `${p.slug}-4` })),
].slice(0, 10);
