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
  async fundDetail() {
    const { ctx } = this
    const res = await ctx.helper.get(ctx, {
      url: '/fund/detail',
      data: ctx.query,
    })
    ctx.body = res
  }
}

module.exports = FundController
