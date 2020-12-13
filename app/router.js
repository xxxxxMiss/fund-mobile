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
  router.get('*', controller.home.index)
}
