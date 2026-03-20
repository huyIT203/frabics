'use client';

import React, { useState } from 'react';
import { StyleSheet } from '@/shared/utils/styles';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

interface ExploreButtonProps {
    label?: string;
    onClick?: () => void;
    href?: string;
    variant?: 'light' | 'dark';
    size?: 'small' | 'default';
    isStatic?: boolean;
}

export const ExploreButton: React.FC<ExploreButtonProps> = ({
    label = 'Khám phá',
    onClick,
    href,
    variant = 'dark',
    size = 'default',
    isStatic = false,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    const isLight = variant === 'light';
    const isSmall = size === 'small';
    const btnHeight = isSmall ? '32px' : '48px';
    const btnCollapsed = isSmall ? '32px' : '48px';
    const btnExpanded = isSmall ? '140px' : '180px';

    const handleClick = () => {
        if (onClick) onClick();
        if (href) router.push(href);
    };

    return (
        <div
            style={{
                ...styles.wrapper,
                height: btnHeight,
                backgroundColor: isLight
                    ? 'rgba(255, 255, 255, 0.85)'
                    : 'rgba(26, 26, 26, 0.9)',
                boxShadow: isLight
                    ? '0 4px 20px rgba(120, 80, 30, 0.12)'
                    : '0 4px 20px rgba(0, 0, 0, 0.15)',
                backdropFilter: isLight ? 'blur(10px)' : undefined,
                width: isStatic ? btnCollapsed : (isHovered ? btnExpanded : btnCollapsed),
            }}
            onMouseEnter={() => !isStatic && setIsHovered(true)}
            onMouseLeave={() => !isStatic && setIsHovered(false)}
            onClick={handleClick}
        >
            <div style={styles.content}>
                <span
                    style={{
                        ...styles.text,
                        color: isLight ? '#4A3520' : '#ffffff',
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? 'translateX(0)' : 'translateX(-10px)',
                    }}
                >
                    {label}
                </span>
                <div
                    style={{
                        ...styles.iconWrap,
                        position: 'absolute' as const,
                        right: isHovered ? '16px' : 'calc(50% - 12px)',
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    <ArrowRightOutlined
                        style={{
                            color: isLight ? '#4A3520' : '#ffffff',
                            fontSize: isSmall ? '12px' : '16px',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: '48px',
        borderRadius: '30px',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    text: {
        fontSize: '14px',
        fontWeight: 500,
        letterSpacing: '1px',
        whiteSpace: 'nowrap',
        transition: 'all 0.4s ease',
        position: 'absolute',
        left: '24px',
    },
    iconWrap: {
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
