const path = require('path')
const os = require('os')
const fs = require('fs')
const readline = require('readline')

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

const request = async (ctx, { url, data, method, headers = {} }) => {
  // url = `https://api.doctorxiong.club/${path.join('v1', url)}`
  url = `https://api.yiduu.com/${path.join('v1', url)}`
  const res = await ctx.curl(url, {
    data,
    dataType: 'json',
    contentType: 'json',
    method,
    headers: {
      // Token: '217a71ac3b052446e98d3e52e512d006',
      // token: 'ykAIlw6j9d',
      token: ctx.headers.token,
      ...headers,
    },
  })
  if (process.env.NODE_ENV != 'production') {
    console.log('[Request Response]: ', res)
  }
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

exports.addFund = async ({ code }) => {
  try {
    fs.appendFileSync(
      path.join(os.homedir(), '.fund', 'selected.txt'),
      `${code}\n`,
      'utf8'
    )
    return {
      code: 200,
    }
  } catch (error) {
    return {
      code: 500,
      message: `添加失败: ${code}`,
    }
  }
}

exports.delFund = async ({ code }) => {
  try {
    const selected = await exports.getFund()
    if (selected.has(code)) {
      selected.delete(code)
    }
    const target = path.join(os.homedir(), '.fund/selected.txt')
    const content = [...selected].join('\n')
    fs.writeFileSync(target, content, 'utf8')
    return {
      code: 200,
    }
  } catch (error) {
    return {
      code: 500,
      message: `取消失败：${code}`,
    }
  }
}

exports.getFund = async () => {
  const target = path.join(os.homedir(), '.fund/selected.txt')
  if (!fs.existsSync(target)) return new Set()

  const selected = new Set()
  const rl = readline.createInterface({
    input: fs.createReadStream(target),
    crlfDelay: Infinity,
  })
  for await (const code of rl) {
    selected.add(code)
  }
  rl.close()
  return selected
}
