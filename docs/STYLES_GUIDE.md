# Styles Guide (Web / Tailwind CSS)

## Tổng Quan

Dự án sử dụng **Tailwind CSS** làm Design System. Chúng ta không định nghĩa biến style thủ công mà sử dụng cấu hình của Tailwind (`tailwind.config.ts`) để đảm bảo tính nhất quán (Consistency).

## 1. Colors (Màu sắc)

Sử dụng bảng màu mở rộng trong `tailwind.config.ts`.
Tên class: `text-{color}`, `bg-{color}`, `border-{color}`.

| Token | Class Web | Mô tả |
|-------|-----------|-------|
| Primary | `text-primary`, `bg-primary` | Màu chủ đạo (Brand color) |
| Secondary | `text-secondary`, `bg-secondary` | Màu phụ, điểm nhấn |
| Success | `text-green-600`, `bg-green-50` | Thành công |
| Error | `text-red-600`, `bg-red-50` | Lỗi, cảnh báo nghiêm trọng |
| Warning | `text-yellow-600`, `bg-yellow-50` | Cảnh báo |
| Gray Scale | `text-gray-50` ... `text-gray-900` | Văn bản, border, background xám |

## 2. Typography (Chữ viết)

Sử dụng các utilities có sẵn của Tailwind.

### Font Size
*   **xs**: `text-xs` (12px)
*   **sm**: `text-sm` (14px)
*   **base**: `text-base` (16px) - Body text
*   **lg**: `text-lg` (18px)
*   **xl**: `text-xl` (20px)
*   **2xl**: `text-2xl` (24px) - Headings
*   ...

### Font Weight
*   Regular: `font-normal` (400)
*   Medium: `font-medium` (500)
*   SemiBold: `font-semibold` (600)
*   Bold: `font-bold` (700)

## 3. Spacing (Khoảng cách)

Tailwind sử dụng scale 4px (1 unit = 4px).

*   `p-1` = 4px padding
*   `m-2` = 8px margin
*   `gap-4` = 16px gap
*   `w-full`, `h-screen`, ...

### Common Spacing
*   **Compact**: `p-2` (8px), `gap-2`
*   **Standard**: `p-4` (16px), `gap-4`
*   **Loose**: `p-6` (24px), `gap-6`
*   **Section**: `py-12` (48px)

## 4. Layouts

Sử dụng Flexbox và Grid làm chủ đạo.

**Flexbox:**
```jsx
<div className="flex items-center justify-between gap-4">
  <div>Left</div>
  <div>Right</div>
</div>
```

**Grid:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* 4 columns on large screens, 2 on medium, 1 on mobile */}
  <ProductCard />
</div>
```

## 5. Shadows & Borders

*   **Shadows**: `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-none`.
*   **Radius**: `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-full`.
*   **Border**: `border`, `border-gray-200`, `border-t`, `divide-y`.

## 6. Responsive Design

Design theo hướng **Mobile First**. Viết class cho mobile trước, sau đó override bằng prefix breakpoint.

*   `sm:` (640px)
*   `md:` (768px)
*   `lg:` (1024px)
*   `xl:` (1280px)

```jsx
// Mobile: 1 cột (mặc định)
// MD: 2 cột
// LG: 3 cột
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  ...
</div>
```

## 7. Helper Libraries

Sử dụng `clsx` và `tailwind-merge` để xử lý dynamic classes trong components.

```tsx
import { cn } from '@/shared/utils'; // hàm wrapper của clsx + tailwind-merge

interface Props {
  className?: string;
  active?: boolean;
}

export const Card = ({ className, active }: Props) => {
  return (
    <div className={cn(
      "p-4 bg-white rounded-lg border", // Base styles
      active && "border-primary shadow-md", // Conditional styles
      className // Custom overrides check
    )}>
      ...
    </div>
  );
};
```
