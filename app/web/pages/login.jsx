import { InputItem, List, Button, Toast } from 'antd-mobile'
import { MyIcon } from 'components/MyIcon'
import { useState } from 'react'
import { post } from 'utils/request'
import { useHistory } from 'umi'

export default function Login() {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const login = () => {
    post('/v1/fund/login', {
      account,
      password,
    }).then(token => {
      localStorage.setItem('fund-token', token)
      Toast.success('登录成功')
      history.replace('/mine')
    })
  }

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
        >
          <MyIcon type="icon-password" />
        </InputItem>
      </List>

      <Button onClick={login}>登录</Button>
    </div>
  )
}
