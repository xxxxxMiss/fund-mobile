import { get } from 'utils/request'
import { InputItem } from 'antd-mobile'
import { fmtRate, fmtNumber } from 'utils/format'
import { getEvaluateProfit } from 'utils/calc'
import { useState, useEffect, useRef, useCallback, useContext } from 'react'
import AppContext from 'components/AppContext'
import { useHistory, useLocation } from 'umi'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

const Mine = () => {
  const [list, setList] = useState([])
  const [calcData, setCalcData] = useState({})
  const [totalProfit, setTotalProfit] = useState(0)
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const timerRef = useRef(null)
  const keyboardRef = useRef(null)
  const history = useHistory()
  const location = useLocation()
  const config = useContext(AppContext)
  const [isEmpty, setIsEmtpy] = useState(false)

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
    // back this page from auth
    const { token } = location.query || {}
    const restore = () => {
      return get('/v1/config/restore', {
        params: {
          token,
        },
      }).then(res => {
        if (res) {
          localStorage.setItem(
            'fund-selected',
            JSON.stringify(res.fundCode || [])
          )
          localStorage.setItem('fund-hold', JSON.stringify(res.holdShare || {}))
        }
      })
    }
    const fetchMyFund = () => {
      const selected = JSON.parse(localStorage.getItem('fund-selected') || '[]')
      if (!selected.length) {
        setIsEmtpy(true)
        return
      }
      get('/v1/fund/getMyFund', {
        showLoading: false,
        params: {
          code: selected.join(','),
        },
      }).then(list => {
        if (list && list.length) {
          setList(list)
          getData(list)
        } else {
          setIsEmtpy(true)
        }
      })
    }
    if (token) {
      restore().then(fetchMyFund)
    } else {
      fetchMyFund()
    }
    timerRef.current = setInterval(() => {
      if (
        0 < dayjs().day() &&
        dayjs().day() < 6 &&
        (dayjs().isBetween(
          dayjs().hour(9).minute(30),
          dayjs().hour(11).minute(30),
          'hour',
          '[]'
        ) ||
          dayjs().isBetween(
            dayjs().hour(13),
            dayjs().hour(15),
            'hour',
            '[]'
          )) &&
        !keyboardVisible
      ) {
        fetchMyFund()
      }
    }, 3000)
    return () => {
      clearInterval(timerRef.current)
    }
  }, [])

  const handleBlur = useCallback(() => {
    const data = {}
    Object.keys(calcData).forEach(code => {
      data[code] = calcData[code][0]
    })
    localStorage.setItem('fund-hold', JSON.stringify(data))
    setKeyboardVisible(false)
  }, [calcData])

  useEffect(() => {
    let sum = 0
    Object.keys(calcData).forEach(code => {
      let num = Number(calcData[code]?.[1] || 0)
      if (Number.isNaN(num)) {
        num = 0
      }
      sum += num
    })
    const { text } = fmtNumber(sum.toFixed(2), false, config.enableCheat)
    setTotalProfit(text)
  }, [calcData, config.enableCheat])

  useEffect(() => {
    keyboardRef.current = document.getElementById(
      'am-number-keyboard-container'
    )
    if (keyboardRef.current && !keyboardVisible) {
      keyboardRef.current.remove()
    }
  }, [keyboardVisible])

  return (
    <div className={sbx('page-mine')}>
      {!isEmpty && (
        <>
          <div className={sbx('profit-overview')}>
            <div className={sbx('profit-row')}>
              <span>预估收益：</span>
              <span className={sbx('profit')}>
                {config.hiddenProfit ? '***' : totalProfit}
              </span>
            </div>
          </div>
          <div className={sbx('list')}>
            {list.map(item => {
              const { text: expectGrowth, color } = fmtRate(item.expectGrowth, {
                isCheat: config.enableCheat,
              })
              const fmtProfit = fmtNumber(
                calcData[item.code]?.[1],
                false,
                config.enableCheat
              )

              return (
                <div className={sbx('card')} key={item.code}>
                  <div
                    onClick={() => history.push(`/detail?code=${item.code}`)}
                  >
                    <h3 className={sbx('name')}>
                      {item.name}
                      <span className={sbx('code')}>{item.code}</span>
                    </h3>
                    <div className={sbx('row-text')}>
                      <span>持有份额</span>
                      <span>估算涨幅</span>
                      <span>估算收益</span>
                    </div>
                  </div>
                  <div className={sbx('row-num')}>
                    <span>
                      <InputItem
                        disabled={config.disabledHoldShare}
                        type="money"
                        moneyKeyboardAlign="left"
                        autoAdjustHeight
                        onBlur={handleBlur}
                        onVirtualKeyboardConfirm={() => {
                          setKeyboardVisible(false)
                        }}
                        onFocus={() => {
                          setKeyboardVisible(true)
                        }}
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
                      {config.hiddenProfit ? '***' : fmtProfit.text}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
      {isEmpty && (
        <div className={sbx('empty-container')}>
          <div className={sbx('empty-text')}>暂无自选</div>
          <div className={sbx('select-tips')}>
            您可以点击右上角搜索按钮添加自选，
            <br />
            或者登录同步PC端数据
          </div>
          <div
            className={sbx('btn-login')}
            onClick={() => history.push('/login')}
          >
            登录
          </div>
        </div>
      )}
    </div>
  )
}

export default Mine
