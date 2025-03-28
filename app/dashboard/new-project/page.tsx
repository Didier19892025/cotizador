
import { getAllServices } from '@/actions/quatitionsActions'
import { getAllRoles } from '@/actions/rolesActions'
// import ListaProjects from '@/components/dashboard/quotations/ListaProjects'

import FormProjects from "@/components/projects/FormProjects"

const NewProjectPage = async () => {

  const roles = await getAllRoles()
  const services = await getAllServices()



  return (
    <div>
      {/* <ListaProjects roles={roles} services={services} /> */}
      
      <FormProjects services={services} roles={roles}/>
    </div>
  )
}

export default NewProjectPage
