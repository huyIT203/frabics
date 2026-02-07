# Component Documentation

Tài liệu này mô tả các **Shared UI Components** (reusable) trong dự án Web.
Các components được xây dựng dựa trên **Tailwind CSS** và tuân thủ Design System.

## Components Map

| Category | Components |
|----------|------------|
| **Buttons** | [Button](./ui/BUTTON_GUIDE.md) |
| **Forms** | [Input](./ui/INPUT_GUIDE.md) |
| **Navigation** | [SegmentedControl (Tab)](./ui/TAB_GUIDE.md), [TextLink](./ui/TEXT_LINK_GUIDE.md) |
| **Feedback** | `Spinner`, `Toast`, `Modal` |
| **Layout** | `Container`, `Grid`, `Stack` |

---

## Nguyên tắc chung

1.  **Tailwind First**: Style bằng utility classes.
2.  **Prop Driven**: Thay đổi giao diện thông qua props (`variant`, `size`, `disabled`).
3.  **Forward Ref**: Hỗ trợ `ref` đầy đủ để tương thích với các thư viện khác.
4.  **Composition**: Sử dụng `children` prop để linh hoạt nội dung.

## Ví dụ cấu trúc file Component

```tsx
// shared/components/ui/Button/Button.tsx
import React from 'react';
import { cn } from '@/shared/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          {
            'bg-primary text-white hover:bg-primary/90': variant === 'primary',
            'border border-input bg-background hover:bg-accent': variant === 'outline',
            'h-9 px-3 text-sm': size === 'sm',
            'h-10 px-4 py-2': size === 'md',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
```
