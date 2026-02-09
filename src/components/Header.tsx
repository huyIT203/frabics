import Link from 'next/link';
import { Logo } from '@/shared/components/brand/logo';
import { Menu, Search, ShoppingCart, User } from 'lucide-react';

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="w-full h-[84px] flex items-center justify-between px-[15px]">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Logo className="h-40" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 text-xs font-normal font-sans tracking-widest">
                    <Link href="/" className="transition-colors hover:text-primary">
                        HOME
                    </Link>
                    <Link href="/products" className="transition-colors hover:text-primary">
                        SẢN PHẨM
                    </Link>
                    <Link href="/blog" className="transition-colors hover:text-primary">
                        BLOG
                    </Link>
                    <Link href="/about" className="transition-colors hover:text-primary">
                        GIỚI THIỆU
                    </Link>
                    <Link href="/contact" className="transition-colors hover:text-primary">
                        LIÊN HỆ
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-accent rounded-full transition-colors">
                        <Search className="h-5 w-5" />
                        <span className="sr-only">Search</span>
                    </button>
                    <Link href="/cart" className="p-2 hover:bg-accent rounded-full transition-colors relative">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary animate-pulse" />
                        <span className="sr-only">Cart</span>
                    </Link>
                    <Link href="/login" className="p-2 hover:bg-accent rounded-full transition-colors">
                        <User className="h-5 w-5" />
                        <span className="sr-only">Account</span>
                    </Link>

                    {/* Mobile Menu Button - visible only on mobile */}
                    <button className="md:hidden p-2 hover:bg-accent rounded-full transition-colors">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Menu</span>
                    </button>
                </div>
            </div>
        </header>
    );
};
