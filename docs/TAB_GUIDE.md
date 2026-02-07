# Tab (SegmentedControl) Guide

## Overview
Component chuyển đổi giữa các view hoặc filter, tương đương `SegmentedControl` trên mobile. Trên web có thể implement dưới dạng **Tabs**.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `items` | `{ label: string, value: string }[]` | Danh sách tabs |
| `value` | `string` | Giá trị tab đang chọn |
| `onChange` | `(value: string) => void` | Callback khi đổi tab |

## Usage

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/components/ui/Tabs';

// Basic Usage
<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>

// Controlled Usage (Segmented Style)
const [view, setView] = useState('list');

<div className="flex bg-gray-100 p-1 rounded-lg">
  <button 
    className={cn("px-4 py-2 rounded-md", view === 'list' && "bg-white shadow")}
    onClick={() => setView('list')}
  >
    List
  </button>
  <button 
    className={cn("px-4 py-2 rounded-md", view === 'grid' && "bg-white shadow")}
    onClick={() => setView('grid')}
  >
    Grid
  </button>
</div>
```
