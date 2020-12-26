import { get } from 'utils/request'
import { InputItem } from 'antd-mobile'
import { fmtRate } from 'utils/format'

const Mine = props => {
  return (
    <div className={sbx('page-mine')}>
      {(props.list || []).map(item => {
        const { text: expectGrowth, color } = fmtRate(item.expectGrowth)

        return (
          <div className={sbx('card')} key={item.code}>
            <h3 className={sbx('name')}>
              {item.name}
              <span className={sbx('code')}>{item.code}</span>
            </h3>
            <div className={sbx('row-text')}>
              <span>持有份额</span>
              <span>估算涨幅</span>
              <span>估算收益</span>
            </div>
            <div className={sbx('row-num')}>
              <span>
                <InputItem placeholder="请输入持有份额" />
              </span>
              <span style={{ color }}>{expectGrowth}</span>
              <span></span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

Mine.getInitialProps = async () => {
  const list = await get('/v1/fund/getMyFund')
  return { list }
}
export default Mine
