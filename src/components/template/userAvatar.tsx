import { images } from 'components/Assets/images'
import { useAuth } from 'contexts/AuthContext'
import Image from 'next/image'
import Link from 'next/link'

export function UserAvatar() {
  const { user } = useAuth()
  console.log('🚀 ~ user', user)

  const photoURL = user?.photoURL ?? images.avatarDefault

  return (
    <Link href="/profile" passHref>
      <div
        className="
        w-8 h-8 sm:w-10 sm:h-10
        rounded-full cursor-pointer
        relative overflow-hidden
        drop-shadow-md
        border-2
        border-gray-400
        dark:border-gray-200
      "
      >
        <Image src={photoURL} alt="User Avatar" layout="fill" />
      </div>
    </Link>
  )
}
