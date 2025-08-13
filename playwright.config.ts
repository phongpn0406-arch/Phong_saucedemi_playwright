import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './src/tests',        // Thư mục chứa test scripts
    timeout: 30000,            // Timeout mặc định cho từng test (30 giây)
    expect: {
        timeout: 5000            // Timeout cho các lệnh expect
    },
    reporter: [
        ['html', { open: 'always' }] // luôn mở report HTML sau khi chạy xong
    ],
    use: {
        headless: false,          // Chạy trình duyệt ở chế độ headless
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure', // Ghi video khi test fail
        screenshot: 'on',
        trace: 'on'
    },
});
