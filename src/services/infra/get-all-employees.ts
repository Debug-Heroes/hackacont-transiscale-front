import { api } from "@/lib/axios"
import { Employee } from "../DTOS/employees"

interface GetAllEmployeesRequest {
 
}

interface GetAllEmployeesResponse extends Employee{

}
export async function getAllEmployees({}: GetAllEmployeesRequest){
  const response = await api.get<GetAllEmployeesResponse[]>(`/employee`, {


  })

  console.log(response.data)
  return response.data
}
