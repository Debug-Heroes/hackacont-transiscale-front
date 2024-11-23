import { ComponentProps, forwardRef } from "react"

interface InputProps extends ComponentProps<'input'> {
  label: string
}


export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, ...rest }, ref) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={rest.id}>{label}</label>
      <input {...rest} className="rounded-sm p-2 border border-transparent focus:border focus:border-gray-500/40" id={rest.id} ref={ref} />
    </div>
  )
})
