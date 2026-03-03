'use client';

import React from 'react';
import { Button, ButtonProps, ConfigProvider } from 'antd';

interface RoundedButtonProps extends ButtonProps {
    text: string; // Nội dung nút
}

export const RoundedButton = ({ text, style, ...props }: RoundedButtonProps) => {
    return (
        // Sử dụng ConfigProvider để override style của Antd Button cục bộ
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        borderRadius: 40, // Tạo hình viên thuốc (Pill shape)
                        defaultBorderColor: '#000000',
                        defaultColor: '#000000',


                        // Màu khi Hover
                        defaultHoverBorderColor: '#000000',
                        defaultHoverColor: '#FFFFFF',
                        defaultHoverBg: '#000000',

                        // Màu khi Click (Active)
                        defaultActiveBorderColor: '#333333',
                        defaultActiveColor: '#FFFFFF',
                        defaultActiveBg: '#333333',
                    },
                },
            }}
        >
            <Button
                type="default" // Dùng type default để có viền
                style={{
                    height: '48px', // Tăng từ 42px lên 48px
                    padding: '0 40px', // Tăng padding ngang
                    fontSize: '16px', // Tăng từ 14px lên 16px
                    fontWeight: 600, // Tăng độ đậm từ 500 lên 600
                    textAlign: 'center',
                    cursor: 'pointer',
                    fontFamily: '"Gotham Book", sans-serif',
                    letterSpacing: '0.8px', // Tăng nhẹ để tương xứng với chữ to
                    borderWidth: '2.2px', // Tăng độ dày viền để nổi bật hơn
                    ...style,
                }}
                {...props} // Truyền các props khác (onClick, loading,...)
            >
                {text}
            </Button>
        </ConfigProvider>
    );
};