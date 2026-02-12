'use client';

import { useState } from 'react';
import { Layout, Menu, Button, Badge, Drawer, Grid } from 'antd'; // 1. Import Drawer, Grid
import {
    ShoppingCartOutlined,
    UserOutlined,
    DownOutlined,
    MenuOutlined // 2. Import icon Hamburger
} from '@ant-design/icons';
import { StyleSheet } from '@/shared/utils/styles';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import { Logo } from '@/shared/components/brand/logo';
import type { MenuProps } from 'antd';
import { CartDrawer } from '@/components/CartDrawer';

const { Header: AntHeader } = Layout;
const { useBreakpoint } = Grid;

const CATEGORIES = [
    { label: 'Tất cả', key: 'all' },
    { label: 'Nổi bật', key: 'featured' },
    { label: 'Mới nhất', key: 'newest' },
    { label: 'Linen', key: 'linen' },
    { label: 'Kaki', key: 'kaki' },
    { label: 'Thun', key: 'thun' },
    { label: 'Ren/lưới', key: 'ren-luoi' },
    { label: 'Gấm', key: 'gam' },
    { label: 'Lụa', key: 'lua' },
    { label: 'Tơ/voan', key: 'to-voan' },
    { label: 'Len', key: 'len' },
    { label: 'Tweed/bố/dạ', key: 'tweed' },
    { label: 'Tafta', key: 'tafta' },
    { label: 'Boi/kate', key: 'boi-kate' },
    { label: 'Khác', key: 'other' },
];

export const Header = () => {
    const cartItems = useCartStore((state) => state.items);
    const screens = useBreakpoint();


    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    // Xử lý logic mở menu con
    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        // Giữ logic chỉ mở 1 menu tại 1 thời điểm (nếu muốn) hoặc mở nhiều
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (latestOpenKey && latestOpenKey !== '2') {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const isProductOpen = openKeys.includes('2');

    // Cấu hình Items cho Menu (Dùng chung cho cả Desktop và Mobile)
    const menuItems: MenuProps['items'] = [
        {
            key: '1',
            label: <Link href="/">Trang chủ</Link>
        },
        {
            key: '2',
            label: (
                <span className="flex items-center gap-1" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Sản phẩm
                    <DownOutlined
                        style={{
                            fontSize: '10px',
                            marginLeft: '4px',
                            transition: 'transform 0.3s ease',
                            // Logic xoay mũi tên dùng chung cho cả 2 giao diện
                            transform: isProductOpen ? 'rotate(-180deg)' : 'rotate(0deg)'
                        }}
                    />
                </span>
            ),
            children: CATEGORIES.map(cat => ({
                key: cat.key,
                label: <Link href={`/products?category=${cat.key}`}>{cat.label}</Link>,
                style: {
                    height: '40px',
                    lineHeight: '40px',
                    margin: 0,
                    fontSize: '14px',
                    letterSpacing: '1px',
                }
            }))
        },
        {
            key: '3',
            label: <Link href="/blog">Blog</Link>
        },
        {
            key: '4',
            label: <Link href="/about">Giới thiệu</Link>
        },
        {
            key: '5',
            label: <Link href="/contact">Liên hệ</Link>
        },
    ];

    return (
        <AntHeader style={styles.headerContainer}>
            {/* Logo */}
            <Link href="/" style={styles.logoLink}>
                <Logo />
            </Link>

            {/* Desktop Menu: Chỉ hiện khi màn hình >= md (768px) */}
            {screens.md ? (
                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    style={styles.desktopMenu}
                    items={menuItems}
                    expandIcon={null}
                    triggerSubMenuAction="hover"
                />
            ) : null}

            {/* Actions (Giỏ hàng & User) */}
            <div style={styles.actions}>
                <Badge count={cartItems.length} showZero>
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<ShoppingCartOutlined />}
                        size="large"
                        onClick={() => setCartOpen(true)}
                    />
                </Badge>

                {/* Ẩn nút Login chữ trên mobile cho gọn */}
                {screens.md && (
                    <Button
                        type="text"
                        style={{ color: 'black', marginLeft: 10 }}
                        icon={<UserOutlined />}
                    >
                        Đăng nhập
                    </Button>
                )}

                {/* Nút Hamburger: Chỉ hiện khi màn hình nhỏ (< md) */}
                {!screens.md && (
                    <Button
                        type="text"
                        icon={<MenuOutlined style={{ fontSize: '20px' }} />}
                        onClick={() => setMobileMenuOpen(true)}
                        style={{ marginLeft: 10 }}
                    />
                )}
            </div>

            {/* DRAWER MOBILE: Sidebar trượt từ phải qua */}
            <Drawer
                title="Menu"
                placement="right"
                onClose={() => setMobileMenuOpen(false)}
                open={mobileMenuOpen}
                width={250}
                styles={{
                    body: { padding: 0 }
                }}
            >
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    items={menuItems}
                    expandIcon={null}
                    style={{ border: 'none', letterSpacing: '1px' }}
                    onClick={() => {

                        setMobileMenuOpen(false);
                    }}
                />

                {/* Nút đăng nhập cho Mobile nằm dưới cùng Drawer */}
                <div style={{ padding: '20px', borderTop: '1px solid #f0f0f0' }}>
                    <Button block icon={<UserOutlined />}>
                        Đăng nhập
                    </Button>
                </div>
            </Drawer>

            {/* 4. CartDrawer*/}
            <CartDrawer
                open={cartOpen}
                onClose={() => setCartOpen(false)}
            />
        </AntHeader>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        padding: '0 20px',
        height: '84px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
    },
    logoLink: {
        marginRight: '20px',
        display: 'flex',
        alignItems: 'center',
    },
    desktopMenu: {
        marginLeft: '40px',
        flex: 1,
        minWidth: 0,
        backgroundColor: 'transparent',
        borderBottom: 'none',
        fontSize: '16px',
        fontWeight: 300,
        letterSpacing: '2px', // Letter spacing cho Desktop
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
});