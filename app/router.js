'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.post('/v1/fund/rank', controller.fund.rank)
  router.get('*', controller.home.index)
}
