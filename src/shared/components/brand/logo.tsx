import Image from 'next/image';
import { StyleSheet } from '@/shared/utils/styles';

const LOGO_WIDTH = 200;
const LOGO_HEIGHT = 180;

interface LogoProps {
    style?: React.CSSProperties;
}

export const Logo = ({ style }: LogoProps) => {
    return (
        <Image
            src="/logo.svg"
            alt="Brand Logo"
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            style={{ ...styles.image, ...style }}
            priority
        />
    );
};

const styles = StyleSheet.create({
    image: {
        objectFit: 'contain',
    }
});