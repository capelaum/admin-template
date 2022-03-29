import Image from 'next/image'
import { useRef } from 'react'
import { useHover } from 'usehooks-ts'

interface AvatarInputUpdateProps {
  imageSrc: string | StaticImageData
  handleOnChangeAvatar: (avatarInput: HTMLInputElement) => void
}

export function AvatarInputUpdate({
  imageSrc,
  handleOnChangeAvatar
}: AvatarInputUpdateProps) {
  const labelRef = useRef(null)
  const isHoveringLabel = useHover(labelRef)

  return (
    <>
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
          src={imageSrc}
          alt="User Avatar"
          layout="fill"
          objectFit="cover"
        />
      </label>
    </>
  )
}
