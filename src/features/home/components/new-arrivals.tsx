'use client';

import React, { useRef } from 'react';
import { Typography, Carousel } from 'antd';
import { CarouselArrowButton } from '@/shared/components/ui/CarouselArrowButton';
import { ProductCard } from '@/shared/components/ui/ProductCard';
import { useScrollFadeIn } from '@/shared/hooks/useScrollFadeIn';
import { ExploreButton } from '@/shared/components/ui/ExploreButton';
import { StyleSheet } from '@/shared/utils/styles';
import { MOCK_PRODUCTS } from '../data/products';
import { CarouselRef } from 'antd/es/carousel';
import { useResponsive } from '@/shared/hooks/useResponsive';

const { Text, Title } = Typography;

export const NewArrivals = () => {
    const carouselRef = useRef<CarouselRef>(null);
    const { ref, animationStyle } = useScrollFadeIn(0.1);
    const { isMobile } = useResponsive();

    return (
        <section ref={ref as React.RefObject<HTMLElement>} style={{
            ...styles.container,
            ...animationStyle,
            padding: isMobile ? '20px 12px' : '20px 30px',
        }}>
            <div style={{
                ...styles.header,
                paddingLeft: isMobile ? '8px' : '20px',
            }}>
                <div style={{
                    ...styles.titleRow,
                    alignItems: isMobile ? 'center' : 'center',
                }}>
                    <Title level={2} style={{
                        ...styles.title,
                        fontSize: isMobile ? '28px' : '42px',
                        margin: 0,
                        lineHeight: 1,
                    }}>
                        Hàng Mới
                    </Title>
                    <ExploreButton variant="dark" size={isMobile ? 'small' : 'default'} isStatic={isMobile} />
                </div>
                <Text style={{
                    ...styles.subTitle,
                    fontSize: isMobile ? '13px' : '15px',
                }}>
                    Thời trang luôn thay đổi&mdash;đó là lý do tại sao Thiện Oanh có hàng trăm sản phẩm mới mỗi tuần!
                </Text>
            </div>

            {isMobile ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    padding: '0 8px',
                }}>
                    {MOCK_PRODUCTS.slice(0, 6).map((product) => (
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
                        {MOCK_PRODUCTS.map((product) => (
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
        padding: '20px 30px',
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
        marginBottom: '10px',
    },
    title: {
        fontSize: '42px',
        fontFamily: 'Playfair Display',
        fontWeight: 100,
        marginBottom: '0px !important',
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
