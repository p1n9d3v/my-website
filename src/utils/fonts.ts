import { Open_Sans } from 'next/font/google';
import localFont from 'next/font/local';

export const openSans = Open_Sans({
    subsets: ['latin'],
    variable: '--font-open-sans',
});

export const dankMono = localFont({
    src: [
        {
            path: '../../public/fonts/DankMono/DankMono-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/fonts/DankMono/DankMono-Italic.woff2',
            weight: '400',
            style: 'italic',
        },
        {
            path: '../../public/fonts/DankMono/DankMono-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
});
