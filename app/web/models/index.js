import { post } from 'utils/request'

const fetchRank = data => {
  return post('/v1/fund/rank', data)
}

export default {
  namespace: 'index',
  state: {
    title: '基金排行',
    list: [],
  },

  effects: {
    *fetchRank({ payload, append }, { call, put, select }) {
      const res = yield call(fetchRank, payload)
      let list = yield select(state => {
        return state.index.list
      })
      if (append) {
        list = [...list, ...res]
      } else {
        list = res
      }
      yield put({
        type: 'setState',
        payload: { list },
      })
    },
  },

  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
}
