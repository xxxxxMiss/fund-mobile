import { InputItem, List, Button, Toast } from 'antd-mobile'
import { MyIcon } from 'components/MyIcon'
import { useState, useCallback } from 'react'
import { post, get } from 'utils/request'
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
        Toast.success('登录成功', 0.5)
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

  const handleAuth = useCallback(type => {
    get('/v1/fund/auth', {
      params: {
        type,
      },
    }).then(authUrl => {
      if (authUrl) window.location.href = authUrl
    })
  }, [])

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
      <div className={sbx('auth-login')}>
        <div className={sbx('auth-tips')}>三方登录</div>
        <span className={sbx('link')} onClick={() => handleAuth('qq')}>
          <MyIcon type="icon-qq" />
        </span>
        <span className={sbx('link')} onClick={() => handleAuth('github')}>
          <MyIcon type="icon-github" />
        </span>
        <span className={sbx('link')} onClick={() => handleAuth('gitee')}>
          <MyIcon type="icon-gitee" />
        </span>
      </div>
    </div>
  )
}
