import { api } from "@/lib/axios"

interface RegisterEmployeesRequest {
  name: string
  role: string
  current_weekly_hours: number
  current_working_days : number
  weekly_productivity : number
}

interface RegisterEmployeesResponse {

}
export async function registerEmployees({name, role, current_weekly_hours, current_working_days, weekly_productivity}: RegisterEmployeesRequest){
  const response = await api.post<RegisterEmployeesResponse>('/employee', {
  name,
  role, 
  current_weekly_hours, 
  current_working_days, 
  weekly_productivity: (weekly_productivity).toFixed(2),

  })

  return response.data
}
