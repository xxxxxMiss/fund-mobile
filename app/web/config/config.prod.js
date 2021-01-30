import { join } from 'path'

export default {
  plugins: [join(__dirname, '..', 'plugins', 'umi-plugin-sentry.js')],
  sentry: {
    dsn:
      'https://e72ed2d5dff94233988280d94decf530@o512888.ingest.sentry.io/5615608',
    tracesSampleRate: 1.0,
  },
  define: {
    'process.env.axiosBaseURL': '',
    'process.env.ssrAxiosBaseURL': 'http://127.0.0.1:7001',
  },
}
