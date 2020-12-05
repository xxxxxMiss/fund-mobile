exports.isMobile = ctx => {
  const source = ctx.get('user-agent') || ''
  let isMobile = false
  if (/mobile|android|iphone|ipad|phone/i.test(source)) {
    isMobile = true
  }
  return isMobile
}

exports.parseCookie = ctx => {
  let cookies = ctx.get('cookie')
  if (!cookies) {
    return []
  }
  cookies = cookies.split(';')
  const res = {}
  for (const item of cookies) {
    const kv = item.split('=')
    if (kv && kv.length > 0) {
      res[kv[0].trim()] = decodeURIComponent(kv[1])
    }
  }
  return res
}

exports.parseNavLang = ctx => {
  // 服务端无法获取navigator.language，所以只能通过Accept-Language来判断浏览器语言。
  let navigatorLang
  const clientLang = ctx.get('Accept-Language')
  if (clientLang.startsWith('zh')) {
    navigatorLang = 'zh-CN'
  } else if (clientLang.startsWith('en')) {
    navigatorLang = 'en-US'
  }
  return navigatorLang
}

const path = require('path')
const request = async (ctx, { url, data, method }) => {
  url = `https://api.yiduu.com/${path.join('v1', url)}`
  const res = await ctx.curl(url, {
    data,
    dataType: 'json',
    contentType: 'json',
    method,
    headers: {
      Token: '217a71ac3b052446e98d3e52e512d006',
    },
  })
  console.log('======2222', res)
  if (res.status === 200) {
    return res.data
  }
  return {}
}
exports.get = async (ctx, options) => {
  return request(ctx, { ...options, method: 'GET' })
}

exports.post = async (ctx, options) => {
  return request(ctx, { ...options, method: 'POST' })
}