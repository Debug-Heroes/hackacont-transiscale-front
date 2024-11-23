import { Outlet } from "react-router-dom";
export function AppLayout() {
  return (
    <div>
      <div className="flex justify-center items-center w-full h-screen ">
        <div className="flex-1 w-full h-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
