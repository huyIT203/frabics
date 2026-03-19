'use client';

import { useState, useSyncExternalStore, useEffect, useRef } from 'react';
import { Layout, Menu, Button, Badge, Drawer, Grid, Typography } from 'antd';
import {
    ShoppingCartOutlined,
    UserOutlined,
    DownOutlined,
    MenuOutlined,
} from '@ant-design/icons';
import { StyleSheet } from '@/shared/utils/styles';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/shared/components/brand/logo';
import type { MenuProps } from 'antd';
import { CartDrawer } from '@/components/CartDrawer';

const { Header: AntHeader } = Layout;
const { useBreakpoint } = Grid;
const { Text } = Typography;

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

const getMenuItems = (isProductOpen: boolean): MenuProps['items'] => [
    {
        key: '1',
        label: <Link href="/" style={styles.menuLink}>Trang chủ</Link>
    },
    {
        key: '2',
        label: (
            <span style={styles.menuLabelWithIcon}>
                Sản phẩm
                <DownOutlined
                    style={{
                        fontSize: '10px',
                        marginLeft: '4px',
                        transition: 'transform 0.3s ease',
                        transform: isProductOpen ? 'rotate(-180deg)' : 'rotate(0deg)'
                    }}
                />
            </span>
        ),
        children: CATEGORIES.map(cat => ({
            key: cat.key,
            label: <Link href={`/products?category=${cat.key}`}>{cat.label}</Link>,
            style: styles.subMenuItem
        }))
    },
    {
        key: '3',
        label: <Link href="/blog" style={styles.menuLink}>Blog</Link>
    },
    {
        key: '4',
        label: <Link href="/about" style={styles.menuLink}>Giới thiệu</Link>
    },
    {
        key: '5',
        label: <Link href="/contact" style={styles.menuLink}>Liên hệ</Link>
    },
];

export const Header = () => {
    const { items: cartItems, isOpen: cartOpen, setOpen: setCartOpen } = useCartStore();
    const screens = useBreakpoint();
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    // const [cartOpen, setCartOpen] = useState(false); // Đã chuyển sang store

    const mounted = useSyncExternalStore(
        () => () => { },
        () => true,
        () => false
    );

    const isDesktop = mounted ? (screens.md ?? true) : true;
    const isProductOpen = openKeys.includes('2');

    // Detect current route for active menu item
    const pathname = usePathname();
    const getSelectedKey = () => {
        if (pathname === '/') return ['1'];
        if (pathname.startsWith('/products')) return ['2'];
        if (pathname.startsWith('/blog')) return ['3'];
        if (pathname.startsWith('/about')) return ['4'];
        if (pathname.startsWith('/contact')) return ['5'];
        return [];
    };

    // Scroll hide/show
    const [headerVisible, setHeaderVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            if (currentY > lastScrollY.current && currentY > 100) {
                setHeaderVisible(false); // cuộn xuống → ẩn
            } else {
                setHeaderVisible(true);  // cuộn lên → hiện
            }
            lastScrollY.current = currentY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (latestOpenKey && latestOpenKey !== '2') {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const menuItems = getMenuItems(isProductOpen);

    return (
        <AntHeader style={{
            ...styles.headerContainer,
            padding: isDesktop ? '0 40px' : '0 16px',
            transform: headerVisible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-120%)',
            opacity: headerVisible ? 1 : 0,
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease',
        }}>
            {/* KHỐI TRÁI: Logo cố định */}
            <div style={{
                ...styles.leftSection,
                width: isDesktop ? '280px' : 'auto',
                flex: isDesktop ? '0 0 280px' : '1 1 auto',
            }}>
                <Link href="/" style={styles.logoLink}>
                    <Logo style={{ height: isDesktop ? '60px' : '60px', width: 'auto' }} />
                </Link>
            </div>

            {/* KHỐI GIỮA: Chứa Menu và Search tương tác với nhau */}
            {isDesktop && (
                <div style={styles.centerSection}>
                    <div style={styles.menuWrapper}>
                        <Menu
                            theme="light"
                            mode="horizontal"
                            selectedKeys={getSelectedKey()}
                            openKeys={openKeys}
                            onOpenChange={onOpenChange}
                            style={styles.desktopMenu}
                            items={menuItems}
                            expandIcon={null}
                            triggerSubMenuAction="hover"
                        />
                    </div>
                </div>
            )}

            {/* KHỐI PHẢI: Các button Actions cố định */}
            <div style={{
                ...styles.rightSection,
                width: isDesktop ? '280px' : 'auto',
                flex: isDesktop ? '0 0 280px' : '1 1 auto',
            }}>
                <div style={styles.actions}>
                    <div style={styles.actionItem} onClick={() => setCartOpen(true)}>
                        <Badge count={cartItems.length} showZero size="small" offset={[2, 0]}>
                            <ShoppingCartOutlined style={styles.actionIcon} />
                        </Badge>
                        {isDesktop && <Text style={styles.actionText}>Giỏ hàng</Text>}
                    </div>

                    <div style={styles.actionItem}>
                        <UserOutlined style={styles.actionIcon} />
                        {isDesktop && <Text style={styles.actionText}>Đăng nhập</Text>}
                    </div>

                    {!isDesktop && (
                        <Button
                            type="text"
                            icon={<MenuOutlined style={{ fontSize: '20px' }} />}
                            onClick={() => setMobileMenuOpen(true)}
                            style={{ marginLeft: 5 }}
                        />
                    )}
                </div>
            </div>

            {/* Sidebar Mobile */}
            <Drawer
                title="MENU"
                placement="right"
                onClose={() => setMobileMenuOpen(false)}
                open={mobileMenuOpen}
                size="default"
                styles={{ body: { padding: 0 } }}
                destroyOnClose
            >
                <Menu
                    mode="inline"
                    selectedKeys={getSelectedKey()}
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    items={menuItems}
                    expandIcon={null}
                    style={{ border: 'none' }}
                    onClick={(e) => {
                        if (e.key !== '2') setMobileMenuOpen(false);
                    }}
                />
            </Drawer>

            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

            {/* Selected = thick underline */}
            <style>{`
                .ant-menu-horizontal > .ant-menu-item::after,
                .ant-menu-horizontal > .ant-menu-submenu::after {
                    border-bottom-width: 3px !important;
                    border-bottom-color: transparent !important;
                }
                .ant-menu-horizontal > .ant-menu-item-selected::after,
                .ant-menu-horizontal > .ant-menu-submenu-selected::after {
                    border-bottom-width: 3px !important;
                    border-bottom-color: #1a1a1a !important;
                }
                .ant-menu-horizontal > .ant-menu-item:hover::after,
                .ant-menu-horizontal > .ant-menu-submenu:hover::after {
                    border-bottom-width: 3px !important;
                    border-bottom-color: #1a1a1a !important;
                }
            `}</style>
        </AntHeader>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        padding: '0 32px',
        height: '80px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        width: '1200px',
        maxWidth: 'calc(100% - 24px)',
        borderRadius: '36px',
    },
    leftSection: {
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
    },
    centerSection: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 20px',
        overflow: 'hidden',
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexShrink: 0,
    },
    logoLink: {
        display: 'flex',
        alignItems: 'center',
        width: 'auto',
    },

    desktopMenu: {
        display: 'flex',
        justifyContent: 'center',
        minWidth: 0,
        backgroundColor: 'transparent',
        borderBottom: 'none',
        lineHeight: '56px',
        border: 'none',
    },
    menuLink: {
        letterSpacing: '2px',
        fontWeight: 300,
        fontSize: '13px',
    },
    menuLabelWithIcon: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        letterSpacing: '2px',
        fontWeight: 300,
        fontSize: '13px',
    },
    menuWrapper: {
        flex: 1,
    },
    subMenuItem: {
        height: '40px',
        lineHeight: '40px',
        margin: 0,
        fontSize: '14px',
        letterSpacing: '1px',
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
    },
    actionItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
    },
    actionIcon: {
        fontSize: '20px',
        color: '#000',
    },
    actionText: {
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '1px',
        whiteSpace: 'nowrap',
    },
});