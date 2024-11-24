import { Menu } from "@/components/Menu";
import { AuthVerification } from "@/contexts/AuthVerification";
import { Outlet } from "react-router-dom";
export function AppLayout() {
  return (
    <AuthVerification>
      <Menu />
      <div className="flex-1 w-full h-full">
        <Outlet />
      </div>
    </AuthVerification>
  )
}
