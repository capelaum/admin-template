import { images } from 'components/Assets/images'
import { Button } from 'components/Login/Button'
import { Input } from 'components/Login/Input'
import Image from 'next/image'
import { useState } from 'react'

export default function Login() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  function submit() {
    if (mode === 'login') {
      console.log('login')
    }

    if (mode === 'register') {
      console.log('register')
    }
  }

  function renderLoginOrRegisterOption() {
    return (
      <button
        onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
        className="text-indigo-700 hover:underline hover:decoration-solid mt-2"
      >
        {mode === 'login' ? 'Create new account' : 'Login with your account'}
      </button>
    )
  }

  return (
    <div
      className="
      h-screen w-full flex items-center justify-center px-4
      bg-[url('https://source.unsplash.com/random')] bg-no-repeat bg-cover bg-center
    "
    >
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-indigo-500 bg-opacity-50"></div>
      <div
        className="
        w-full sm:max-w-lg flex flex-col gap-4 sm:gap-6
        p-5 mx-8
        rounded-2xl
        bg-white
        box-shadow-xl
        z-10
      "
      >
        <h1 className="text-lg xs:text-2xl font-bold my-5 text-indigo-700 text-center">
          {mode === 'login' ? 'Login with your account' : 'Create new account'}
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

        <div className="flex flex-col items-center w-full my-4">
          <Button submit={submit} variant="blue">
            {mode === 'login' ? 'Login' : 'Register'}
          </Button>

          <Button submit={submit} variant="google">
            <Image src={images.google_icon} alt="Google Icon" />
            <span className="ml-2 sm:ml-4 transition-all duration-300">
              {mode === 'login' ? 'Login with Google' : 'Register with Google'}
            </span>
          </Button>

          {renderLoginOrRegisterOption()}
        </div>
      </div>
    </div>
  )
}
