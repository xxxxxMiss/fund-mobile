import { get } from 'utils/request'
import { fmtRate } from 'utils/format'

const getColor = field => {
  field = Number(field)
  return {
    color: field === 0 ? '#999' : field > 0 ? 'red' : 'green',
  }
}
export default function Dashboard(props) {
  return (
    <div className={sbx('page-dashboard')}>
      <div className={sbx('card-container')}>
        {(props.list || []).map(item => {
          const { text, color } = fmtRate(item.changePercent)
          return (
            <div className={sbx('card')} key={item.code}>
              <div className={sbx('name')}>{item.name}</div>
              <div
                className={sbx('price')}
                style={getColor(item.changePercent)}
              >
                {item.price}
              </div>
              <span
                className={sbx('price-change')}
                style={getColor(item.priceChange)}
              >
                {item.priceChange}
              </span>
              <span className={sbx('change-percent')} style={{ color }}>
                {text}
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
