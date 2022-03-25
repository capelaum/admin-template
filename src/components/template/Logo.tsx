import Image from 'next/image'

interface LogoProps {
  alt: string
  src: StaticImageData
}

export function Logo({ alt, src }: LogoProps) {
  return (
    <div
      className="
        w-full h-20
        flex flex-col items-center justify-center
        px-2
      "
    >
      <Image src={src} alt={alt} width={50} height={50} />
    </div>
  )
}
