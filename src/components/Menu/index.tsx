import { api } from "@/lib/axios";
import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from '@/assets/logo.svg'
import { LinkMenu } from "./LinkMenu";
export function Menu() {
  const navigate = useNavigate()
  function logOut() {
    api.defaults.headers.common = { 'Authorization': `bearer ` }
    sessionStorage.clear()
    navigate('/')
  }
  return (
    <nav className="flex w-full shadow-2xl p-4">
      <div className="flex w-full max-w-[1280px] mx-auto justify-between items-center">
        <Link to={'/'}>
          <img className="size-[62px]" src={logoImg} alt="" />
        </Link>
        <div className="flex gap-8">
          <LinkMenu to={'/'}>Home</LinkMenu>
          <LinkMenu to={'/simulation'}>Simulação</LinkMenu>
          <div>
            <LogOut className="cursor-pointer" onClick={logOut} />
          </div>
        </div>
      </div>
    </nav>
  )
}
