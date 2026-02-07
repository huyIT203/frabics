# Input Component Guide

## Overview
`Input` component dùng cho các trường nhập liệu văn bản, password, số...

## Props

Standard HTML Input props (`type`, `value`, `onChange`, `placeholder`...) cộng thêm:

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Label hiển thị phía trên input |
| `error` | `string` | Message lỗi hiển thị bên dưới (màu đỏ) |
| `icon` | `ReactNode` | Icon hiển thị bên trái/phải |

## Usage

```tsx
import { Input } from '@/shared/components/ui/Input';

// Basic
<Input placeholder="Enter your name" />

// With Label
<Input label="Email" type="email" placeholder="example@gmail.com" />

// With Error
<Input 
  label="Password" 
  type="password" 
  error="Password must be at least 8 characters" 
/>

// Disabled
<Input disabled value="Read only value" />
```

## Tailwind Styles

Input thường bao gồm các class cơ bản:
`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`
