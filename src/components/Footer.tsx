'use client';

import Link from 'next/link';
import { Row, Col, Typography, Space } from 'antd';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from '@/shared/components/brand/logo';
import { StyleSheet } from '@/shared/utils/styles';

const { Text, Title } = Typography;

export const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <Row gutter={[32, 32]}>
                    {/* Brand & Description */}
                    <Col xs={24} md={12} lg={6}>
                        <div style={{ marginBottom: 16 }}>
                            <Logo />
                        </div>
                        <Text type="secondary" style={styles.textBlock}>
                            Creating premium digital experiences with modern web technologies. Quality code, beautiful design.
                        </Text>
                        <Space size="large" style={{ marginTop: 16 }}>
                            <Facebook size={20} style={styles.icon} />
                            <Instagram size={20} style={styles.icon} />
                            <Twitter size={20} style={styles.icon} />
                        </Space>
                    </Col>

                    {/* Quick Links */}
                    <Col xs={24} md={12} lg={6}>
                        <Title level={5} style={styles.heading}>Quick Links</Title>
                        <Space orientation="vertical">
                            <Link href="/">Home</Link>
                            <Link href="/products">Products</Link>
                            <Link href="/about">About Us</Link>
                            <Link href="/blog">Blog</Link>
                        </Space>
                    </Col>

                    {/* Support */}
                    <Col xs={24} md={12} lg={6}>
                        <Title level={5} style={styles.heading}>Support</Title>
                        <Space orientation="vertical">
                            <Link href="/faq">FAQ</Link>
                            <Link href="/shipping">Shipping & Returns</Link>
                            <Link href="/privacy">Privacy Policy</Link>
                            <Link href="/terms">Terms of Service</Link>
                        </Space>
                    </Col>

                    {/* Contact Info */}
                    <Col xs={24} md={12} lg={6}>
                        <Title level={5} style={styles.heading}>Contact</Title>
                        <Space orientation="vertical" size="middle">
                            <div style={styles.contactItem}>
                                <MapPin size={18} color="#0F172A" />
                                <Text>123 Innovation St, Tech City</Text>
                            </div>
                            <div style={styles.contactItem}>
                                <Phone size={18} color="#0F172A" />
                                <Text>+1 (555) 123-4567</Text>
                            </div>
                            <div style={styles.contactItem}>
                                <Mail size={18} color="#0F172A" />
                                <Text>hello@example.com</Text>
                            </div>
                        </Space>
                    </Col>
                </Row>

                <div style={styles.copyright}>
                    <Text type="secondary" suppressHydrationWarning>
                        &copy; {new Date().getFullYear()} BrandName. All rights reserved.
                    </Text>
                </div>
            </div>
        </footer>
    );
};

const styles = StyleSheet.create({
    footer: {
        borderTop: '1px solid #E2E8F0',
        backgroundColor: '#FFFFFF',
        paddingTop: '48px',
        paddingBottom: '24px',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
    },
    heading: {
        textTransform: 'uppercase',
        fontSize: '14px',
        letterSpacing: '1px',
        marginBottom: '16px',
    },
    textBlock: {
        display: 'block',
        lineHeight: '1.6',
    },
    icon: {
        cursor: 'pointer',
        color: '#64748B',
    },
    contactItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    copyright: {
        marginTop: '48px',
        paddingTop: '32px',
        borderTop: '1px solid #F1F5F9',
        textAlign: 'center',
    }
});