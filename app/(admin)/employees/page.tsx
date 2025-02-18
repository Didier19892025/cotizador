import ListEmployees from "@/components/employees/ListEmployees";
import { getAllEmployees } from "@/server/employees";



export default async function EmployeesPage() {
  const employees = await getAllEmployees()
  console.log('Empleados obtenidos',employees);
  return (
    <>
    <ListEmployees employees={employees}/>
    </>
  )
}
