import { get } from 'utils/request'

const fetchDetail = params => {
  return get('/v1/fund/detail', {
    params,
  })
}

export default {
  namespace: 'detail',
  state: {
    title: '产品详情',
    detail: {},
  },

  effects: {
    *fetchDetail({ payload }, { call, put }) {
      const res = yield call(fetchDetail, payload)
      yield put({
        type: 'setState',
        payload: { detail: res },
      })
    },
  },

  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
}
