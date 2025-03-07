import ListEmployees from "@/components/employees/ListEmployees";
import { getAllEmployees } from "@/server/employeesActions";



export default async function EmployeesPage() {
  const employees = await getAllEmployees()

  console.log('empleados obtenidos',employees);
  return (
    <>
    <ListEmployees employees={employees}/>
    </>
  )
}
