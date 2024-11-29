import { Input } from "@/components/Input/Input"
import { Spinner } from "@/components/Spinner"
import { authenticate } from "@/services/infra/authenticate"
import { useMutation } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import axios, { AxiosError } from 'axios'
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/lib/axios"
import { queryClient } from "@/lib/react-query"

const LoginSchema = z.object({
    email: z.string().email({
        message: "Por favor, insira um e-mail válido."
    }).min(1),
    password: z.string().min(1, {
        message: "A senha é obrigatória e não pode estar vazia"
    }),
})


type ILoginSchema = z.infer<typeof LoginSchema>
export function Login() {
    const navigate = useNavigate()
    const { control, handleSubmit, formState: {
        errors
    } } = useForm<ILoginSchema>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const { mutate, isPending } = useMutation({
        mutationFn: ({ email, password }: ILoginSchema) => authenticate({
            email, password
        }),
        onSuccess(data, __, ___) {
            sessionStorage.setItem('token', data.accessToken as string)
            api.defaults.headers.common = { 'Authorization': `bearer ${data.accessToken}` }
            queryClient.clear()
            navigate('/')
        },
        onError(error: AxiosError | Error, __, ___) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    toast.error("Usuário ou senha incorreta")
                }

                if (error.response?.status === 500) {
                    toast.error("Houve um erro no nosso servidor. Tente novamente mais tarde.")
                }
            }
        },
    })

    function handleAuthenticate(data: ILoginSchema) {
        mutate({
            ...data
        })
    }
    return (
        <div className="h-screen w-screen flex justify-center items-center ">
            <div className="bg-gray-100 w-full max-w-96 rounded-sm p-5 shadow-xl ">
                <h1 className="text-2xl font-semibold">Acesse sua conta</h1>
                <form onSubmit={handleSubmit(handleAuthenticate)} className="mt-5 flex flex-col gap-3">
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => {
                            return (
                                <Input label="E-mail" id="email" placeholder="Insira seu endereço de e-mail" className="bg-slate-300" {...field} />
                            )
                        }}
                    />
                    <p className="text-xs h-1 text-red-900 -mt-2">{errors?.email?.message}</p>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => {
                            return (
                                <Input label="Senha" id="password" type="password" className="bg-slate-300" placeholder="Insira sua senha" {...field} />
                            )
                        }}
                    />
                    <p className="text-xs h-1 text-red-900 -mt-2">{errors?.password?.message}</p>
                    <p className="text-xs">Não tem uma conta? <Link className="text-blue-500" to={'/signup'}>Cria uma!</Link></p>
                    <button type="submit" className="bg-blue-500 text-white p-2 w-32 rounded mx-auto m-5">
                        {isPending ? <Spinner /> : 'ENTRAR'}
                    </button>
                </form>
            </div>
        </div>
    )
}
