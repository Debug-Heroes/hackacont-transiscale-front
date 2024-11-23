import { AuthVerification } from "@/contexts/AuthVerification";
import { Outlet } from "react-router-dom";
export function AppLayout() {
  return (
    // <AuthVerification>
    <div className="flex justify-center items-center w-full h-screen ">
      <div className="flex-1 w-full h-full">
        <Outlet />
      </div>
    </div>
    // </AuthVerification>
  )
}
