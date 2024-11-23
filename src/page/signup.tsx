import { Button } from "@/components/Button";
import { Input } from "@/components/Input/Input";
import InputMaskContact from '@/components/Input/InputMaskContact'
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { registerCompanies } from "@/services/infra/register-companies";
import { AxiosError } from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RegisterComponiesSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  address: z.string(),
  contact_number: z.string(),
  password: z.string().min(1),
  confirmPassword: z.string().min(1),
}).refine((data) => data.password === data.confirmPassword, {
  message: "A confirmação de senha está diferente",
  path: ["confirmPassword"]
})

type IRegisterComponies = z.infer<typeof RegisterComponiesSchema>
export function SignUp() {
  const navigate = useNavigate()
  const { handleSubmit, control, formState: {
    errors
  } } = useForm<IRegisterComponies>({
    resolver: zodResolver(RegisterComponiesSchema),
    defaultValues: {
      name: '',
      address: '',
      contact_number: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: IRegisterComponies) => registerCompanies({
      ...data
    }),
    onSuccess(data, variables, context) {
      toast.success("Sua empresa foi criada")
      navigate('/')
    },
    onError(error: AxiosError, variables, context) {
      toast.error("Sua empresa não foi criada")
    },
  })

  function handleRegisterCompanies(data: IRegisterComponies) {
    mutate({
      ...data
    })
  }
  return (
    <div className="flex justify-center items-center h-screen p-1">
      <form onSubmit={handleSubmit(handleRegisterCompanies)} action="" className="relative w-full max-w-3xl flex flex-col gap-4 w-full shadow-2xl bg-gray-100  rounded-md  p-8">
        <h2 className="text-xl font-semibold">Cadastrar empresa</h2>
        <Controller
          name="name"
          control={control}
          render={({ field }) => {
            return (
              <Input
                label="Nome"
                placeholder="Digite o seu nome"
                {...field}
              />
            )
          }}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => {
            return (
              <Input
                label="E-mail"
                placeholder="Digite o seu email"
                {...field}
              />
            )
          }}
        />
        <Controller
          name="address"
          control={control}
          render={({ field }) => {
            return (
              <Input
                label="Endereço completo"
                placeholder="Digite o seu endereço"
                {...field}
              />
            )
          }}
        />

        <Controller
          name="contact_number"
          control={control}
          render={({ field }) => {
            return (
              <InputMaskContact
                label="Contato"
                placeholder="Digite seu numero para contato"
                id="telefone"
                {...field}
              />
            )
          }}
        />

        <div className="flex justify-between gap-2">
          <Controller
            name="password"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  label="Senha"
                  type="password"
                  className="flex-1"
                  placeholder="Digite sua senha"
                  {...field}
                />
              )
            }}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  label="Confirmar senha"
                  type="password"
                  className="flex-1"
                  placeholder="Confirme sua senha"
                  {...field}
                />
              )
            }}
          />
        </div>
        <Button disabled={isPending}>
          {
            isPending ? <div className="border mx-auto border-transparent rounded-full size-6 text-center border-t-cyan-50 border-r-cyan-50 animate-spin" /> : 'Cadastrar'
          }
        </Button>
      </form>
    </div>
  )
}
