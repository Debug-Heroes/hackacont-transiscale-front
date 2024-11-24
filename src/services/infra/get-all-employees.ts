import { api } from "@/lib/axios"

interface GetAllEmployeesRequest {
 
}

interface GetAllEmployeesResponse {
  id: string
  company_id: string
  name: string
  role: string
  current_weekly_hours: number
  current_working_days: number
  weekly_productivity: string
  created_at: string
  updated_at: string
}
export async function getAllEmployees({}: GetAllEmployeesRequest){
  const response = await api.get<GetAllEmployeesResponse[]>(`/employee`, {


  })

  console.log(response.data)
  return response.data
}
