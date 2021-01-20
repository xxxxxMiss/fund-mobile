'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.post('/v1/fund/rank', controller.fund.rank)
  router.get('/v1/fund/detail', controller.fund.fundDetail)
  router.get('/v1/stock/board', controller.fund.dashboard)
  router.get('/v1/stock/industry/rank', controller.fund.industry)
  router.post('/img-recognize', controller.fund.imgRecognize)
  router.post('/v1/fund/add', controller.fund.addFund)
  router.post('/v1/fund/cancel', controller.fund.delFund)
  router.get('/v1/fund/getMyFund', controller.fund.getMyFund)
  router.post('/v1/fund/login', controller.fund.login)
  router.post('/v1/fund/restore', controller.fund.restore)
  router.post('/web-hooks', controller.webHooks.push)
  router.get('*', controller.home.index)
}
