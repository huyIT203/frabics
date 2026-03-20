import React from 'react';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/AntdRegistry';
import { ConfigProvider } from 'antd';
import './globals.css';

// Import Header và Footer
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

import { typography } from '@/styles/typography';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata = {
    title: 'Cửa hàng vải cao cấp',
    description: 'Fabric Store',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vi" suppressHydrationWarning>
            <body className={inter.className} style={{ margin: 0, padding: 0 }} suppressHydrationWarning>
                <StyledComponentsRegistry>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#0F172A',
                                borderRadius: 4,
                                fontFamily: typography.fontFamily.sans,
                            },
                        }}
                    >
                        {/* Bọc toàn bộ trong Layout flex column để Footer luôn ở dưới đáy */}
                        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

                            {/* 1. Header luôn hiển thị */}
                            <Header />

                            {/* 2. Nội dung chính (Page) - flex: 1 để đẩy Footer xuống dưới */}
                            <main style={{ flex: 1, backgroundColor: '#ffffff' }}>
                                {children}
                            </main>

                            {/* 3. Footer luôn hiển thị */}
                            <Footer />

                        </div>
                    </ConfigProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}