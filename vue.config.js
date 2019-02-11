module.exports = {
    devServer: {
        watchOptions: {
            poll: true
        },
        proxy: {
            '^/api': {
                target: 'http://localhost:8000',
                ws: true,
                changeOrigin: true,
            }
        }
    }
}