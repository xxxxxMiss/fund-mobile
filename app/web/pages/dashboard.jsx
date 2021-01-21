import { get } from 'utils/request'
import { fmtRate, fmtNumber } from 'utils/format'

export default function Dashboard(props) {
  return (
    <div className={sbx('page-dashboard')}>
      <div className={sbx('card-container')}>
        {(props.list || []).map(item => {
          const fmtGrowth = fmtRate(item.growth)
          const fmtPrice = fmtNumber(item.price, true)
          const fmtExponent = fmtNumber(item.exponent)
          return (
            <div className={sbx('card')} key={item.stockCode}>
              <div className={sbx('name')}>{item.stockName}</div>
              <div
                className={sbx('price')}
                style={{ color: fmtExponent.color }}
              >
                {fmtExponent.text}
              </div>
              <span
                className={sbx('price-change')}
                style={{ color: fmtPrice.color }}
              >
                {fmtPrice.text}
              </span>
              <span
                className={sbx('change-percent')}
                style={{ color: fmtGrowth.color }}
              >
                {fmtGrowth.text}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

Dashboard.getInitialProps = async () => {
  const res = await get('/v1/stock/board')
  return { list: res }
}
