import { getAllRoles } from "@/actions/rolesActions";
import RolesList from "@/components/roles/RolesList";


export default async function  RolesPage() {
  const roles = await getAllRoles()
  // console.log('roles obtenidos',roles.map(role => role.project.map(pro) => pro);
  return (
    
    <RolesList roles={roles}/>
  )
}
