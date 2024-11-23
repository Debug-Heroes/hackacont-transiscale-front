import { CardEmployee } from "@/components/CardEmployee";
import { RegisterEmployees } from "@/components/RegisterEmployees";


export function Home() {
  return (
    <div className="max-w-[1280px] mx-auto px-1">
      <header className="flex justify-between items-center mt-9  ">
        <h1 className="text-2xl font-bold">Funcionários</h1>
        <RegisterEmployees />
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  justify-center mt-4 gap-2 text-gray-200">
        <CardEmployee variant />
        <CardEmployee />
        <CardEmployee />
        <CardEmployee />
        <CardEmployee />
        <CardEmployee />
      </div>
    </div>
  )
}
