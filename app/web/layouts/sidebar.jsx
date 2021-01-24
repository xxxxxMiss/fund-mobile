import { List, Checkbox } from 'antd-mobile'
import { useState, useCallback, useEffect } from 'react'
import { changeConfig } from 'components/AppContext'
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

  return (
    <div className={sbx('sidebar-wrapper')}>
      <List renderHeader="自定义配置">
        <CheckboxItem
          checked={!!config.disabledHoldShare}
          onChange={e => handleChange('disabledHoldShare', e)}
        >
          锁定份额编辑
        </CheckboxItem>
      </List>
    </div>
  )
}
