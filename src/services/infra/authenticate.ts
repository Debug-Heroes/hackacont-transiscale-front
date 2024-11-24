import { api } from "@/lib/axios"

interface AuthenticateRequest {
  email: string
  password: string
}

interface AuthenticateResponse {
  accessToken: string

}
export async function authenticate(data: AuthenticateRequest){
  const { email, password} = data 
  const response = await api.post<AuthenticateResponse>('/login', { 
    email, 
    password, 
  })

  return response.data
}
