const { Controller } = require('egg')

class FundController extends Controller {
  async rank() {
    const { ctx } = this
    console.log(ctx.url)
    const res = await ctx.helper.post(ctx, {
      url: '/fund/rank',
      data: {
        fundCompany: ['80053708'],
        fundScale: '',
        fundType: ['zs'],
      },
    })
    ctx.body = res
  }
}

module.exports = FundController
