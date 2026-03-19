'use client';

import { useRef } from 'react';
import { Typography, Carousel } from 'antd';
import { StyleSheet } from '@/shared/utils/styles';
import { CarouselArrowButton } from '@/shared/components/ui/CarouselArrowButton';
import { ProductCard } from '@/shared/components/ui/ProductCard';
import { useScrollFadeIn } from '@/shared/hooks/useScrollFadeIn';
import { MOCK_PRODUCTS } from '../data/products';
import { CarouselRef } from 'antd/es/carousel';

export const FeaturedProducts = () => {
    const carouselRef = useRef<CarouselRef>(null);
    const { ref, animationStyle } = useScrollFadeIn(0.1);

    return (
        <section ref={ref as React.RefObject<HTMLElement>} style={{ ...styles.container, ...animationStyle }}>
            {/* Tiêu đề phần Sản phẩm nổi bật */}
            <div style={styles.header}>
                <Typography.Title level={2} style={styles.mainTitle}>Sản Phẩm Nổi Bật</Typography.Title>
                <Typography.Text type="secondary" style={styles.subTitle}>
                    Khám phá những mẫu vải được yêu thích nhất
                </Typography.Text>
            </div>

            {/* Danh sách sản phẩm với Carousel và nút điều hướng */}
            <div style={styles.carouselWrapper}>
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
                        { breakpoint: 480, settings: { slidesToShow: 1 } },
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
    mainTitle: {
        fontSize: '42px',
        fontWeight: 100,
        marginBottom: '15px',
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