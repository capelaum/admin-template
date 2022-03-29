import { images } from 'components/Assets/images'
import { Input } from 'components/Profile/Input'
import { Layout } from 'components/template/Layout'
import { useAuth } from 'contexts/AuthContext'
import { UserProfile } from 'models/User'
import Head from 'next/head'
import Image from 'next/image'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { updateUserProfile } from 'services/users'
import { useHover } from 'usehooks-ts'
import { showToastError } from 'utils/toasts'

export default function Profile() {
  const { user, setUser } = useAuth()
  const [email, setEmail] = useState(user?.email ?? '')
  const [name, setName] = useState(user?.name ?? '')

  const [imageSrc, setImageSrc] = useState<string>()

  const photoURL = user?.photoURL ?? images.avatarDefault

  const labelRef = useRef(null)
  const isHoveringLabel = useHover(labelRef)

  useEffect(() => {
    if (user) {
      setEmail(user.email ?? '')
      setName(user.name ?? '')
    }
  }, [user])

  function handleOnChangeAvatar(avatarInput: HTMLInputElement) {
    console.log('🚀 ~ avatarInput', avatarInput)
    const reader = new FileReader()

    reader.onload = (onLoadEvent) => {
      setImageSrc(String(onLoadEvent.target?.result))
    }

    const files = avatarInput.files as FileList
    reader.readAsDataURL(files[0])
  }

  function setUploadAvatarImageFormData(form: HTMLFormElement) {
    const formElements = Array.from(form.elements) as HTMLInputElement[]

    const avatarInput = formElements.find(
      ({ name }) => name === 'avatar'
    ) as HTMLInputElement

    const files = avatarInput.files as FileList

    const formData = new FormData()

    Array.from(files).forEach((file) => formData.append('file', file))

    formData.append('upload_preset', 'admin-uploads')

    return formData
  }

  async function uploadAvatarImage(
    uploadAvatarFormData: FormData
  ): Promise<{ secure_url: string } | null> {
    try {
      const data = await fetch(
        'https://api.cloudinary.com/v1_1/capelaum/image/upload',
        {
          method: 'POST',
          body: uploadAvatarFormData
        }
      ).then((res) => res.json())

      console.log('data', data)

      return data
    } catch (error) {
      showToastError('An error occurred while uploading profile image')
      return null
    }
  }

  async function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!name || name.trim() === '') {
      showToastError('Name is required')
      return
    }

    const updatedUser: UserProfile = {}

    if (name !== user?.name) {
      updatedUser.displayName = name
    }

    const uploadAvatarFormData = setUploadAvatarImageFormData(
      event.currentTarget
    )

    const data = await uploadAvatarImage(uploadAvatarFormData)

    if (data) {
      setImageSrc(data.secure_url)
      updatedUser.photoURL = data.secure_url
    }

    await updateUserProfile(updatedUser)

    if (user) setUser({ ...user, ...updatedUser })
  }

  return (
    <>
      <Head>
        <title>Admin | Profile</title>
        <meta name="description" content="Update your profile" />
      </Head>
      <Layout title="Profile" subtitle="Manage your profile info">
        <form className="flex flex-col" method="post" onSubmit={handleOnSubmit}>
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
              disabled
            />
          </div>

          <div
            className="
              flex flex-col items-center justify-center
              mt-12
            "
          >
            <input
              type="file"
              name="avatar"
              id="avatar"
              className="hidden"
              onChange={(e) => handleOnChangeAvatar(e.target)}
            />
            <label
              ref={labelRef}
              htmlFor="avatar"
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
                src={imageSrc ?? photoURL}
                alt="User Avatar"
                layout="fill"
                objectFit="cover"
              />
            </label>

            <button
              className="
              mt-10
              flex items-center justify-center
              bg-gradient-to-br hover:bg-gradient-to-bl
              from-purple-600 to-blue-700 text-white
              focus:ring-2 focus:outline-none focus:ring-blue-300
              dark:focus:ring-blue-800
              font-medium rounded-lg
              mr-2 mb-4
              px-5 py-2.5
              text-sm sm:text-lg text-center
              transition-all duration-300
            "
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </Layout>
    </>
  )
}
