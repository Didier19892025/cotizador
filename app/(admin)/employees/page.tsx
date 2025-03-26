import ListEmployees from "@/components/employees/ListEmployees";
import { getAllEmployees } from "@/actions/employeesActions";
import { getAllRoles } from "@/actions/rolesActions";



export default async function EmployeesPage() {
  const employees = await getAllEmployees()
  const role = await getAllRoles()
  console.log('empleados obtenidos',employees);

  return (
    <>
    <ListEmployees employees={employees} role={role}/>
    </>
  )
}
