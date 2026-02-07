# Text Link Guide

## Overview
Component hiển thị liên kết văn bản, sử dụng `next/link` để tối ưu routing.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | `#` | Đường dẫn đích |
| `children` | `ReactNode` | - | Nội dung hiển thị |
| `variant` | `'default' \| 'muted' \| 'hover'` | `'default'` | Style variant |

## Usage

```tsx
import Link from 'next/link';

// Basic
<Link href="/forgot-password" className="text-primary hover:underline">
  Forgot Password?
</Link>

// Muted Link
<Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
  Terms of Service
</Link>

// Inline Text Link
<p className="text-sm text-gray-600">
  Don't have an account?{' '}
  <Link href="/register" className="font-semibold text-primary hover:underline">
    Sign up
  </Link>
</p>
```
