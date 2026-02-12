import { CSSProperties } from 'react';

// Hàm này giúp TypeScript gợi ý nhắc lệnh khi gõ style
export const StyleSheet = {
    create: <T extends { [key: string]: CSSProperties }>(styles: T): T => {
        return styles;
    },
};