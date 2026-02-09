import Image from 'next/image';
import { cn } from '@/shared/utils/cn';

interface LogoProps {
    className?: string; // Additional classes for styling (e.g., width, height, margins)
    width?: number;     // Optional override for width
    height?: number;    // Optional override for height
}

export const Logo = ({ className, width = 200, height = 47 }: LogoProps) => {
    return (
        <Image
            src="/logo.svg"
            alt="Brand Logo"
            width={width}
            height={height}
            className={cn("w-auto", className)}
            priority // Ensure logo loads quickly as it's typically above the fold
        />
    );
};
