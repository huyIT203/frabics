'use client';

import { useState, useSyncExternalStore } from 'react';
import { Layout, Menu, Button, Badge, Drawer, Grid, Input, Typography } from 'antd'; // Thêm Input, Typography
import {
    ShoppingCartOutlined,
    UserOutlined,
    DownOutlined,
    MenuOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { StyleSheet } from '@/shared/utils/styles';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
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
                SẢN PHẨM
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
        label: <Link href="/blog" style={styles.menuLink}>BLOG</Link>
    },
    {
        key: '4',
        label: <Link href="/about" style={styles.menuLink}>GIỚI THIỆU</Link>
    },
    {
        key: '5',
        label: <Link href="/contact" style={styles.menuLink}>LIÊN HỆ</Link>
    },
];

export const Header = () => {
    const { items: cartItems, isOpen: cartOpen, setOpen: setCartOpen } = useCartStore();
    const screens = useBreakpoint();
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    // const [cartOpen, setCartOpen] = useState(false); // Đã chuyển sang store
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const mounted = useSyncExternalStore(
        () => () => { },
        () => true,
        () => false
    );

    const isDesktop = mounted ? (screens.md ?? true) : true;
    const isProductOpen = openKeys.includes('2');

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
                    {/* Menu Điều hướng: Co lại khi search được focus */}
                    <div style={{
                        ...styles.menuWrapper,
                        flex: isSearchFocused ? 0 : 1,
                        opacity: isSearchFocused ? 0 : 1,
                        visibility: isSearchFocused ? 'hidden' : 'visible',
                        transform: isSearchFocused ? 'translateX(-20px)' : 'translateX(0)',
                        overflow: 'hidden',
                    }}>
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
                    </div>

                    {/* Thanh tìm kiếm: Tự động dài ra */}
                    <div style={{
                        ...styles.searchWrapper,
                        flex: isSearchFocused ? 1 : '0 0 340px',
                        maxWidth: isSearchFocused ? '100%' : '340px',
                    }}>
                        <Input
                            placeholder="Tìm kiếm sản phẩm..."
                            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                            style={styles.searchInput}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            allowClear
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
                        {isDesktop && <Text style={styles.actionText}>GIỎ HÀNG</Text>}
                    </div>

                    <div style={styles.actionItem}>
                        <UserOutlined style={styles.actionIcon} />
                        {isDesktop && <Text style={styles.actionText}>ĐĂNG NHẬP</Text>}
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
                width={280}
                styles={{ body: { padding: 0 } }}
                destroyOnClose
            >
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
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
        </AntHeader>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        padding: '0 40px',
        height: '84px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
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
    searchWrapper: {
        flexShrink: 0,
        marginLeft: '20px',
        marginRight: '20px',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    searchInput: {
        borderRadius: '20px',
        backgroundColor: '#f5f5f5',
        border: 'none',
        height: '36px',
        width: '100%',
    },
    desktopMenu: {
        display: 'flex',
        justifyContent: 'center',
        minWidth: 0,
        backgroundColor: 'transparent',
        borderBottom: 'none',
        lineHeight: '84px',
        border: 'none',
    },

    menuLink: {
        letterSpacing: '2px',
        fontWeight: 300,
        textTransform: 'uppercase',
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
        transition: 'all 0.3s ease',
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