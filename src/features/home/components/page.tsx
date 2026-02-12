'use client'; // Cần use client vì dùng Antd Button

import { Typography, Button, Space } from 'antd';
import { StyleSheet } from '@/shared/utils/styles';
import { useRouter } from 'next/navigation';


const { Title, Paragraph } = Typography;

export default function Home() {
    const router = useRouter();

    return (
        <div style={styles.container}>
            <Title level={1} style={styles.title}>
                Welcome to Fabric Store
            </Title>

            <Paragraph style={styles.description}>
                Đây là trang chủ. Header và Footer đã được tích hợp sẵn.
                Bạn có thể bắt đầu xây dựng tính năng trong thư mục <code>src/features</code>.
            </Paragraph>

            <Space size="middle" style={styles.buttonGroup}>
                <Button
                    type="primary"
                    size="large"
                    onClick={() => router.push('/products')}
                >
                    Xem sản phẩm
                </Button>
                <Button
                    size="large"
                    onClick={() => router.push('/about')}
                >
                    Tìm hiểu thêm
                </Button>
            </Space>
        </div>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 160px)',
        padding: '32px',
        textAlign: 'center',
    },
    title: {
        color: '#0F172A',
        marginBottom: '16px',
    },
    description: {
        fontSize: '18px',
        color: '#64748B',
        maxWidth: '600px',
        marginBottom: '32px',
    },
    buttonGroup: {
        marginTop: '20px',
    }
});