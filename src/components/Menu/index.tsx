import { api } from "@/lib/axios";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Menu() {
  const navigate = useNavigate()
  function logOut() {
    api.defaults.headers.common = { 'Authorization': `bearer ` }
    sessionStorage.clear()
    navigate('/')
  }
  return (
    <div className="flex w-full shadow-2xl p-4">
      <div className="flex w-full max-w-[1280px] mx-auto justify-between items-center">
        <div>
          LOGO
        </div>
        <div>
          <LogOut className="cursor-pointer" onClick={logOut} />
        </div>
      </div>
    </div>
  )
}
