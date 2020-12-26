import { createFromIconfontCN } from '@ant-design/icons'

export const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2245065_zg7jpt1qdih.js', // 在 iconfont.cn 上生成
  extraCommonProps: {
    className: 'myicon-custom',
  },
})
