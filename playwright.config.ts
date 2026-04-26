import { defineConfig, devices } from '@playwright/test';


const BASE_URL= "https://www.wildberries.ru";

export default defineConfig({
    testDir: './tests',
    workers: 1,
    retries: 2,

    use:{
        baseURL: BASE_URL,
        headless: true,
        viewport: {width: 1920,height:1080},
        userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        screenshot: 'only-on-failure',
        launchOptions: {
            args: [
                '--disable-blink-features=AutomationControlled',  
            ],
    },
    },

    projects: [
        {
            name: "chromium",
            use: {...devices["Desktop Chrome"]},
        },
    ],

    reporter: [
        ['list'],
        ["allure-playwright",{resultsDir:"allure-results"}]
    ],
});