import React, { useState, useEffect, useRef } from 'react'
import { Picker, Toast } from 'antd-mobile'
import { post } from 'utils/request'
import { FUNDTYPES, DATERANGE, FIELDS } from 'utils/config'
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import { useHistory } from 'umi'
import { fmtRate } from 'utils/format'
import { MyIcon } from 'components/MyIcon'

const Home = props => {
  const [pageIndex, setPageIndex] = useState(1)
  const [fundType, setFundType] = useState('hh')
  const [sort, setSort] = useState('3y')
  const scrollerRef = useRef(null)
  const bsRef = useRef(null)
  const helperRef = useRef({ init: true })
  const [list, setList] = useState(props.rank)
  const [counter, setCounter] = useState(0)
  const history = useHistory()

  useEffect(() => {
    BScroll.use(Pullup)
    const bs = (bsRef.current = new BScroll(scrollerRef.current, {
      pullUpLoad: true,
      click: true,
    }))

    bs.on('pullingUp', () => {
      setPageIndex(prev => prev + 1)
    })
    return () => {
      bs.destroy()
    }
  }, [])

  const fetchList = (prevList = [], { pageIndex, fundType }) => {
    return post('/v1/fund/rank', { pageIndex, fundType: [fundType] }).then(
      res => {
        setList(prevList.concat(res?.rank ?? []))
        bsRef.current.finishPullUp()
        bsRef.current.refresh()
      }
    )
  }
  useEffect(() => {
    if (helperRef.current.init) return
    fetchList(list, { pageIndex, fundType })
  }, [pageIndex, counter])

  useEffect(() => {
    if (helperRef.current.init) return
    fetchList([], { pageIndex: 1, fundType })
  }, [fundType, counter])

  useEffect(() => {
    helperRef.current.init = false
  }, [])

  // TODO: bug fix
  useEffect(() => {
    setList(props.rank)
  }, [props.rank])

  const handleSelected = async code => {
    await post('/v1/fund/add', {
      code,
    })
    Toast.success('添加成功')
    setCounter(prev => prev + 1)
  }
  const handleCancel = async code => {
    await post('/v1/fund/cancel', {
      code,
    })
    Toast.success('已取消自选')
    setCounter(prev => prev - 1)
  }

  const renderRow = row => {
    const { text, color } = fmtRate(row[FIELDS[sort]])
    return (
      <div
        className={sbx('list-item')}
        key={row.code}
        onClick={() =>
          history.push({
            pathname: '/detail',
            query: {
              code: row.code,
            },
          })
        }
      >
        <div className={sbx('first-col')}>
          <div className={sbx('name')}>{row.name}</div>
          <div className={sbx('code')}>{row.code}</div>
        </div>
        <div className={sbx('latest-value')}>{row.netWorth}</div>
        <div className={sbx('latest-rate')} style={{ color }}>
          {text}
        </div>
        <div
          className={sbx('selected')}
          onClick={e => {
            e.stopPropagation()
            if (row.isSelected) {
              handleCancel(row.code)
            } else {
              handleSelected(row.code)
            }
          }}
        >
          {row.isSelected ? (
            <MyIcon type="icon-selected" style={{ color: 'green' }} />
          ) : (
            <MyIcon type="icon-add" />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={sbx('page-rank')}>
      <div className={sbx('list-header')}>
        <div className={sbx('filter-type')}>
          <Picker
            data={FUNDTYPES}
            cols={1}
            onChange={val => setFundType(val[0])}
            onOk={val => setFundType(val[0])}
            value={[fundType]}
          >
            <span>{FUNDTYPES.find(t => t.value === fundType)?.label}</span>
          </Picker>
        </div>
        <div className={sbx('latest-value')}>最新净值</div>
        <div className={sbx('filter-date')}>
          <Picker
            data={DATERANGE}
            cols={1}
            onChange={val => setSort(val[0])}
            onOk={val => setSort(val[0])}
            value={[sort]}
          >
            <span>{DATERANGE.find(t => t.value === sort)?.label}</span>
          </Picker>
        </div>
        <div className={sbx('selected')}>自选</div>
      </div>
      <div className={sbx('wrapper')} ref={scrollerRef}>
        <div className={sbx('scroller-container')}>
          {(list || []).map(item => {
            return renderRow(item)
          })}
        </div>
      </div>
    </div>
  )
}
Home.getInitialProps = async ({}) => {
  const res = await post('/v1/fund/rank', {
    fundType: ['hh'],
    sort: '3y',
  })
  return { rank: res?.rank ?? [] }
}

export default Home
