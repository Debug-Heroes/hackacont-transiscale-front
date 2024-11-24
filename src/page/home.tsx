import { RegisterEmployees } from "@/components/RegisterEmployees";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllEmployees } from "@/services/infra/get-all-employees";
import { useQuery } from "@tanstack/react-query";
import { Trash } from "lucide-react";


export function Home() {

  const { data: employees } = useQuery({
    queryKey: ['employees'],
    queryFn: () => getAllEmployees({}),
  })

  console.log(employees)
  return (
    <div className="max-w-[1280px] mx-auto px-1">
      <header className="flex justify-between items-center mt-9  ">
        <h1 className="text-2xl font-bold">Funcionários</h1>
        <RegisterEmployees />
      </header>
      <Table className="w-full max-w-[1280px]">
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Nome</TableHead>
            <TableHead className="text-center">Cargo</TableHead>
            <TableHead className="text-center">Horas trabalhadas por semana atuais</TableHead>
            <TableHead className="text-center">Dias de trabalho atuais</TableHead>
            <TableHead className="text-center">Produtividade semanal</TableHead>
            <TableHead className="text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {
            employees?.map(employee => {
              return (
                <TableRow>
                  <TableCell className="font-medium text-left">{employee.name}</TableCell>
                  <TableCell className="text-center">{employee.role}</TableCell>
                  <TableCell className="text-center">{employee.current_weekly_hours}</TableCell>
                  <TableCell className="text-center">{employee.current_working_days}</TableCell>
                  <TableCell className="text-center">{employee.weekly_productivity}</TableCell>
                  <TableCell className="text-center">
                    <Trash className="cursor-pointer transition-all hover:text-red-600 hover:rotate-12 hover:scale-95" size={16} />
                  </TableCell>
                </TableRow>
              )
            })
          }


        </TableBody>
      </Table>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  justify-center mt-4 gap-2 text-gray-200">
        
      </div> */}
    </div>
  )
}
