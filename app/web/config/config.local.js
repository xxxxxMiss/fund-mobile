export default {
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/',
      },
    },
  },
  define: {
    // 'process.env.axiosBaseURL': 'http://localhost:8000/api',
    // 'process.env.axiosBaseURL': 'http://192.168.31.208:8000/api',
    'process.env.axiosBaseURL': 'http://192.168.113.26:8000/api',
  },
}
