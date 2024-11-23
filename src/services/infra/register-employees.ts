import { api } from "@/lib/axios"

interface RegisterEmployeesRequest {
  name: string
}

interface RegisterEmployeesResponse {

}
export async function registerEmployees({name}: RegisterEmployeesRequest){
  const response = await api.post<RegisterEmployeesResponse>('/empo', {
  name
  })

  return response.data
}
