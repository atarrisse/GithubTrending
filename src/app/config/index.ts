const config = {
    GITHUB_API_URL: process.env.NEXT_PUBLIC_GITHUB_API_URL,
    FETCH_COUNT: 30,
    FETCH_PERIOD: 7 * 24 * 60 * 60 * 1000, // 7 days
    defaultLocale: 'de-DE'
};

export default config;