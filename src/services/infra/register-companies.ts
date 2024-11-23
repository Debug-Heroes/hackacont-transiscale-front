import { api } from "@/lib/axios"

interface RegisterCompaniesRequest {
  name: string
  email: string
  address?: string
  contact_number: string
  password: string
  confirmPassword: string


}

interface RegisterCompaniesResponse {
  id: string
  name: string
  address: string
  contact_number?: string

}
export async function registerCompanies(data: RegisterCompaniesRequest){
  const { name, email, address, contact_number, password, confirmPassword} = data 
  const response = await api.post<RegisterCompaniesResponse>('/signup', { 
    name, 
    email, 
    address, 
    contact_number, 
    password, 
    confirmPassword
  })

  return response.data
}
