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
    ctx.body = 'Successfully'

    let isWeb = false
    isWeb = added.some(p => p.includes('web'))
    if (!isWeb) {
      removed.some(p => p.includes('web'))
    }
    if (!isWeb) {
      modified.some(p => p.includes('web'))
    }
    try {
      process.chdir(this.config.baseDir)
      await exec('git', ['pull'])
      ctx.logger.info('>>>>>>>>>>>git pull successfully')
      if (isWeb) {
        await exec('npm', ['run', 'build'])
        ctx.logger.info('>>>>>>>>>>>npm run build successfully')
      }
      await exec('npm', ['stop'])
      await exec('npm', ['start'])
      ctx.logger.info('>>>>>>>>>>>npm start successfully')
    } catch (error) {
      ctx.logger.error(error)
    }
  }
}

module.exports = WebHooksController
