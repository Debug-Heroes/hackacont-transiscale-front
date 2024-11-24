import { api } from "@/lib/axios"


interface RegisterSimulationRequest {
  name: string;
  target_model_type: number;
  original_model_type: number;
}

interface RegisterSimulationResponse {
  id: string;
  original_model_type: string;
  target_model_type: string;
  total_employees: number;
  employees_deficit: number;
  total_current_productivity: string;
  total_target_productivity: string;
  productivity_deficit: string;
  created_at: string;
  updated_at: string;
  name: string;
  employees: {
    employee_id: string
    hours_worked_monthly: number
    hours_worked_weekly: number
    new_weekly_productivity: string
    new_working_days: number
  }[]
}
export async function registerSimulation({name,original_model_type, target_model_type}: RegisterSimulationRequest){
  const response = await api.post<RegisterSimulationResponse>('/simulation', {
    name,original_model_type, target_model_type

  })

  return response.data
}
