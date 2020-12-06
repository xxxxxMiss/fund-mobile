import { get } from 'utils/request'
import { fmtRate, fmtDate } from 'utils/format'

export default function FundDetail(props) {
  const yearFmt = fmtRate(props.lastYearGrowth)
  const dayFmt = fmtRate(props.dayGrowth)
  return (
    <div className={sbx('page-fund-detail')}>
      <div className={sbx('block-overview')}>
        <div className={sbx('name')}>{props.name}</div>
        <div className={sbx('sub-info')}>
          <span>{props.code}</span>
          <span className={sbx('type')}>{props.type}</span>
          <span>{props.type}</span>
        </div>
        <div className={sbx('rate-container')}>
          <div className={sbx('year')} style={{ color: yearFmt.color }}>
            {yearFmt.text}
          </div>
          <div className={sbx('day')} style={{ color: dayFmt.color }}>
            {dayFmt.text}
          </div>
          <div className={sbx('value')}>{props.netWorth}</div>
        </div>
        <div className={sbx('text-container')}>
          <span className={sbx('text')}>近一年涨幅</span>
          <span className={sbx('text')}>日涨跌幅</span>
          <span className={sbx('text')}>
            净值 {fmtDate(props.expectWorthDate)}
          </span>
        </div>
      </div>
      <div className={sbx('block-chart')}></div>
    </div>
  )
}

FundDetail.getInitialProps = async ({ isServer, history }) => {
  let code = null
  if (isServer) {
    code = history.location.query.code
  } else {
    code = new URLSearchParams(window.location.search).get('code')
  }
  const res = await get('/api/v1/fund/detail', {
    params: {
      code,
    },
  })
  return res
}
