import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonComponentProps extends ComponentProps<'button'> {
  children: ReactNode
}
export function ButtonComponent({ children, ...rest }: ButtonComponentProps) {
  return (
    <button {...rest} className={twMerge("px-2 py-3 bg-blue-700 transition-all ease-in-out duration-150 rounded-sm text-gray-50 hover:bg-blue-700/90", rest.className)}>
      {children}
    </button>
  )
}
