import ListEmployees from "@/components/employees/ListEmployees";
import { getAllEmployees } from "@/server/employees";



export default async function EmployeesPage() {
  const employees = await getAllEmployees()
  return (
    <>
    <ListEmployees employees={employees}/>
    </>
  )
}
