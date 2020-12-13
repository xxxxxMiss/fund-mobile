const { Controller } = require('egg')
const fs = require('fs')
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
    const xAxis = []
    const yAxis = []
    for (const item of res.data.netWorthData) {
      xAxis.push(item[0])
      yAxis.push(item[2])
    }
    res.data.xAxis = xAxis
    res.data.yAxis = yAxis
    ctx.body = res
  }
  async dashboard() {
    const { ctx } = this
    const res = await ctx.helper.get(ctx, {
      url: '/stock/board',
    })
    ctx.body = res
  }
  async industry() {
    const { ctx } = this
    const res = await ctx.helper.get(ctx, {
      url: '/stock/industry/rank',
    })
    const fixedPanelList = []
    for (const item of res.data) {
      fixedPanelList.push({
        name: item.name,
        code: item.industryCode,
      })
    }
    ctx.body = { ...res, data: { list: res.data, fixedList: fixedPanelList } }
  }
  async imgRecognize() {
    const { ctx } = this
    const file = ctx.request.files[0]
    const imgData = fs.readFileSync(file.filepath)
    ctx.cleanupRequestFiles()
    const res = await ctx.curl(
      this.config.customeConfig.recognizeUrl + '/cats/fund-recognize',
      {
        content: imgData,
        dataType: 'json',
        method: 'POST',
        timeout: [3000, 30000],
      }
    )
    console.log('==========', res)
    ctx.body = {
      code: 200,
      data: res.data,
    }
  }
}

module.exports = FundController
