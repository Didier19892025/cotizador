import ListEmployees from "@/components/employees/ListEmployees";
import { getAllEmployees } from "@/server/employeesActions";



export default async function EmployeesPage() {
  const employee = await getAllEmployees()

  console.log('empleados obtenidos',employee);
  return (
    <>
    <ListEmployees employee={employee}/>
    </>
  )
}
