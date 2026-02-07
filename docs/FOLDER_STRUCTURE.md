# Cấu trúc Thư mục (Next.js App Router)

Dự án sử dụng **Next.js App Router**. Cấu trúc thư mục được tổ chức như sau:

```
/
├── app/                    # Chứa các route, layouts, và pages
│   ├── (auth)/             # Route group cho authen (login/register)
│   ├── (shop)/             # Route group cho trang bán hàng
│   ├── api/                # API Routes (nếu cần backend proxy)
│   ├── globals.css         # CSS toàn cục / Tailwind directives
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Trang chủ
├── components/             # React components tái sử dụng
│   ├── ui/                 # Các component cơ bản (Button, Input, Modal...)
│   ├── layout/             # Header, Footer, Sidebar
│   └── features/           # Components theo tính năng (ProductCard, CartItem...)
├── hooks/                  # Custom React hooks
├── lib/                    # Các tiện ích, cấu hình, helper functions
│   ├── utils.ts            # Hàm tiện ích chung (clsx, format price...)
│   └── axios-client.ts     # Cấu hình Axios instance
├── services/               # Các hàm gọi API (tách biệt logic fetch)
├── store/                  # Zustand stores
│   └── useCartStore.ts     # Ví dụ store giỏ hàng
├── types/                  # TypeScript interface/type definitions chung
├── public/                 # Assets tĩnh (images, fonts, icons)
└── docs/                   # Tài liệu dự án
```

## Quy tắc đặt tên
- **Thư mục (Folders):** `kebab-case` (ví dụ: `user-profile`, `product-list`).
- **File Component:** `PascalCase.tsx` (ví dụ: `Button.tsx`, `UserProfile.tsx`).
- **File Hook:** `camelCase.ts` bắt đầu bằng `use` (ví dụ: `useAuth.ts`).
- **File Utility:** `camelCase.ts` (ví dụ: `formatDate.ts`).

## Alias Import
Sử dụng `@/` để import từ thư mục gốc (cần cấu hình trong `tsconfig.json`).
Ví dụ: `import { Button } from '@/components/ui/Button'`
