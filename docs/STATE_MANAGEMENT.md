# State Management Guide (Web Edition)

## 📖 Tổng Quan

Dự án sử dụng 3 công cụ quản lý state chính:

1.  **TanStack Query (React Query)** - Server State (API data).
2.  **Zustand** - Client Global State (App config, Auth session, Shopping Cart).
3.  **React useState/useReducer** - Local Component State.

## 1. Server State (tanstack/react-query)

Mọi dữ liệu lấy từ API **PHẢI** dùng React Query. Không lưu data API vào Zustand trừ khi có lý do đặc biệt (offline mode phức tạp).

### Pattern: API -> Hook -> Component

**1. API Layer (`features/product/api/productApi.ts`)**
```typescript
import { apiClient } from '@/core/api/client';

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await apiClient.get('/products');
  return data;
};
```

**2. Hook Layer (`features/product/hooks/useProducts.ts`)**
```typescript
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/productApi';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};
```

**3. Component (`app/(shop)/products/page.tsx`)**
```tsx
'use client';

import { useProducts } from '@/features/product';

export default function ProductListPage() {
  const { data, isLoading } = useProducts();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="grid grid-cols-4 gap-4">
      {data?.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

## 2. Client State (Zustand)

Sử dụng cho state toàn cục của App (không phụ thuộc API).

### Ví dụ: Shopping Cart Store

```typescript
// features/cart/store/cartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartItem {
  id: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({ 
        items: [...state.items, item] 
      })),
      removeItem: (id) => set((state) => ({ 
        items: state.items.filter((i) => i.id !== id) 
      })),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage), // Dùng localStorage cho Web
    }
  )
);
```

### Next.js & Hydration Note
Khi dùng Zustand với Persist trong Next.js (SSR), có thể gặp lỗi "Hydration mismatch". Nên wrap component dùng store trong client component hoặc dùng custom hook `useStore` để xử lý hydration an toàn.

## 3. Local State (useState)

Dùng cho:
*   Form input values (nhập liệu đơn giản).
*   Modal open/close visibility.
*   Accordion expand/collapse.

```tsx
const [isOpen, setIsOpen] = useState(false);
```

## Decision Tree

1.  Dữ liệu từ API? -> **React Query**.
2.  Dữ liệu cần chia sẻ giữa nhiều trang/components xa nhau? -> **Zustand**.
3.  Dữ liệu chỉ dùng trong component hiện tại (hoặc con trực tiếp)? -> **useState**.
