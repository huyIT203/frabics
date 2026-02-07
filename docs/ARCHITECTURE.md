# Architecture Guide - Domain-Driven Feature Structure (Web Edition)

## Tổng Quan Kiến Trúc

Dự án này sử dụng kiến trúc **Domain-Driven Design (DDD)** kết hợp với **Feature-Based Organization**, được tối ưu hóa cho **Next.js App Router**. Mỗi feature đại diện cho một business domain độc lập, chứa toàn bộ logic, UI components, và data fetching liên quan.

```mermaid
graph TB
    A[App Entry Point (Layouts/Pages)] --> B[App Layer]
    B --> C[Features Layer]
    B --> D[Core Layer]
    B --> E[Shared Layer]

    C --> C1[auth]
    C --> C2[shop]
    C --> C3[cart]
    C --> C4[profile]

    D --> D1[API Client]
    D --> D2[Config]
    D --> D3[Services]
    D --> D4[Global Store]

    E --> E1[UI Components]
    E --> E2[Hooks]
    E --> E3[Utils]

    style A fill:#e1f5ff
    style B fill:#fff4e1
    style C fill:#e8f5e9
    style D fill:#fce4ec
    style E fill:#f3e5f5
```

## Domain-Driven Concept

### What is a Domain?

**Domain** = **Business Domain** = Khu vực nghiệp vụ của ứng dụng.
Mỗi feature đại diện cho một **domain** và tự chứa (self-contained) mọi thứ nó cần để hoạt động.

### Domain Examples in Web App:

```
src/
├── app/                  # Next.js App Router (Routing only)
│   ├── (auth)/
│   ├── (shop)/
│   └── layout.tsx
│
├── features/             # Business Logic & Feature UI
│   ├── auth/             # Login, Register, Session
│   ├── product/          # Product listing, details, filter
│   ├── cart/             # Shopping cart, checkout logic
│   ├── order/            # Order history, tracking
│   └── user-profile/     # Settings, user info
```

## 🎯 Feature Organization Principles

### 1. **Self-Contained (Độc lập)**

Mỗi feature chứa TẤT CẢ code liên quan đến domain đó:

```
features/product/
├── api/              # API calls (React Query queries/mutations)
│   ├── queries.ts    # useProducts, useProductDetail
│   └── mutations.ts  # useCreateProduct
├── components/       # UI components only for Product domain
│   ├── ProductCard.tsx
│   ├── ProductList.tsx
│   └── ProductFilter.tsx
├── hooks/            # Business logic hooks
│   └── useProductFilter.ts
├── store/            # Local state (Zustand slice if needed)
│   └── useProductStore.ts
├── types/            # TypeScript definitions
│   └── index.ts
└── index.ts          # Public API - chỉ export những gì bên ngoài cần
```

### 2. **Clear Boundaries (Ranh giới rõ ràng)**

Các feature không được import trực tiếp file nội bộ của nhau. Phải thông qua `index.ts`.

✅ **ĐÚNG:**
```typescript
import { ProductCard } from '@/features/product';
```

❌ **SAI:**
```typescript
import { ProductCard } from '@/features/product/components/ProductCard';
```

### 3. **App Router Integration**

Thư mục `app/` của Next.js chỉ nên làm nhiệm vụ **Routing** và **Layout Composition**. Logic nghiệp vụ nên nằm trong `features/`.

```tsx
// app/(shop)/products/page.tsx
import { ProductList } from '@/features/product';

export default function ProductsPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Sản Phẩm</h1>
      <ProductList />
    </main>
  );
}
```

## 📋 Feature Organization Rules

### ✅ NÊN (DO)

1.  **Mỗi feature = 1 domain nghiệp vụ**.
2.  **Shared code** (Button, Input, format date...) đặt trong `shared/`.
3.  **Core infrastructure** (Axios client, Config, Theme provider) đặt trong `core/`.

### ❌ KHÔNG NÊN (DON'T)

1.  **Trộn lẫn domains**: Đừng để logic giỏ hàng (Cart) trong feature Sản phẩm (Product).
2.  **Import vòng vo**: Feature A import Feature B, Feature B import Feature A (Circular Dependency). Nếu cần share logic chung, hãy chuyển nó xuống `shared/` hoặc `core/`.

## 🔄 Workflow Khi Thêm Feature Mới

1.  **Identify Domain**: Xác định feature thuộc nghiệp vụ nào (VD: "Review sản phẩm" -> thuộc `product` hoặc tách thành `review` nếu quá lớn).
2.  **Create Structure**: Tạo thư mục trong `features/review/`.
3.  **Implement**:
    *   Types (Data shape)
    *   API (React Query hooks)
    *   UI Components
4.  **Export**: Expose components/hooks cần thiết qua `index.ts`.
5.  **Integrate**: Import vào `app/` pages để hiển thị.

## 🏗️ Core & Shared Layers

### Core (`core/`)
Chứa các phần mềm nền tảng, cấu hình không thay đổi theo business.
*   `core/api`: Axios instance, Interceptors.
*   `core/config`: Environment variables, App constants.
*   `core/providers`: App providers (QueryClientProvider, ThemeProvider).

### Shared (`shared/`)
Chứa các thành phần tái sử dụng (Reusable).
*   `shared/components`: UI Library (Button, Modal, Input - sử dụng Tailwind).
*   `shared/hooks`: Generic hooks (useDebounce, useOnClickOutside).
*   `shared/utils`: Helper functions (formatCurrency, formatDate).

## 🚀 Lợi ích

1.  **Dễ bảo trì**: Tìm code dễ dàng (Lỗi ở giỏ hàng? -> vào `features/cart`).
2.  **Scalable**: Dự án lớn lên chỉ cần thêm folder feature mới, không làm rối cấu trúc cũ.
3.  **Teamwork**: Mỗi dev có thể phụ trách trọn vẹn 1 feature mà không conflict code người khác.
