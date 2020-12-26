import { TabBar, NavBar, Icon } from 'antd-mobile'
import { useHistory } from 'umi'
import { useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { MyIcon } from 'components/MyIcon'
dayjs.locale('zh-cn')

export default function AppLayout(props) {
  const history = useHistory()
  const [selectedKey, setSelectedKey] = useState(
    history.location?.query?.key || 'rank'
  )
  const gotoPage = (path, key) => {
    history.push(path + '?key=' + key)
    setSelectedKey(key)
  }
  return (
    <div className={sbx('app-layout')}>
      <div className={sbx('navbar-container')}>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => history.goBack()}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >
          NavBar
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
          >
            <span>Friend</span>
          </TabBar.Item>
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
