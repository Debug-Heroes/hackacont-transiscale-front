import { ComponentProps, forwardRef } from "react"
import { twMerge } from "tailwind-merge"

interface InputProps extends ComponentProps<'input'> {
  label: string
}


export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, ...rest }, ref) => {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <label htmlFor={rest.id}>{label}</label>
      <input {...rest} className={twMerge("rounded-sm bg-gray-50 p-2 border text-black border-transparent outline-none focus:border focus:border-gray-300/90", rest.className)} id={rest.id} ref={ref} />
    </div>
  )
})
