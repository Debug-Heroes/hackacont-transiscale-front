import { Button } from "@/components/Button";
import { Input } from "@/components/Input/Input";
import InputMaskContact from '@/components/Input/InputMaskContact'
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { registerCompanies } from "@/services/infra/register-companies";
import { AxiosError } from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { MessageError } from "@/components/MessageError/MessageError";

const RegisterComponiesSchema = z.object({
  name: z.string().min(1, {
    message: 'O nome é obrigatório'
  }),
  email: z.string().email({
    message: 'Informe um email válido.'
  }).min(1, {
    message: 'O email é obrigatório.'
  }),
  address: z.string(),
  contact_number: z.string(),
  password: z.string().min(1, {
    message: 'A senha não pode estar vazia'
  }),
  confirmPassword: z.string().min(1, {
    message: 'A confirmação da senha não pode estar vazia'
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não correspondem",
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
    onSuccess(_, __, ___) {
      toast.success("Sua empresa foi criada")
      navigate('/')
    },
    onError(error: AxiosError, _, __) {
      toast.error("Sua empresa não foi criada")
      if (error.response?.status === 404) {
        toast.error("404")
      }
    },
  })

  function handleRegisterCompanies(data: IRegisterComponies) {
    mutate({
      ...data
    })
  }
  return (
    <div className="flex justify-center items-center h-screen p-1">
      <form onSubmit={handleSubmit(handleRegisterCompanies)} action="" className="relative w-full max-w-3xl flex flex-col gap-3 shadow-2xl bg-gray-100  rounded-md  p-8">
        <h2 className="text-xl font-semibold mb-4">Cadastrar empresa</h2>
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
        <MessageError message={errors?.name?.message} />
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
        <MessageError message={errors?.email?.message} />
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

        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex-1">
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
            <MessageError message={errors?.password?.message} />
          </div>
          <div className="flex-1">
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
            <MessageError message={errors?.confirmPassword?.message} />
          </div>
        </div>
        <p className="text-xs text-right">Já possuí um login? <Link className="text-blue-500" to={'/signin'}>Entrar</Link></p>
        <Button className="mt-4 w-max px-8 mx-auto" disabled={isPending}>
          {
            isPending ? <div className="border mx-auto border-transparent rounded-full size-6 text-center border-t-cyan-50 border-r-cyan-50 animate-spin" /> : 'Cadastrar'
          }
        </Button>
      </form>
    </div>
  )
}
