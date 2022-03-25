import Image from 'next/image'

interface LogoProps {
  alt: string
  src: StaticImageData
}

export function Logo({ alt, src }: LogoProps) {
  return (
    <div>
      <Image src={src} alt={alt} width={50} height={50} />
    </div>
  )
}
