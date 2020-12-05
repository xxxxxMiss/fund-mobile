import React, { useState, useEffect, useRef } from 'react'
import { connect, useIntl, getLocale, setLocale } from 'umi'
import { ListView, Picker, List } from 'antd-mobile'
import { post } from 'utils/request'
import { FUNDTYPES, DATERANGE } from 'utils/config'

function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
  )
}

const Home = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [pageIndex, setPageIndex] = useState(1)
  const [fundType, setFundType] = useState('hh')
  const [sort, setSort] = useState('3y')
  const [dataSource, setDataSoucre] = useState(() => {
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    return ds
  })

  useEffect(() => {
    setDataSoucre(prev => {
      return prev.cloneWithRows(props.rank)
    })
  }, [pageIndex, fundType, sort])

  const renderRow = rowData => {
    return (
      <div className={sbx('list-item')}>
        <div className={sbx('first-col')}>
          <div className={sbx('name')}>{rowData.name}</div>
          <div className={sbx('code')}>{rowData.code}</div>
        </div>
        <div className={sbx('latest-value')}>{rowData.expectWorth}</div>
        <div className={sbx('latest-rate')}>{rowData.expectGrowth}</div>
      </div>
    )
  }

  const renderHeader = () => {
    return (
      <div className={sbx('list-header')}>
        <div className={sbx('filter-type')}>
          <Picker data={FUNDTYPES} cols={1} onChange={val => setFundType(val)}>
            <span>混合型</span>
          </Picker>
        </div>
        <div className={sbx('latest-value')}>最新净值</div>
        <div className={sbx('filter-date')}>
          <Picker data={DATERANGE} cols={1} onChange={val => setSort(val)}>
            <span>近三月</span>
          </Picker>
        </div>
      </div>
    )
  }

  return (
    <div className={sbx('page-rank')}>
      <ListView
        dataSource={dataSource}
        renderHeader={renderHeader}
        renderRow={renderRow}
        pageSize={10}
        onScroll={() => {
          console.log('scroll')
        }}
        scrollRenderAheadDistance={500}
        onEndReached={() => {
          console.log('----end')
        }}
        onEndReachedThreshold={100}
        onLayout={(...args) => console.log('-----layout', args)}
        useBodyScroll
      />
    </div>
  )
}
Home.getInitialProps = async ({}) => {
  const res = await post('/api/v1/fund/rank')
  return { rank: res?.rank ?? [] }
}

export default Home
