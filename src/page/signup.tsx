import { Button } from "@/components/Button";
import { Input } from "@/components/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RegisterComponiesSchema = z.object({
  name: z.string(),
  email: z.string().email().optional(),
  address: z.string().optional(),
  contact_number: z.number().optional(),
  password: z.string().min(1),
  passwordConfirm: z.string().min(1),
})

type IRegisterComponies = z.infer<typeof RegisterComponiesSchema>
export function SignUp() {

  const { register, handleSubmit } = useForm<IRegisterComponies>({
    resolver: zodResolver(RegisterComponiesSchema),
    defaultValues: {
      name: '',
      address: '',
      contact_number: NaN,
      email: '',
      password: '',
      passwordConfirm: ''
    }
  })

  return (
    <div className="flex justify-center items-center h-screen p-1">
      <form action="" className="relative flex flex-col gap-4 w-full max-w-md shadow-xl bg-blue-950 text-gray-50  rounded-md  p-8">
        <h2 className="text-xl font-semibold">Cadastrar empresa</h2>
        <Input
          label="Nome"
          placeholder="Digite o seu nome"

        />
        <Input
          label="Email"
          type="email"
          placeholder="Digite o seu email"
        />
        <Input
          label="Endereço completo"

          placeholder="Digite o seu endereço"
        />
        <Input
          label="Contato"
          type="number"
          placeholder="Digite seu numero para contato"
        />
        <Input
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
        />
        <Input
          label="Confirmar senha"
          type="password"
          placeholder="Confirme sua senha"
        />

        <Button>
          Cadastrar
        </Button>
      </form>
    </div>
  )
}
