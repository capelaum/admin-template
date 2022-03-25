interface InputProps {
  type: 'text' | 'email' | 'password'
  label: string
  name: string
  value: string
  required?: boolean
  onChange: (newValue: string) => void
}

export function Input({
  name,
  label,
  type,
  value,
  onChange,
  required,
}: InputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={type ?? 'text'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  )
}
