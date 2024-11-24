import { RegisterEmployees } from "@/components/RegisterEmployees";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllEmployees } from "@/services/infra/get-all-employees";
import { removeEmployee } from "@/services/infra/remove-employees";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import axios, { AxiosError } from 'axios'
import { queryClient } from "@/lib/react-query";
import { Employee } from "@/services/DTOS/employees";

export function Home() {

  const { data: employees } = useQuery({
    queryKey: ['employees'],
    queryFn: () => getAllEmployees({}),
  })
  const { mutate } = useMutation({
    mutationFn: (id: string) => removeEmployee({
      id
    }),
    onSuccess(_, variables, ___) {
      toast.success("O usuário foi excluído")

      const employeesCache = queryClient.getQueryData<Employee[]>(['employees'])

      if (employeesCache) {
        const employees = employeesCache.filter(employee => employee.id !== variables)
        queryClient.setQueryData(['employees'], [
          ...employees
        ])
      }
    },
    onError(error: AxiosError, __, ___) {
      if (axios.isAxiosError(error)) {

        switch (error.response?.status) {
          case 401:
            toast.error("Não autorizado. Token de autenticação inválido ou ausente.")
            break
          case 404:
            toast.error("Funcionário não encontrado.")
            break
          default:
            toast.error("Ocorreu um erro inesperado. Tente novamente.");
            break;
        }

      }
    },
  })
  function handleRemoveEmployees(id: string) {
    mutate(
      id
    )
  }
  return (
    <div className="max-w-[1280px] mx-auto px-1">
      <header className="flex justify-between items-center mt-9  ">
        <h1 className="text-2xl font-bold">Funcionários</h1>
        <RegisterEmployees />
      </header>
      <div className="h-96 overflow-y-scroll">
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
                      <Trash onClick={() => handleRemoveEmployees(employee.id)} className="cursor-pointer transition-all hover:text-red-600 hover:rotate-12 hover:scale-95" size={16} />
                    </TableCell>
                  </TableRow>
                )
              })
            }


          </TableBody>
        </Table>
      </div>
    </div>
  )
}
