import { get } from 'utils/request'
import { fmtRate, fmtDate } from 'utils/format'
import { ReactEchartsCore, echarts } from 'utils/chart'
import { useEffect, useState } from 'react'
import { Button } from 'antd-mobile'
import dayjs from 'dayjs'
import { getFilterOptions } from 'utils/config'
export default function FundDetail(props) {
  const yearFmt = fmtRate(props.lastYearGrowth)
  const dayFmt = fmtRate(props.dayGrowth)
  const [options, setOptions] = useState({
    xAxis: {
      type: 'category',
      data: props.xAxis,
      splitNumber: 3,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: value => {
          return value + '%'
        },
      },
    },
    series: [
      {
        data: props.yAxis,
        type: 'line',
        // smooth: true,
      },
    ],
  })

  useEffect(() => {}, [])
  const handleFilter = () => {}

  return (
    <div className={sbx('page-fund-detail')}>
      <div className={sbx('block-overview')}>
        <div className={sbx('name')}>{props.name}</div>
        <div className={sbx('sub-info')}>
          <span>{props.code}</span>
          <span className={sbx('type')}>{props.type}</span>
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
      <div className={sbx('block-chart')}>
        <ReactEchartsCore
          echarts={echarts}
          option={options}
          lazyUpdate={true}
        />
        <div className={sbx('btn-group')}>
          {getFilterOptions().map(item => {
            return (
              <div
                className={sbx('btn')}
                key={item.value}
                onClick={() => handleFilter(item.value)}
              >
                {item.label}
              </div>
            )
          })}
        </div>
      </div>
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
  const res = await get('/v1/fund/detail', {
    params: {
      code,
      startDate: dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
      endDate: dayjs().format('YYYY-MM-DD'),
    },
  })
  return res
}
