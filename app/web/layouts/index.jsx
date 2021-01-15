import { TabBar, NavBar, Icon, List, InputItem } from 'antd-mobile'
import { useHistory, useLocation } from 'umi'
import { useState, useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { MyIcon } from 'components/MyIcon'
dayjs.locale('zh-cn')

const getTitle = location => {
  let title = ''
  switch (location.pathname) {
    case '/':
      title = '基金排行'
      break
    case '/detail':
      title = '产品详情'
      break
    case '/industryRank':
      title = '行业板块'
      break
    case '/mine':
      title = '自选'
      break
    case '/dashboard':
      title = '大盘指数'
      break
    default:
      break
  }
  return title
}

export default function AppLayout(props) {
  const history = useHistory()
  const location = useLocation()
  const [selectedKey, setSelectedKey] = useState(
    history.location?.query?.key || 'rank'
  )
  const [inSearch, setInSearch] = useState(false)
  const [value, setValue] = useState('')
  const inputRef = useRef(null)
  const gotoPage = (path, key) => {
    history.push(path + '?key=' + key)
    setSelectedKey(key)
  }

  const handleSearch = value => {
    history.push(`/detail?code=${value}`)
  }

  useEffect(() => {
    setInSearch(false)
  }, [location.pathname])

  useEffect(() => {
    if (inSearch) inputRef?.current?.focus()
  }, [inSearch])

  // TODO: fix it
  // temp resolved
  return (
    <div className={sbx('app-layout')}>
      <div className={sbx('navbar-container')}>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => history.goBack()}
          rightContent={[
            <Icon
              key="0"
              onClick={() => {
                setInSearch(true)
              }}
              type="search"
              style={{ marginRight: '16px' }}
            />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >
          {inSearch ? (
            <List>
              <InputItem
                ref={inputRef}
                clear
                onChange={value => setValue(value)}
                value={value}
                placeholder="基金代码"
                onVirtualKeyboardConfirm={handleSearch}
              />
            </List>
          ) : (
            getTitle(location)
          )}
        </NavBar>
      </div>
      {props.children}
      <div className={sbx('tabbar-container')}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
        >
          <TabBar.Item
            title="基金排行"
            key="rank"
            icon={<MyIcon type="icon-pic" />}
            selectedIcon={<MyIcon type="icon-pic-fill" />}
            onPress={() => gotoPage('/', 'rank')}
            selected={selectedKey === 'rank'}
          ></TabBar.Item>
          <TabBar.Item
            icon={<MyIcon type="icon-all" />}
            selectedIcon={<MyIcon type="icon-all-fill" />}
            title="行业板块"
            key="industry"
            onPress={() => gotoPage('/industryRank', 'industry')}
            selected={selectedKey === 'industry'}
          ></TabBar.Item>
          <TabBar.Item
            icon={<MyIcon type="icon-integral" />}
            selectedIcon={<MyIcon type="icon-integral-fill" />}
            title="大盘指数"
            key="dashboard"
            onPress={() => gotoPage('/dashboard', 'dashboard')}
            selected={selectedKey === 'dashboard'}
          ></TabBar.Item>
          <TabBar.Item
            icon={<MyIcon type="icon-add-cart" />}
            selectedIcon={<MyIcon type="icon-add-cart-fill" />}
            selected={selectedKey === 'mine'}
            onPress={() => gotoPage('/mine', 'mine')}
            title="自选"
            key="mine"
          ></TabBar.Item>
        </TabBar>
      </div>
    </div>
  )
}
