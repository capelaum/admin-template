interface TitleProps {
  title: string
  subtitle: string
}

export function Title({ title, subtitle }: TitleProps) {
  return (
    <div>
      <h1
        className="
        font-black text-xl sm:text-3xl
        text-indigo-700
        "
      >
        {title}
      </h1>
      <h2 className="font-light text-xs sm:text-sm text-gray-600 dark:text-gray-400 pt-2">
        {subtitle}
      </h2>
    </div>
  )
}
