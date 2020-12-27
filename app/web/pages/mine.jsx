import { get } from 'utils/request'
import { InputItem } from 'antd-mobile'
import { fmtRate, fmtNumber } from 'utils/format'
import { getEvaluateProfit } from 'utils/calc'
import { useState, useEffect } from 'react'

const Mine = () => {
  const [list, setList] = useState([])
  const [calcData, setCalcData] = useState({})
  const [totalProfit, setTotalProfit] = useState(0)

  const getData = list => {
    const hold = JSON.parse(localStorage.getItem('fund-hold') || '{}')
    const data = {}
    list.forEach(item => {
      const hs = hold[item.code]
      if (hs) {
        data[item.code] = [hs, getEvaluateProfit({ ...item, holdShare: hs })]
      } else {
        data[item.code] = ['', '']
      }
    })
    // {[code]: [holdShare, profit]}
    setCalcData(data)
  }

  useEffect(() => {
    get('/v1/fund/getMyFund').then(list => {
      setList(list)
      getData(list)
    })
  }, [])

  const handleBlur = () => {
    const data = {}
    Object.keys(calcData).forEach(code => {
      data[code] = calcData[code][0]
    })
    localStorage.setItem('fund-hold', JSON.stringify(data))
  }

  useEffect(() => {
    let sum = 0
    Object.keys(calcData).forEach(code => {
      sum += Number(calcData[code]?.[1] || 0)
    })
    setTotalProfit(sum)
  }, [calcData])

  return (
    <div className={sbx('page-mine')}>
      <div className={sbx('profit-overview')}>
        <div className={sbx('num-row')}>
          持有基金数：<span className={sbx('num')}>{list.length}</span>
        </div>
        <div className={sbx('profit-row')}>
          预估累计收益：<span className={sbx('profit')}>{totalProfit}</span>
        </div>
      </div>
      <div className={sbx('list')}>
        {list.map(item => {
          const { text: expectGrowth, color } = fmtRate(item.expectGrowth)
          const fmtProfit = fmtNumber(calcData[item.code]?.[1])

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
                  <InputItem
                    onBlur={handleBlur}
                    value={calcData[item.code]?.[0]}
                    onChange={val => {
                      setCalcData(prev => {
                        return {
                          ...prev,
                          [item.code]: [
                            val,
                            getEvaluateProfit({ ...item, holdShare: val }),
                          ],
                        }
                      })
                    }}
                    placeholder="请输入持有份额"
                  />
                </span>
                <span style={{ color }}>{expectGrowth}</span>
                <span
                  style={{
                    color: fmtProfit.color,
                  }}
                >
                  {fmtProfit.text}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Mine
