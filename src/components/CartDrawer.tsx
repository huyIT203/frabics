'use client';
import { Drawer, Button, Typography } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { StyleSheet } from '@/shared/utils/styles';
import { useCartStore } from '@/store/useCartStore';

const { Text } = Typography;

interface CartDrawerProps {
    open: boolean;
    onClose: () => void;
}

export const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
    const { items } = useCartStore();

    // Tính tổng tiền
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    // Format tiền tệ (VND)
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <Drawer
            title={<span style={{ fontWeight: 700, fontSize: '16px' }}>GIỎ HÀNG</span>}
            placement="right"
            onClose={onClose}
            open={open}
            width={'300px'}
            styles={{
                header: { borderBottom: '1px solid #f0f0f0' },
                body: { padding: 0, display: 'flex', flexDirection: 'column' },
                footer: { padding: '20px', borderTop: '1px solid #f0f0f0' }
            }}
            // Phần Footer cố định ở dưới
            footer={
                <div style={styles.footerContainer}>
                    <div style={styles.totalRow}>
                        <Text strong>TỔNG TIỀN:</Text>
                        <Text strong>{formatCurrency(totalPrice)}</Text>
                    </div>

                    <div style={styles.buttonGroup}>
                        <Button
                            type="primary"
                            block
                            size="large"
                            style={styles.blackButton}
                            onClick={() => {
                                onClose();
                                // router.push('/cart'); // Thêm điều hướng sau này
                            }}
                        >
                            XEM GIỎ HÀNG
                        </Button>
                        <Button
                            type="primary"
                            block
                            size="large"
                            style={styles.blackButton}
                        >
                            THANH TOÁN
                        </Button>
                    </div>
                </div>
            }
        >
            {items.length === 0 ? (
                <div style={styles.emptyContainer}>
                    <ShoppingCartOutlined style={{ fontSize: '64px', color: '#8c8c8c', marginBottom: '16px' }} />
                    <Text style={{ color: '#595959' }}>Hiện chưa có sản phẩm</Text>
                </div>
            ) : (
                // Giao diện khi có sản phẩm (Sẽ làm sau)
                <div style={{ padding: '20px' }}>
                    {items.map(item => (
                        <div key={item.id} style={{ marginBottom: 10 }}>{item.name} - x{item.quantity}</div>
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
        marginTop: '100px',
    },
    footerContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    totalRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
        fontSize: '16px',
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    blackButton: {
        backgroundColor: '#1f1f1f',
        borderColor: '#1f1f1f',
        borderRadius: '0px',
        fontWeight: 600,
        height: '48px',
        textTransform: 'uppercase',
    }
});