if (!self.define) {
  const e = e => {
      'require' !== e && (e += '.js')
      let r = Promise.resolve()
      return (
        s[e] ||
          (r = new Promise(async r => {
            if ('document' in self) {
              const s = document.createElement('script')
              ;(s.src = e), document.head.appendChild(s), (s.onload = r)
            } else importScripts(e), r()
          })),
        r.then(() => {
          if (!s[e]) throw new Error(`Module ${e} didn’t register its module`)
          return s[e]
        })
      )
    },
    r = (r, s) => {
      Promise.all(r.map(e)).then(e => s(1 === e.length ? e[0] : e))
    },
    s = { require: Promise.resolve(r) }
  self.define = (r, t, i) => {
    s[r] ||
      (s[r] = Promise.resolve().then(() => {
        let s = {}
        const n = { uri: location.origin + r.slice(1) }
        return Promise.all(
          t.map(r => {
            switch (r) {
              case 'exports':
                return s
              case 'module':
                return n
              default:
                return e(r)
            }
          })
        ).then(e => {
          const r = i(...e)
          return s.default || (s.default = r), s
        })
      }))
  }
}
define('./test-sw.js', function (e) {
  'use strict'
  self.addEventListener('message', e => {
    e.data && 'SKIP_WAITING' === e.data.type && self.skipWaiting()
  }),
    e.precacheAndRoute(
      [
        {
          url: '/fund.webmanifest',
          revision: 'daff36aee0581514edd038a2e3143bf6',
        },
        { url: '/index.html', revision: '36d8095d081e1b487b439fb4c955c2fc' },
        { url: '/umi.4df7e723.css', revision: null },
      ],
      {}
    )
})
