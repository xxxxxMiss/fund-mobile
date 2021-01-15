const { Controller } = require('egg')
const { spawn } = require('child_process')

const exec = (command, args = [], options = {}) => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      env: process.env,
      stdio: 'inherit',
      ...options,
    })
    child.on('close', code => {
      if (code) {
        reject(code)
      } else {
        resolve()
      }
    })
  })
}
class WebHooksController extends Controller {
  async push() {
    const { ctx } = this
    ctx.logger.info(ctx.request.body)
    const {
      head_commit: { added, removed, modified },
    } = ctx.request.body
    let isWeb = false
    isWeb = added.some(p => p.includes('web'))
    if (!isWeb) {
      removed.some(p => p.includes('web'))
    }
    if (!isWeb) {
      modified.some(p => p.includes('web'))
    }
    try {
      await exec('git', ['pull'])
      if (isWeb) {
        await exec('npm', ['run', 'build'])
      }
      await exec('npm', ['stop'])
      await exec('npm', ['start'])
      ctx.body = 'Succefully'
    } catch (error) {
      ctx.body = error.message
    }
  }
}

module.exports = WebHooksController
