import { useMutation } from "@tanstack/react-query";
import { Button } from "../Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { registerEmployees } from "@/services/infra/register-employees";
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../Input/Input";

const EmployeesSchema = z.object({
  name: z.string()
})

type EmployeesSchemaType = z.infer<typeof EmployeesSchema>
export function RegisterEmployees() {
  const { handleSubmit, control } = useForm<EmployeesSchemaType>({
    resolver: zodResolver(EmployeesSchema),
    defaultValues: {
      name: ''
    }
  })

  const { mutate } = useMutation({
    mutationFn: (data: EmployeesSchemaType) => registerEmployees({
      name: data.name
    })
  })

  function handleRegisterEmployees(data: EmployeesSchemaType) {
    const { name } = data

    mutate({
      name
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
                    label="Name"
                    placeholder="Enter the name"
                    {...field}
                  />
                )
              }}

            />
            <Input
              label="Prod dia 6x1"
              placeholder="Prod dia 6x1"
            />
            <Input
              label="Prod dia 4x3"
              placeholder="Prod dia 4x3"
              type="number"
              min={1}
            />
            <Input
              label="horas_trabalhadas"
              placeholder="horas_trabalhadas"
              type="number"
              min={1}
            />
            <Input
              label="escala_atual"
              placeholder="escala_atual"
              type="number"
              min={1}
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
