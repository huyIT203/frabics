'use client'; // Cần use client vì dùng Antd Button

import { StyleSheet } from '@/shared/utils/styles';
import { HomeBanner } from './banner';
import { PartnerBar } from './partner-bar';
import { FeaturedProducts } from './featured-products';

export default function Home() {
    return (
        <main style={styles.main}>
            <HomeBanner />
            <PartnerBar />
            <FeaturedProducts />
        </main>
    );
}

const styles = StyleSheet.create({
    main: {
        width: '100%',
    }
});