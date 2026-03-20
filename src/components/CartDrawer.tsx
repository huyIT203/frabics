import { Drawer, Button, Typography, Grid, InputNumber, Modal } from 'antd';
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
import { StyleSheet } from '@/shared/utils/styles';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

interface CartDrawerProps {
    open: boolean;
    onClose: () => void;
}

export const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
    const { items, removeFromCart, updateItem, clearCart } = useCartStore();
    const screens = useBreakpoint();

    const drawerWidth = screens.md ? 580 : '100%';

    const totalPrice = items.reduce((total, item) => total + item.price, 0);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <Drawer
            title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Title level={4} style={{ margin: 0, letterSpacing: '2px' }}>GIỎ HÀNG ({items.length})</Title>
                    {items.length > 0 && (
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => {
                                if (items.length >= 2) {
                                    Modal.confirm({
                                        title: 'Xóa tất cả sản phẩm',
                                        content: 'Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?',
                                        okText: 'Xóa tất cả',
                                        cancelText: 'Hủy',
                                        okButtonProps: { danger: true },
                                        centered: true,
                                        onOk: clearCart,
                                    });
                                } else {
                                    clearCart();
                                }
                            }}
                            style={{ fontSize: '13px', letterSpacing: '0.5px' }}
                        >
                            Xóa tất cả
                        </Button>
                    )}
                </div>
            }
            placement="right"
            onClose={onClose}
            open={open}
            styles={{
                header: { borderBottom: '1px solid #f0f0f0', padding: '20px' },
                body: { padding: 0 },
                footer: { padding: '20px', borderTop: '1px solid #f0f0f0' },
                wrapper: { width: drawerWidth },
            }}
            footer={
                items.length > 0 && (
                    <div style={styles.footerContainer}>
                        <div style={styles.totalRow}>
                            <Text style={{ letterSpacing: '1px' }}>TỔNG CỘNG:</Text>
                            <Text strong style={{ fontSize: '18px', color: '#B38728' }}>
                                {formatCurrency(totalPrice)}
                            </Text>
                        </div>
                        <Button
                            type="primary"
                            block
                            style={styles.checkoutButton}
                        >
                            Đi đến thanh toán
                        </Button>
                        <Button
                            type="text"
                            block
                            onClick={onClose}
                            style={{ letterSpacing: '1px', fontSize: '12px' }}
                        >
                            TIẾP TỤC MUA SẮM
                        </Button>
                    </div>
                )
            }
        >
            {items.length === 0 ? (
                <div style={styles.emptyContainer}>
                    <ShoppingCartOutlined style={{ fontSize: '48px', color: '#d9d9d9', marginBottom: '16px' }} />
                    <Text type="secondary" style={{ letterSpacing: '1px' }}>Giỏ hàng của bạn đang trống</Text>
                    <Button
                        type="link"
                        onClick={onClose}
                        style={{ marginTop: '16px', color: '#B38728' }}
                    >
                        Quay lại cửa hàng
                    </Button>
                </div>
            ) : (
                <div style={styles.itemsList}>
                    {items.map(item => (
                        <div key={item.id} style={styles.cartItem}>
                            <div style={styles.itemImage}>
                                {item.image && (
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                )}
                            </div>
                            <div style={styles.itemInfo}>
                                <div style={styles.itemHeader}>
                                    <Text strong style={styles.itemName}>{item.name}</Text>
                                    <Button
                                        type="text"
                                        icon={<DeleteOutlined />}
                                        size="small"
                                        onClick={() => removeFromCart(item.id)}
                                        danger
                                    />
                                </div>
                                {item.colorName && (
                                    <Text type="secondary" style={{ fontSize: '12px', color: '#888' }}>
                                        Màu: {item.colorName}
                                    </Text>
                                )}
                                <div style={styles.metersRow}>
                                    <Text type="secondary" style={{ fontSize: '12px', marginRight: '8px' }}>Số mét:</Text>
                                    <InputNumber
                                        min={0.5}
                                        step={0.5}
                                        value={item.meters || 1}
                                        size="small"
                                        style={{ width: '90px' }}
                                        onChange={(val) => {
                                            const newMeters = val || 0.5;
                                            const unitPrice = item.meters ? item.price / item.meters : item.price;
                                            updateItem(item.id, { meters: newMeters, price: unitPrice * newMeters });
                                        }}
                                    />
                                </div>
                                <Text type="secondary" style={styles.itemPrice}>
                                    {formatCurrency(item.price)}
                                </Text>
                                {item.note && (
                                    <div style={{ marginTop: '6px', padding: '6px 8px', backgroundColor: '#fafafa', borderRadius: '4px', border: '1px solid #f0f0f0' }}>
                                        <Text type="secondary" style={{ fontSize: '12px', whiteSpace: 'pre-wrap' }}>
                                            📝 {item.note}
                                        </Text>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Drawer>
    );
};
const styles = StyleSheet.create({
    emptyContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '0 40px',
        textAlign: 'center',
    },
    itemsList: {
        padding: '0 20px',
    },
    cartItem: {
        display: 'flex',
        gap: '15px',
        padding: '20px 0',
        borderBottom: '1px solid #f5f5f5',
    },
    itemImage: {
        position: 'relative',
        width: '80px',
        height: '100px',
        flexShrink: 0,
        backgroundColor: '#f9f9f9',
    },
    itemInfo: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    itemHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    itemName: {
        fontSize: '13px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        maxWidth: '180px',
    },
    itemPrice: {
        fontSize: '14px',
        color: '#231F20',
    },
    metersRow: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '4px',
    },
    footerContainer: {
        width: '100%',
    },
    totalRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    checkoutButton: {
        backgroundColor: '#1a1a1a',
        borderColor: '#1a1a1a',
        height: '50px',
        borderRadius: '0',
        fontSize: '14px',
        fontWeight: 600,
        letterSpacing: '2px',
        marginBottom: '10px',
    }
});