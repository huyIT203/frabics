'use client';

import { useRef } from 'react';
import { Typography, Carousel } from 'antd';
import { StyleSheet } from '@/shared/utils/styles';
import { CarouselArrowButton } from '@/shared/components/ui/CarouselArrowButton';
import { ProductCard } from '@/shared/components/ui/ProductCard';
import { useScrollFadeIn } from '@/shared/hooks/useScrollFadeIn';
import { ExploreButton } from '@/shared/components/ui/ExploreButton';
import { MOCK_PRODUCTS } from '../data/products';
import { CarouselRef } from 'antd/es/carousel';
import { useResponsive } from '@/shared/hooks/useResponsive';

export const FeaturedProducts = () => {
    const carouselRef = useRef<CarouselRef>(null);
    const { ref, animationStyle } = useScrollFadeIn(0.1);
    const { isMobile } = useResponsive();

    const bestSellerProducts = MOCK_PRODUCTS.filter(p => p.badge === 'best-seller');

    return (
        <section ref={ref as React.RefObject<HTMLElement>} style={{
            ...styles.container,
            ...animationStyle,
            padding: isMobile ? '0 12px' : '0 30px',
        }}>
            <div style={{
                ...styles.header,
                paddingLeft: isMobile ? '8px' : '20px',
            }}>
                <div style={styles.titleRow}>
                    <Typography.Title level={2} style={{
                        ...styles.mainTitle,
                        fontSize: isMobile ? '28px' : '42px',
                        margin: 0,
                        lineHeight: 1,
                    }}>Sản Phẩm Nổi Bật</Typography.Title>
                    <ExploreButton variant="dark" size={isMobile ? 'small' : 'default'} isStatic={isMobile} href="/san-pham/noi-bat" />
                </div>
                <Typography.Text type="secondary" style={{
                    ...styles.subTitle,
                    fontSize: isMobile ? '13px' : '15px',
                }}>
                    Khám phá những mẫu vải được yêu thích nhất
                </Typography.Text>
            </div>

            {isMobile ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    padding: '0 8px',
                }}>
                    {bestSellerProducts.slice(0, 6).map((product) => (
                        <div key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{
                    ...styles.carouselWrapper,
                    padding: '0 50px',
                }}>
                    <CarouselArrowButton direction="left" onClick={() => carouselRef.current?.prev()} />

                    <Carousel
                        ref={carouselRef}
                        slidesToShow={4}
                        slidesToScroll={1}
                        dots={false}
                        infinite={true}
                        responsive={[
                            { breakpoint: 1200, settings: { slidesToShow: 3 } },
                            { breakpoint: 768, settings: { slidesToShow: 2 } },
                        ]}
                    >
                        {bestSellerProducts.map((product) => (
                            <div key={product.id}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </Carousel>

                    <CarouselArrowButton direction="right" onClick={() => carouselRef.current?.next()} />
                </div>
            )}
        </section>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: '0 30px',
        backgroundColor: '#ffffff',
    },
    header: {
        marginBottom: '20px',
        paddingLeft: '20px',
    },
    titleRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    mainTitle: {
        fontSize: '42px',
        fontWeight: 100,
        marginBottom: '0px !important',
        fontFamily: 'Playfair Display',
        color: '#000000',
    },
    subTitle: {
        fontSize: '15px',
        color: '#000000',
        fontFamily: 'Gotham Book, sans-serif',
        marginBottom: '20px',
        marginTop: '5px',
    },
    carouselWrapper: {
        position: 'relative',
        padding: '0 50px',
    },
});