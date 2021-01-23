import { InputItem, List, Button, Toast } from 'antd-mobile'
import { MyIcon } from 'components/MyIcon'
import { useState, useCallback } from 'react'
import { post } from 'utils/request'
import { useHistory } from 'umi'

export default function Login() {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [inputType, setInputType] = useState('password')
  const history = useHistory()

  const login = useCallback(() => {
    post('/v1/fund/login', {
      account,
      password,
    }).then(res => {
      if (res) {
        localStorage.setItem(
          'fund-selected',
          JSON.stringify(res.fundCode || [])
        )
        localStorage.setItem('fund-hold', JSON.stringify(res.holdShare || {}))
        Toast.success('登录成功')
        history.replace('/mine')
      }
    })
  }, [account, password])

  const switchIcon = useCallback(() => {
    if (inputType === 'password') {
      setInputType('text')
    } else {
      setInputType('password')
    }
  }, [inputType])

  return (
    <div className={sbx('page-login')}>
      <List renderHeader={() => '登录同步PC数据'}>
        <InputItem
          placeholder="账号"
          value={account}
          onChange={val => setAccount(val)}
        >
          <MyIcon type="icon-add-account" />
        </InputItem>
        <InputItem
          placeholder="密码"
          value={password}
          onChange={val => setPassword(val)}
          type={inputType}
          extra={
            inputType === 'password' ? (
              <MyIcon type="icon-visible" onClick={switchIcon} />
            ) : (
              <MyIcon type="icon-hidden" onClick={switchIcon} />
            )
          }
        >
          <MyIcon type="icon-password" />
        </InputItem>
      </List>

      <Button onClick={login} disabled={!account || !password}>
        登录
      </Button>
    </div>
  )
}
