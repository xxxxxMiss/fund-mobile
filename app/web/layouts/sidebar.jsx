import { List, Checkbox, Modal, Toast } from 'antd-mobile'
import { useState, useCallback, useEffect } from 'react'
import { changeConfig } from 'components/AppContext'
import { MyIcon } from 'components/MyIcon'
const { CheckboxItem } = Checkbox

export default function Sidebar() {
  const [config, setConfig] = useState({})

  useEffect(() => {
    // init at here for ssr
    const cfg = JSON.parse(localStorage.getItem('fund-config') || '{}')
    setConfig(cfg)
  }, [])

  const handleChange = useCallback((key, e) => {
    setConfig(prev => {
      const newConfig = { ...prev, [key]: e.target.checked }
      localStorage.setItem('fund-config', JSON.stringify(newConfig))
      changeConfig(newConfig)
      return newConfig
    })
  }, [])

  const clearCache = useCallback(() => {
    Modal.alert('清除缓存', '操作不可恢复，确定要清除吗？', [
      {
        text: '确定',
        onPress: () => {
          localStorage.clear()
          Toast.success('清除成功')
        },
      },
      {
        text: '取消',
      },
    ])
  }, [])

  return (
    <div className={sbx('sidebar-wrapper')}>
      <List renderHeader="自定义配置">
        <CheckboxItem
          checked={config.disabledHoldShare}
          onChange={e => handleChange('disabledHoldShare', e)}
        >
          锁定份额编辑
        </CheckboxItem>
        <List.Item
          thumb={<MyIcon type="icon-clear" />}
          arrow="horizontal"
          onClick={clearCache}
        >
          清除份额等缓存
        </List.Item>
      </List>
    </div>
  )
}
