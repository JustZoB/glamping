module.exports = {
    purge: [
        './public/**/*.html',
        './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    mode: 'jit',
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            screens: {
                extra: { max: '1800px' },
                '3xl': { max: '1656px' },
                '4xl': { max: '1700px' },
                '2xl': { max: '1536px' },
                xxl: { max: '1440px' },
                xl: { max: '1280px' },
                llg: { max: '1100px' },
                lg: { max: '1024px' },
                tablet: { max: '860px' },
                md: { max: '768px' },
                sm: { max: '640px' },
                xs: { max: '480px' },
                xxs: { max: '420px' },
                mob: { max: '390px' },
                xmob: { max: '360px' },
            },
            fontFamily: {
                fira_sans: ['Fira Sans', 'sans-serif'],
            },
            boxShadow: {
                'header': '0px 10px 30px 0px rgba(82, 63, 105, 0.05)',
                'dropdown': '0px 0px 50px 0px rgba(82, 63, 105, 0.15)',
            },
            colors: {
                slate: {
                    700: '#34495E',
                    800: '#2e3759',
                    900: '#161C31',
                    950: '#080D21',
                },
                sky: {
                    100: '#F4F8FA',
                    200: '#DDE8EB',
                    800: '#00A2F2',
                },
                gray: {
                    20: '#FBFBFB',
                    50: '#F9F9F9',
                    100: '#F0F0F0',
                    200: '#D6D6D6',
                    300: '#A1A5B7',
                    400: '#9D9E9E',
                    500: '#525252',
                    600: '#5B5B5B',
                    700: '#434242',
                },
                red: {
                    100: '#F3EcEA',
                    200: '#EBCACA',
                    400: '#D8232A',
                    500: '#EB4C4C',
                },
                primary: {
                    100: '#F1FAFF',
                    800:'#009EF7',
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
