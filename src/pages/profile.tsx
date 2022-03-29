import { images } from 'components/Assets/images'
import { Input } from 'components/template/Input'
import { Layout } from 'components/template/Layout'
import { useAuth } from 'contexts/AuthContext'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useHover } from 'usehooks-ts'

export default function Profile() {
  const { user } = useAuth()
  const [email, setEmail] = useState(user?.email ?? '')
  const [name, setName] = useState(user?.name ?? '')

  const photoURL = user?.photoURL ?? images.avatarDefault

  const labelRef = useRef(null)
  const isHoveringLabel = useHover(labelRef)

  useEffect(() => {
    if (user) {
      setEmail(user.email ?? '')
      setName(user.name ?? '')
    }
  }, [user])

  return (
    <Layout title="Profile" subtitle="Manage your profile info">
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <Input
            name="name"
            type="text"
            label="Name"
            value={name}
            placeholder="Name"
            onChange={setName}
            required
          />

          <Input
            name="email"
            type="email"
            label="Email"
            value={email}
            placeholder="Email"
            onChange={setEmail}
            required
          />
        </div>

        <div
          className="
            flex flex-col items-center justify-center
            mt-12
          "
        >
          <input type="file" name="uploadfile" id="img" className="hidden" />
          <label
            ref={labelRef}
            htmlFor="img"
            className="
              cursor-pointer
              relative w-32 h-32 sm:h-48 sm:w-48
              rounded-full
              overflow-hidden
              drop-shadow-md
              border-2 border-gray-400 dark:border-gray-200
            hover:border-indigo-700 hover:dark:border-indigo-700
            "
            title="Change profile picture"
          >
            <div
              className={`
                absolute top-0 right-0 bottom-0 left-0
                bg-indigo-700 bg-opacity-70
                z-10
                flex items-center justify-center
                text-xs text-center text-white
                transition-all duration-300
                ${isHoveringLabel ? 'block' : 'hidden'}
              `}
            >
              Change profile picture
            </div>
            <Image
              src={photoURL}
              alt="User Avatar"
              layout="fill"
              objectFit="cover"
            />
          </label>
        </div>
      </div>
    </Layout>
  )
}
