import { api } from "@/lib/axios"


interface RemoveEmployeeRequest {
  id: string
}

interface RemoveEmployeeResponse {

}
export async function removeEmployee({id}: RemoveEmployeeRequest){
  const response = await api.delete<RemoveEmployeeResponse>(`/employee/${id}`)

  return response.data
}
