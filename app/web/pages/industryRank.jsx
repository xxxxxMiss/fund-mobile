import { get } from 'utils/request'
import { fmtRate, fmtNumber } from 'utils/format'
import BScroll from '@better-scroll/core'
import { useEffect, useRef } from 'react'
export default function IndustryRank(props) {
  const scrollerRef = useRef(null)
  const elRef = useRef(null)
  useEffect(() => {
    const bs = (scrollerRef.current = new BScroll(elRef.current, {
      scrollX: true,
      scrollY: false,
      eventPassthrough: 'vertical',
    }))
    return () => {
      bs.destroy()
    }
  }, [])
  return (
    <div className={sbx('page-industry')}>
      <div className={sbx('fixed-panel')}>
        <div className={sbx('list-item')}>板块名称</div>
        {(props.fixedList || []).map(item => {
          return (
            <div className={sbx('list-item')} key={item.code}>
              <div className={sbx('name')}>{item.name}</div>
              <div className={sbx('desc-row')}>{item.code}</div>
            </div>
          )
        })}
      </div>
      <div className={sbx('scroll-panel')} ref={elRef}>
        <div className={sbx('scroller-wrapper')}>
          <div className={sbx('list-item')}>
            <div className={sbx('item')}>最新价格</div>
            <div className={sbx('item')}>涨跌额</div>
            <div className={sbx('item')}>涨跌幅度</div>
            <div className={sbx('item')}>成交量</div>
          </div>
          {(props.list || []).map(item => {
            const { text, color } = fmtRate(item.changePercent)
            const averagePrice = fmtNumber(item.averagePrice)
            const priceChange = fmtNumber(item.priceChange)
            const turnover = fmtNumber(item.turnover)
            return (
              <div className={sbx('list-item')} key={item.code}>
                <div
                  className={sbx('item')}
                  style={{ color: averagePrice.color }}
                >
                  {averagePrice.text}
                </div>
                <div
                  className={sbx('item')}
                  style={{ color: priceChange.color }}
                >
                  {priceChange.text}
                </div>
                <div className={sbx('item')} style={{ color }}>
                  {text}
                </div>
                <div className={sbx('item')} style={{ color: turnover.color }}>
                  {turnover.text}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

IndustryRank.getInitialProps = async () => {
  const res = await get('/v1/stock/industry/rank')
  return { ...res }
}
