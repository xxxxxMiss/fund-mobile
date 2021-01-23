import { List, Checkbox } from 'antd-mobile'
import { useState, useCallback, useEffect } from 'react'
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
      return newConfig
    })
  }, [])

  return (
    <div className={sbx('sidebar-wrapper')}>
      <List renderHeader="自定义配置">
        <CheckboxItem
          checked={!!config.editHoldShare}
          onChange={e => handleChange('editHoldShare', e)}
        >
          开启/锁定份额编辑
        </CheckboxItem>
      </List>
    </div>
  )
}
