import { jwtDecode } from "jwt-decode";

export function getIdCompanies(){
  const token = sessionStorage.getItem('token')

  if(token){
    const tokenInfoCompanies = jwtDecode(token)

    
    return tokenInfoCompanies.id
  }
  
}
