
import { Button } from "../Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../Input/Input";
import { useState } from "react";

const SimulationSchema = z.object({
  name: z.string().min(1),
  target_model_type: z.coerce.number().min(1),
  original_model_type: z.coerce.number().min(1)
})

export type SimulationSchemaType = z.infer<typeof SimulationSchema>

interface RegisterSimulationProps {
  handleRegisterEmployees: (data: SimulationSchemaType) => void
}
export function RegisterSimulation({ handleRegisterEmployees }: RegisterSimulationProps) {
  const [open, setOpen] = useState(false)
  const { handleSubmit, control, reset, formState: {
    isSubmitted
  } } = useForm<SimulationSchemaType>({
    resolver: zodResolver(SimulationSchema),
    defaultValues: {
      name: '',
      target_model_type: NaN,
      original_model_type: NaN
    }
  })

  if (isSubmitted) {
    reset()
    setOpen(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div>
            <Button>
              Realizar uma simulação
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Realizar uma simulação</DialogTitle>
            <DialogDescription>

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
                    placeholder="Inseri o nome da simulação"
                    {...field}
                  />
                )
              }}

            />

            <Controller
              name="target_model_type"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    label="Escala nova"
                    type="number"
                    placeholder="Inseri a escala nova da empresa"
                    {...field}
                  />
                )
              }}

            />

            <Controller
              name="original_model_type"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    label="Escala velha"
                    type="number"
                    placeholder="Inseri a escala velha da empresa"
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
