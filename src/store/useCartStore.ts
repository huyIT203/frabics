import { create } from 'zustand';

interface CartItem {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string | number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    items: [],
    isOpen: false,
    setOpen: (open) => set({ isOpen: open }),
    addToCart: (item) =>
        set((state) => {
            const existingItem = state.items.find((i) => i.id === item.id);
            if (existingItem) {
                return {
                    items: state.items.map((i) =>
                        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                    ),
                    isOpen: true,
                };
            }
            return {
                items: [...state.items, item],
                isOpen: true,
            };
        }),
    removeFromCart: (id) =>
        set((state) => ({
            items: state.items.filter((i) => i.id !== id),
        })),
    clearCart: () => set({ items: [] }),
}));