import { ReactNode } from "react";
import { Link, LinkProps, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface LinkMenuProps extends LinkProps {
  children: ReactNode
}
export function LinkMenu({ to, children }: LinkMenuProps) {
  const { pathname } = useLocation()
  return (
    <Link className={twMerge('relative before:absolute before:transition-all  before:duration-500 before:ease-in-out before:w-[1px]  before:bg-blue-500 before:-bottom-1 hover:before:w-full hover:before:h-0.5',
      pathname === to && 'text-blue-900'
    )} to={to}>
      {children}
    </Link>
  )
}
