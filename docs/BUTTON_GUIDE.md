# Button Component Guide

## Overview
`Button` là component tương tác chính, hỗ trợ nhiều variants, sizes và states.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'link'` | `'primary'` | Kiểu hiển thị |
| `size` | `'sm' \| 'md' \| 'lg' \| 'icon'` | `'md'` | Kích thước |
| `loading` | `boolean` | `false` | Hiển thị spinner load |
| `asChild` | `boolean` | `false` | Render as Slot (nếu dùng Radix UI) |

## Usage

```tsx
import { Button } from '@/shared/components/ui/Button';

// Primary
<Button>Click me</Button>

// Secondary
<Button variant="secondary">Cancel</Button>

// Outline
<Button variant="outline">View Details</Button>

// With Icon
<Button>
  <Mail className="mr-2 h-4 w-4" /> Login with Email
</Button>

// Loading
<Button loading>Please wait</Button>
```

## Tailwind Implementation Note
Sử dụng `class-variance-authority` (cva) hoặc `clsx` để quản lý variants.

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        // ...
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)
```
