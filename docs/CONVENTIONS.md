# Conventions - Quy Ước Code (Web Edition)

## Giới Thiệu

Tài liệu này định nghĩa các quy ước cho dự án Web (Next.js, TypeScript, Tailwind CSS).

## Naming Conventions

### 1. Components
**PascalCase**. Tên file trùng tên component.
*   ✅ `ProductCard.tsx`
*   ❌ `product-card.tsx`, `productCard.tsx`

### 2. Hooks
**camelCase** với prefix `use`.
*   ✅ `useAuth.ts`, `useDebounce.ts`
*   ❌ `UseAuth.ts`, `authHook.ts`

### 3. Utilities & Functions
**camelCase**.
*   ✅ `formatDate.ts`, `apiClient.ts`
*   ❌ `FormatDate.ts`

### 4. Constants
**SCREAMING_SNAKE_CASE** cho biến constant, **camelCase** cho tên file.
*   File: `appConstants.ts`
*   Code: `export const MAX_ITEMS = 10;`

### 5. Folders
**kebab-case** (chữ thường, gạch nối).
*   ✅ `user-profile`, `shopping-cart`
*   ❌ `UserProfile`, `shoppingCart`

**(Ngoại lệ: Next.js App Router folders có thể dùng `(group)` hoặc `[param]`)**

## Project Structure Rules

### Feature Module Structure
Mỗi feature trong `features/` tuân theo cấu trúc:
```
features/product/
├── api/              # React Query hooks & API calls
├── components/       # Components riêng của feature
├── hooks/            # Logic hooks
├── types/            # TypeScript Interfaces/Types
└── index.ts          # Public API
```

### Import Import Aliases
Luôn sử dụng Absolute Imports configured trong `tsconfig.json`:
*   `@/app/...`
*   `@/features/...`
*   `@/shared/...`
*   `@/core/...`

❌ Tránh relative path sâu: `../../../../components/Button`

## Coding Standards

### 1. TypeScript
*   **Interface** cho Objects/Props (`interface UserProps {}`).
*   **Type** cho Unions/Primitives (`type Status = 'loading' | 'success'`).
*   **No enum**: Ưu tiên dùng Union Types hoặc const object `as const`.
*   **No Any**: Cấm sử dụng `any`. Dùng `unknown` nếu cần thiết.

### 2. React Components
*   Sử dụng **Functional Components**.
*   **Props Destructuring**: Luôn destructure props để code gọn hơn.
*   **Named Exports**: Ưu tiên `export const Button = ...` hơn `export default` cho components nhỏ. (Pages của Next.js bắt buộc `export default`).

```tsx
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ label, variant = 'primary' }: ButtonProps) => {
  return <button className={...}>{label}</button>;
};
```

### 3. Tailwind CSS
*   Sử dụng utility classes trực tiếp.
*   Sử dụng `clsx` hoặc `tailwind-merge` để merge classes có điều kiện.
*   Không dùng `@apply` bừa bãi trong CSS trừ khi style quá phức tạp và lặp lại nhiều.

```tsx
// ✅ Tốt
<div className="flex items-center justify-between p-4 bg-white shadow-sm">...</div>

// ❌ Hạn chế (trừ khi cần thiết)
.card {
  @apply flex items-center justify-between p-4 bg-white shadow-sm;
}
```

## Git Conventions

Xem chi tiết tại [GIT_WORKFLOW.md](./GIT_WORKFLOW.md).
*   Commit semantic: `feat: add product list`, `fix: login error`.
