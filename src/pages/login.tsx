import { images } from 'components/Assets/images'
import { Button } from 'components/Login/Button'
import { Input } from 'components/Login/Input'
import Image from 'next/image'
import { useState } from 'react'

export default function Login() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function submit() {
    if (mode === 'login') {
      console.log('login')
    }

    if (mode === 'register') {
      console.log('register')
    }
  }

  return (
    <div className="h-screen w-full grid place-items-center bg-gradient-to-br from-purple-600 to-blue-500">
      <div
        className="
        w-64 sm:w-1/2 sm:max-w-lg flex flex-col gap-4 sm:gap-6
        p-5 mx-2
        rounded-2xl
        bg-gray-100
        box-shadow-xl
      "
      >
        <h1 className="text-md sm:text-2xl font-bold mb-2 sm:mb-5 text-indigo-700 text-center">
          {mode === 'login' ? 'Entre com a sua conta' : 'Faça seu Cadastro'}
        </h1>

        <Input
          name="email"
          type="email"
          label="Email"
          value={email}
          placeholder="Email"
          onChange={setEmail}
          required
        />

        <Input
          name="password"
          type="password"
          label="Password"
          value={password}
          placeholder="Password"
          onChange={setPassword}
          required
        />

        <div className="flex flex-col items-center w-full mt-4">
          <Button submit={submit} variant="blue">
            {mode === 'login' ? 'Entrar' : 'Cadastrar'}
          </Button>

          <Button submit={submit} variant="red">
            <Image src={images.google_icon} alt="Google Icon" />
            <span className="ml-2 sm:ml-4">Entrar com Google</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
