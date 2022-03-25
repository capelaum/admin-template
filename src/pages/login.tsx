import { Input } from 'components/Login/Input'
import { useState } from 'react'

export default function Login() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="flex flex-col gap-4">
      <h1>Login</h1>

      <Input
        name="email"
        type="email"
        label="Email"
        value={email}
        onChange={setEmail}
        required
      />

      <Input
        name="password"
        type="password"
        label="Password"
        value={password}
        onChange={setPassword}
        required
      />
    </div>
  )
}
