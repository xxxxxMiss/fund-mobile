const { Controller } = require('egg')
class WebHooksController extends Controller {
  async push() {
    const { ctx } = this
    ctx.logger.info(ctx.request.body)
    ctx.body = 'Successfully'
  }
}

module.exports = WebHooksController
