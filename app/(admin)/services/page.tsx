import { getServices } from '@/actions/servicesActions'
import Services from '@/components/others/Services'
import React from 'react'

export default async function ServicesPage() {

  const services = await getServices()
  console.log('servicios obtenidos', services)
  return (
    <>
    <Services services={services}/>
    </>
  )
}
