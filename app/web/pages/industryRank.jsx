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
            <div className={sbx('list-item')} key={item.indCode}>
              <div className={sbx('name')}>{item.indkName}</div>
              <div className={sbx('desc-row')}>{item.indCode}</div>
            </div>
          )
        })}
      </div>
      <div className={sbx('scroll-panel')} ref={elRef}>
        <div className={sbx('scroller-wrapper')}>
          <div className={sbx('list-item')}>
            <div className={sbx('item')}>最新价格</div>
            <div className={sbx('item')}>涨跌幅度</div>
            <div className={sbx('item')}>换手率</div>
            <div className={sbx('item')}>领涨股</div>
          </div>
          {(props.list || []).map(item => {
            // 最新价格
            const fmtPrice = fmtNumber(item.price)
            // 涨幅百分比
            const fmtGrowth = fmtRate(item.growth)
            // 换手率
            const fmtHandsRate = fmtRate(item.changeHandsRate)
            return (
              <div className={sbx('list-item')} key={item.indCode}>
                <div className={sbx('item')} style={{ color: fmtPrice.color }}>
                  {fmtPrice.text}
                </div>
                <div className={sbx('item')} style={{ color: fmtGrowth.color }}>
                  {fmtGrowth.text}
                </div>
                <div
                  className={sbx('item')}
                  style={{ color: fmtHandsRate.color }}
                >
                  {fmtHandsRate.text}
                </div>
                <div className={sbx('item')}>{item.leaderStockName}</div>
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
