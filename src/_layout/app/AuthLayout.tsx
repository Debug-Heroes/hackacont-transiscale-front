import { AuthVerification } from "@/contexts/AuthVerification";
import { Outlet } from "react-router-dom";
export function AuthLayout() {
  return (
    // <AuthVerification>
    <Outlet />
    // </AuthVerification>
  )
}
