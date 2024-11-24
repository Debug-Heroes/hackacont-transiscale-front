import { RegisterSimulation, SimulationSchemaType } from "@/components/RegisterSimulation/RegisterSimulation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { registerSimulation } from "@/services/infra/register-simulation";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TrendingDown, TrendingUp, Users } from "lucide-react";
import { toast } from "sonner";

export function Simulation() {


  const { mutate, data } = useMutation({
    mutationKey: ["simulation"],
    mutationFn: (data: SimulationSchemaType) => registerSimulation({
      ...data
    }),
    onSuccess(_, __, ___) {
      toast.success(`Simulação gerada`)

    },
    onError(error: AxiosError, _, __) {
      switch (error.response?.status) {
        case 400:
          toast.error(`Não foi possível encontrar funcionarios. Tente novamente`)
          break
        case 401:
          toast.error(`Não foi possível gerar uma simulação. Não autorizado!`)
          break
        case 500:
          toast.error(`Aconteceu um erro interno. Tente novamente`)
          break
        default:
          toast.error(`Erro desconhecido. Tente novamente`)
          break
      }
    },
  })

  function handleRegisterEmployees(data: SimulationSchemaType) {
    const { name, original_model_type, target_model_type } = data

    mutate({
      name, original_model_type, target_model_type
    })
  }

  console.log(data)
  return (
    <div className="max-w-[1280px] mx-auto px-1">
      <header className="flex justify-between items-center mt-9  ">
        <h1 className="text-2xl font-bold">Simulação</h1>
        <RegisterSimulation handleRegisterEmployees={handleRegisterEmployees} />
      </header>
      <>
        {data ?
          <>
            <section className="flex justify-between items-center mt-8 w-full">
              <h2 className="text-xl font-medium">{data?.name}</h2>

              <div className="flex gap-2 justify-center items-center">
                <div className="block top-0 right-1.5">
                  <span title={`O deficie de funcionário é de ${data.employees_deficit}`} className="text-sm text-slate-700">{data.employees_deficit}</span>
                </div>
                <div title={`O deficie de funcionário é de ${data.employees_deficit}`}>
                  {data.employees_deficit < 0
                    ? <TrendingDown className="text-red-600" />
                    : <TrendingUp className="text-blue-600" />}
                </div>
                <Users />
                <span>{data?.total_employees}</span>
              </div>
            </section>
            <section className="flex justify-center mt-4 gap-2">

              <div className="flex  flex-col justify-center gap-2 border text-center p-4 rounded-sm">
                <h2 className="font-semibold">Tipo de modelo</h2>
                <div className="flex gap-4">
                  <span>Original: {data?.original_model_type}</span>
                  <span>Objetivo: {data?.target_model_type}</span>
                </div>
              </div>
              <div className="flex relative flex-col justify-center gap-2 border text-center p-4 rounded-sm">
                <h2 className="font-semibold">Produtividade</h2>
                <div className="flex gap-4">
                  <span>Total: {data?.total_current_productivity}</span>
                  <span>Objetivo: {data?.total_target_productivity}</span>
                </div>
                <div className="absolute top-0 right-1.5">
                  <span className="text-xs text-red-700">{data?.productivity_deficit}</span>
                </div>
              </div>
            </section>

            <div className="h-96 overflow-y-scroll">
              <Table className="w-full max-w-[1280px]  mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">ID</TableHead>
                    <TableHead className="text-center">Horas trabalhada semanal</TableHead>
                    <TableHead className="text-center">Horas trabalhada mensal</TableHead>
                    <TableHead className="text-center">Novos dias úteis</TableHead>
                    <TableHead className="text-center">Nova produtividade semanal </TableHead>
                    <TableHead className="text-center"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>

                  {
                    data?.employees.map(employee => {
                      return (
                        <TableRow>
                          <TableCell className="font-medium text-left">{employee.employee_id}</TableCell>
                          <TableCell className="text-center">{employee.hours_worked_weekly}</TableCell>
                          <TableCell className="text-center">{employee.hours_worked_monthly}</TableCell>
                          <TableCell className="text-center">{employee.new_working_days}</TableCell>
                          <TableCell className="text-center">{employee.new_weekly_productivity}</TableCell>
                        </TableRow>
                      )
                    })
                  }


                </TableBody>
              </Table>
            </div>
          </>
          :
          <span>nenhuma simulação disponível</span>
        }
      </>
    </div>
  )
}
