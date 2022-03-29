interface InputProps {
  type?: 'text' | 'email' | 'password' | 'file'
  label: string
  name: string
  value?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  onChange?: (newValue: string) => void
}

export function Input({
  name,
  label,
  type,
  value,
  placeholder,
  onChange,
  required,
  disabled
}: InputProps) {
  return (
    <div className="flex flex-col flex-grow">
      <label htmlFor={name} className="pb-1 text-indigo-700 font-semibold">
        {label}
      </label>
      <input
        name={name}
        type={type ?? 'text'}
        value={value}
        onChange={(e) => (onChange ? onChange(e.target.value) : {})}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="
          px-2 py-2 rounded-lg
          text-sm sm:text-md
          bg-gray-200 text-gray-700
          dark:bg-gray-700 dark:text-gray-300
          focus:outline-none focus:bg-white
          dark:focus:outline-none dark:focus:bg-gray-600
        "
      />
    </div>
  )
}
