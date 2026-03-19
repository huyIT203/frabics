'use client';

import React from 'react';
import { Button } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

interface CarouselArrowButtonProps {
    direction: 'left' | 'right';
    onClick?: () => void;
    style?: React.CSSProperties;
}

const baseStyle: React.CSSProperties = {
    position: 'absolute',
    top: '40%',
    zIndex: 10,
    width: '44px',
    height: '44px',
    backgroundColor: '#F4EFE7',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1a1a1a',
    fontSize: '18px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
};

export const CarouselArrowButton = ({ direction, onClick, style }: CarouselArrowButtonProps) => {
    return (
        <Button
            icon={direction === 'left' ? <ArrowLeftOutlined /> : <ArrowRightOutlined />}
            shape="circle"
            onClick={onClick}
            style={{
                ...baseStyle,
                [direction === 'left' ? 'left' : 'right']: '0px',
                ...style,
            }}
        />
    );
};
