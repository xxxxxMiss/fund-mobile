const { Controller } = require('egg')

class WebHooksController extends Controller {
  async push() {
    const { ctx } = this
    ctx.logger.info(ctx.request.body)
    ctx.body = 'hello world'
  }
  async test() {
    console.log('----hello world---')
    this.ctx.body = 'hello world222'
  }
}

module.exports = WebHooksController
