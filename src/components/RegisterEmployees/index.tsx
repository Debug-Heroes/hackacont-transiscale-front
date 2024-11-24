import { useMutation } from "@tanstack/react-query";
import { Button } from "../Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { registerEmployees } from "@/services/infra/register-employees";
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../Input/Input";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import { Employee } from "@/services/DTOS/employees";

const EmployeesSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  current_weekly_hours: z.coerce.number().min(1).max(168),
  current_working_days: z.coerce.number().min(1).max(7),
  weekly_productivity: z.coerce.number()
})

type EmployeesSchemaType = z.infer<typeof EmployeesSchema>
export function RegisterEmployees() {
  const { handleSubmit, control, reset } = useForm<EmployeesSchemaType>({
    resolver: zodResolver(EmployeesSchema),
    defaultValues: {
      name: '',
      role: '',
      current_weekly_hours: NaN,
      current_working_days: NaN,
      weekly_productivity: NaN
    }
  })

  const { mutate } = useMutation({
    mutationFn: (data: EmployeesSchemaType) => registerEmployees({
      ...data
    }),
    onSuccess(data, variables, ___) {
      toast.success(`Funcionário ${variables.name} foi criado`)
      const employees = queryClient.getQueryData<Employee[]>(['employees'])

      if (employees) {
        queryClient.setQueryData(['employees'], [
          ...employees,
          data
        ])
      }

      reset()
    },
    onError(_, __, ___) {
      toast.error(`Não foi possível cadastrar um funcionário. Tente novamente`)
    },
  })

  function handleRegisterEmployees(data: EmployeesSchemaType) {
    const { name, current_weekly_hours, current_working_days, role, weekly_productivity } = data

    mutate({
      name, current_weekly_hours, current_working_days, role, weekly_productivity
    })
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <Button>
              Cadastrar funcionários
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar funcionários</DialogTitle>
            <DialogDescription>
              funcionário
            </DialogDescription>
          </DialogHeader>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleRegisterEmployees)}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    label="Nome"
                    placeholder="Inseri o nome do funcionário"
                    {...field}
                  />
                )
              }}

            />
            <Controller
              name="role"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    label="Cargo"
                    placeholder="Inseri o nome do cargo"
                    {...field}
                  />
                )
              }}

            />
            <Controller
              name="current_weekly_hours"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    label="Escala em horas semanais atuais"
                    type="number"
                    min={1}
                    max={168}
                    placeholder="Inseri as horas semanais atuais"
                    {...field}
                  />
                )
              }}

            />
            <Controller
              name="current_working_days"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    label="Dias de trabalho atuais"
                    type="number"
                    min={1}
                    max={7}
                    placeholder="Inseri os dias de trabalho atuais"
                    {...field}
                  />
                )
              }}

            />
            <Controller
              name="weekly_productivity"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    label="Produtividade semanal"
                    type="number"
                    step=".01"
                    placeholder="Inseri a produtividade semanal"
                    {...field}
                  />
                )
              }}

            />
            <Button className="mt-4">
              Registrar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
