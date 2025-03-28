import { getAllCurrencies, getAllRoles } from "@/actions/rolesActions";
import RolesList from "@/components/roles/RolesList";


export default async function  RolesPage() {
  const roles = await getAllRoles()
  const currencies = await getAllCurrencies()
  console.log('roles obtenidos',roles);
  return (
    
    <RolesList roles={roles} currencies={currencies}/>
  )
}
