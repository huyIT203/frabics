'use client'; // Cần use client vì dùng Antd Button

import { StyleSheet } from '@/shared/utils/styles';
import { HomeBanner } from '@/features/home/components/banner';
import { Homecollections } from '@/features/home/components/collections';
import { FeaturedProducts } from '@/features/home/components/featured-products';
import { NewArrivals } from '@/features/home/components/new-arrivals';
import { VideoShowcase } from '@/features/home/components/video-showcase';
import { FabricShowcase } from '@/features/home/components/fabric-showcase';

export default function Home() {
    return (
        <main style={styles.main}>
            <HomeBanner />
            <NewArrivals />
            <VideoShowcase />
            <FeaturedProducts />
            <Homecollections />
            <FabricShowcase />
        </main>
    );
}

const styles = StyleSheet.create({
    main: {
        width: '100%',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
    }
});