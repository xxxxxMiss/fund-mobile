import { fmtRate, fmtDate } from 'utils/format'
import { ReactEchartsCore, echarts } from 'utils/chart'
import { useEffect, useState } from 'react'
import { Button, Toast } from 'antd-mobile'
import dayjs from 'dayjs'
import { getFilterOptions } from 'utils/config'
import { Helmet, useSelector } from 'umi'
export default function FundDetail() {
  const { detail: data } = useSelector(state => state.detail || {})
  const yearFmt = fmtRate(data.dayGrowth)
  const dayFmt = fmtRate(data.dayNetWorth)
  const [isSelected, setIsSelected] = useState(false)
  // const [options, setOptions] = useState({
  //   tooltip: {
  //     trigger: 'axis',
  //     axisPointer: {
  //       type: 'cross',
  //     },
  //     show: false,
  //   },
  //   grid: {
  //     containLabel: true,
  //     left: 'left',
  //     right: 0,
  //   },
  //   xAxis: {
  //     type: 'category',
  //     boundaryGap: false,
  //     data: data.xAxis,
  //     axisPointer: {
  //       show: true,
  //     },
  //     max: 'dataMax',
  //   },
  //   yAxis: {
  //     type: 'value',
  //     axisPointer: {
  //       show: true,
  //       label: {
  //         precision: 2,
  //       },
  //     },
  //     axisLabel: {
  //       formatter: value => {
  //         return Number(value).toFixed(2) + '%'
  //       },
  //       showMaxLabel: true,
  //     },
  //   },
  //   series: [
  //     {
  //       data: data.yAxis,
  //       type: 'line',
  //       smooth: true,
  //       areaStyle: {
  //         color: {
  //           type: 'linear',
  //           x: 0,
  //           y: 0,
  //           x2: 0,
  //           y2: 1,
  //           colorStops: [
  //             {
  //               offset: 0,
  //               color: 'rgba(92, 136, 248, 0.15)', // 0% 处的颜色
  //             },
  //             {
  //               offset: 1,
  //               color: 'rgba(92, 136, 248, 0)', // 100% 处的颜色
  //             },
  //           ],
  //         },
  //       },
  //     },
  //   ],
  // })

  useEffect(() => {
    const selected = JSON.parse(localStorage.getItem('fund-selected') || '[]')
    setIsSelected(selected.includes(data.code))
  }, [data])

  const handleSelect = () => {
    const selected = JSON.parse(localStorage.getItem('fund-selected') || '[]')
    if (isSelected) {
      selected.splice(selected.indexOf(data.code), 1)
      Toast.success('已取消自选', 0.5)
      setIsSelected(false)
    } else {
      selected.push(data.code)
      Toast.success('已添加自选', 0.5)
      setIsSelected(true)
    }
    localStorage.setItem('fund-selected', JSON.stringify(selected))
  }

  const { manager = {} } = data
  const fmtlastMonthGrowth = fmtRate(data.lastMonthGrowth)
  const fmtlastThreeMonthsGrowth = fmtRate(data.lastThreeMonthsGrowth)
  const fmtlastSixMonthsGrowth = fmtRate(data.lastSixMonthsGrowth)
  const fmtlastYearGrowth = fmtRate(data.lastYearGrowth)
  return (
    <div className={sbx('page-fund-detail')}>
      <Helmet>
        <title>产品详情</title>
      </Helmet>
      <div className={sbx('block-overview')}>
        <div className={sbx('name')}>{data.name}</div>
        <div className={sbx('sub-info')}>
          <span>{data.code}</span>
          <span className={sbx('type')}>{data.type}</span>
        </div>
        <div className={sbx('rate-container')}>
          <div className={sbx('year')} style={{ color: yearFmt.color }}>
            {yearFmt.text}
          </div>
          <div className={sbx('day')} style={{ color: dayFmt.color }}>
            {dayFmt.text}
          </div>
        </div>
        <div className={sbx('text-container')}>
          <span className={sbx('text')}>日涨跌幅</span>
          <span className={sbx('text')}>净值</span>
        </div>
      </div>

      <div className={sbx('block-overview')}>
        <div className={sbx('title')}>历史业绩</div>
        <div className={sbx('history-item')}>
          近一月：
          <span style={{ color: fmtlastMonthGrowth.color }}>
            {fmtlastMonthGrowth.text}
          </span>
        </div>
        <div className={sbx('history-item')}>
          近三月：
          <span style={{ color: fmtlastThreeMonthsGrowth.color }}>
            {fmtlastThreeMonthsGrowth.text}
          </span>
        </div>
        <div className={sbx('history-item')}>
          近六月：
          <span style={{ color: fmtlastSixMonthsGrowth.color }}>
            {fmtlastSixMonthsGrowth.text}
          </span>
        </div>
        <div className={sbx('history-item')}>
          近一年：
          <span style={{ color: fmtlastYearGrowth.color }}>
            {fmtlastYearGrowth.text}
          </span>
        </div>
      </div>

      <div className={sbx('block-overview')}>
        <div className={sbx('title')}>经理</div>
        <div className={sbx('manager')}>{manager.manager}</div>
        <div className={sbx('work')}>从业{manager.workTime}</div>
        <div className={sbx('fund-size')}>管理规模：{manager.fundSize}</div>
        <img className={sbx('avatar')} src={manager.faceImg} />
      </div>
      {/* <div className={sbx('block-chart')}>
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
      </div> */}
      <div className={sbx('btn-wrapper')}>
        <Button type="primary" onClick={handleSelect}>
          {isSelected ? '取消自选' : '添加自选'}
        </Button>
      </div>
    </div>
  )
}

FundDetail.getInitialProps = async ({ isServer, history, store }) => {
  let code = null
  if (isServer) {
    code = history.location.query.code
  } else {
    code = new URLSearchParams(window.location.search).get('code')
  }
  const { dispatch, getState } = store
  await dispatch({
    type: 'detail/fetchDetail',
    payload: {
      code,
      startDate: dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
      endDate: dayjs().format('YYYY-MM-DD'),
    },
  })
  return getState()
}
