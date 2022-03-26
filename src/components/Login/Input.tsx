interface InputProps {
  type: 'text' | 'email' | 'password'
  label: string
  name: string
  value: string
  placeholder: string
  required?: boolean
  onChange: (newValue: string) => void
}

export function Input({
  name,
  label,
  type,
  value,
  placeholder,
  onChange,
  required,
}: InputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="pl-1 text-indigo-700 font-semibold">
        {label}
      </label>
      <input
        name={name}
        type={type ?? 'text'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="
          px-4 py-3 rounded-lg
          bg-gray-200 text-gray-700
          text-sm sm:text-lg
          border focus:border-indigo-400 focus:outline-none focus:bg-white
        "
      />
    </div>
  )
}
