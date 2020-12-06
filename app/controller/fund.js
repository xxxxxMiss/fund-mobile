const { Controller } = require('egg')

class FundController extends Controller {
  async rank() {
    const { ctx } = this
    const res = await ctx.helper.post(ctx, {
      url: '/fund/rank',
      data: ctx.request.body,
    })
    ctx.body = res
  }
}

module.exports = FundController
