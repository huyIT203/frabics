# Quy chuẩn Coding (Coding Standards)

## 1. TypeScript
- **Strict Mode:** Luôn bật `strict: true` trong `tsconfig.json`.
- **No `any`:** Hạn chế tối đa dùng `any`. Định nghĩa rõ ràng Interface/Type cho props và API response.
- **Interface vs Type:** Ưu tiên dùng `interface` cho Object, `type` cho Union/Intersection.

```typescript
// Tốt
interface Product {
  id: string;
  name: string;
  price: number;
}

// Tránh
const data: any = response; 
```

## 2. React Components
- **Functional Components:** Sử dụng Function Component và Hooks.
- **Props Interface:** Khai báo interface cho Props ngay trên component hoặc file types riêng.
- **Export:** Sử dụng `export const` hoặc `export default` thống nhất (ưu tiên `export default` cho Page/Layout, `export const` cho Component nhỏ).

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const Button = ({ label, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{label}</button>;
};
```

## 3. Tailwind CSS
- **Utility First:** Sử dụng class utility của Tailwind, hạn chế viết CSS trong file `.css` riêng trừ trường hợp quá phức tạp.
- **Class Organization:** Sắp xếp class theo thứ tự hợp lý hoặc dùng plugin `prettier-plugin-tailwindcss` để tự động sắp xếp.
- **Common Patterns:**
  - Layout: `flex`, `grid`.
  - Spacing: `p-4`, `m-2`, `gap-4`.
  - Colors: `text-primary`, `bg-gray-100`.
- **Merge Class:** Sử dụng thư viện `clsx` hoặc `tailwind-merge` để gộp class có điều kiện.

```tsx
// Ví dụ dùng cn (className utility)
<div className={cn("p-4 bg-white rounded shadow", className)}>
  ...
</div>
```

## 4. Code Quality
- **ESLint & Prettier:** Chạy lint trước khi commit.
- **Comments:** Comment cho logic phức tạp, không comment những thứ hiển nhiên.
- **Clean Code:** Tách hàm nhỏ, tên biến có ý nghĩa (tiếng Anh).
