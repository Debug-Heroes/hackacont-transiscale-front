import { useMutation } from "@tanstack/react-query";
import { Button } from "../Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { registerEmployees } from "@/services/infra/register-employees";
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../Input/Input";
import { toast } from "sonner";

const EmployeesSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  current_weekly_hours: z.coerce.number(),
  current_working_days: z.coerce.number(),
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
    onSuccess(_, variables, ___) {
      toast.success(`Funcionário ${variables.name} foi criado`)
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
                    label="Horas semanais atuais"
                    type="number"
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
