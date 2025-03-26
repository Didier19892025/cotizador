"use client"

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, RefreshCw } from "lucide-react";
import { itemSubServiceSchema, ItemSubServiceSchemaType, serviceSchema, ServiceSchemaType, subServiceSchema, SubServiceSchemaType } from '@/schemas/zodServices';
import Swal from 'sweetalert2';
import { createService, createSubService, createItemSubService, getSubServicesByServiceId, getItemSubServicesBySubServiceId } from '@/actions/servicesActions';
import { ServiceType, SubServiceType, ItemSubServiceType } from '@/types/servicesType';
import NoRecords from '@/src/ui/NoRecords';
import { capitalizeName } from '@/src/utils/formatName';

interface ServicesProps {
  services: ServiceType[]
}

export default function Services({ services }: ServicesProps) {

  // Estado para controlar la vista actual
  const [activeView, setActiveView] = useState<'services' | 'subservices' | 'items'>('services');

  // Estados para los datos cargados
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [selectedSubService, setSelectedSubService] = useState<SubServiceType | null>(null);
  const [subServices, setSubServices] = useState<SubServiceType[]>([]);
  const [itemSubServices, setItemSubServices] = useState<ItemSubServiceType[]>([]);

  // Configuración de react-hook-form para servicios
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ServiceSchemaType>({
    resolver: zodResolver(serviceSchema),
  });

  const { register: registerSub, handleSubmit: handleSubmitSub, formState: { errors: errorsSub }, reset: resetSub } = useForm<SubServiceSchemaType>({
    resolver: zodResolver(subServiceSchema),
  });

  const { register: registerItem, handleSubmit: handleSubmitItem, formState: { errors: errorsItem }, reset: resetItem } = useForm<ItemSubServiceSchemaType>({
    resolver: zodResolver(itemSubServiceSchema),
  });

  // Cargar subservicios cuando se selecciona un servicio
  useEffect(() => {
    if (selectedService) {
      const loadSubServices = async () => {
        const response = await getSubServicesByServiceId(selectedService.id);
        if (response.success) {
          setSubServices(response.subServices || []);
        }
      };
      loadSubServices();
    } else {
      setSubServices([]);
    }
  }, [selectedService]);

  // Cargar items cuando se selecciona un subservicio
  useEffect(() => {
    if (selectedSubService) {
      const loadItemSubServices = async () => {
        const response = await getItemSubServicesBySubServiceId(selectedSubService.id);
        if (response.success) {
          setItemSubServices(response.itemSubServices || []);
        }
      };
      loadItemSubServices();
    } else {
      setItemSubServices([]);
    }
  }, [selectedSubService]);

  // Manejo de envío de formularios
  const onSubmitService = async (data: ServiceSchemaType) => {
    console.log('Servicio Enviado:', data);

    // Llamada a la función para crear el servicio
    const response = await createService(data);

    // Verificamos la respuesta y mostramos una alerta con swal
    if (!response.success) {
      Swal.fire({
        title: 'Error Creating Service!',
        text: response.message || 'Something went wrong while creating the service.',
        icon: 'error',
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      Swal.fire({
        title: 'Service Created Successfully!',
        text: 'The service was created successfully.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        reset(); // Limpiar el formulario de servicio
      });
    }
  };

  const onSubmitSubService = async (data: SubServiceSchemaType) => {
    if (!selectedService) {
      Swal.fire({
        title: 'Error!',
        text: 'Please select a service first.',
        icon: 'error',
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }

    // Añadir el serviceId al data
    const subServiceData = {
      ...data,
      serviceId: selectedService.id
    };

    console.log('Subservicio Enviado:', subServiceData);

    const response = await createSubService(subServiceData);

    if (!response.success) {
      Swal.fire({
        title: 'Error Creating Subservice!',
        text: response.message || 'Something went wrong while creating the subservice.',
        icon: 'error',
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      Swal.fire({
        title: 'Subservice Created Successfully!',
        text: 'The subservice was created successfully.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        resetSub(); // Limpiar el formulario de subservicio
        // Actualizar la lista de subservicios
        getSubServicesByServiceId(selectedService.id).then(response => {
          if (response.success) {
            setSubServices(response.subServices || []);
          }
        });
      });
    }
  };

  const onSubmitItemSubService = async (data: ItemSubServiceSchemaType) => {
    if (!selectedSubService) {
      Swal.fire({
        title: 'Error!',
        text: 'Please select a subservice first.',
        icon: 'error',
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }

    // Añadir el subServiceId al data
    const itemSubServiceData = {
      ...data,
      subServiceId: selectedSubService.id
    };

    console.log('Item de Subservicio Enviado:', itemSubServiceData);

    const response = await createItemSubService(itemSubServiceData);

    if (!response.success) {
      Swal.fire({
        title: 'Error Creating Item!',
        text: response.message || 'Something went wrong while creating the item.',
        icon: 'error',
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      Swal.fire({
        title: 'Item Created Successfully!',
        text: 'The item was created successfully.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        resetItem(); // Limpiar el formulario de item
        // Actualizar la lista de items
        getItemSubServicesBySubServiceId(selectedSubService.id).then(response => {
          if (response.success) {
            setItemSubServices(response.itemSubServices || []);
          }
        });
      });
    }
  };

  // Función para cambiar de vista
  const changeView = (view: 'services' | 'subservices' | 'items') => {
    setActiveView(view);
    // Limpiar formularios al cambiar de vista
    if (view === 'services') reset();
    if (view === 'subservices') resetSub();
    if (view === 'items') resetItem();
  };

  // Seleccionar un servicio
  const handleSelectService = (service: ServiceType) => {
    setSelectedService(service);
    setActiveView('subservices');
  };

  // Seleccionar un subservicio
  const handleSelectSubService = (subService: SubServiceType) => {
    setSelectedSubService(subService);
    setActiveView('items');
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Gestión de Servicios</h1>

      {/* Navegación entre vistas */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => changeView('services')} className={`px-4 py-2    ${activeView === 'services' ? 'bg-  blue/70 text-white' : 'bg-gray-200'}`}>
          Servicios
        </button>
        <button onClick={() => changeView('subservices')} className={`px-4 py-2    ${activeView === 'subservices' ? 'bg-  blue/70 text-white' : 'bg-gray-200'}`}>
          Subservicios {selectedService && `de ${selectedService.nameService}`}
        </button>
        <button onClick={() => changeView('items')} className={`px-4 py-2    ${activeView === 'items' ? 'bg-  blue/70 text-white' : 'bg-gray-200'}`}>
          Items {selectedSubService && `de ${selectedSubService.nameSubService}`}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sección de Servicios */}
        {activeView === 'services' && (
          <section className="flex-1 p-4">
            <div className="flex justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-4">Crear Servicio</h3>
                <form onSubmit={handleSubmit(onSubmitService)}>
                  <div className="mb-4">
                    <label className="block text-sm text-gray/70" htmlFor="nameService">Nombre del Servicio</label>
                    <input
                      type="text"
                      id="nameService"
                      {...register('nameService')}
                      className="w-full p-3 border border-gray/20    shadow-sm focus:ring-  blue/70"
                    />
                    {errors.nameService && (
                      <p className="text-red text-sm mt-1">{errors.nameService.message}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm" htmlFor="status">Estado</label>
                    <select
                      id="status"
                      {...register('status')}
                      className="w-full p-3 border border-gray/20    shadow-sm focus:ring-  blue/70"
                    >
                      <option value="">select a state</option>
                      <option value={'true'}>Active</option>
                      <option value={'false'}>Inactive</option>
                    </select>
                    {errors.status && (
                      <p className="text-red text-sm mt-1">{errors.status.message}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <button type="submit" className="w-full flex items-center justify-center bg-  blue/70 text-white py-2    hover:bg-  blue/80">
                      <Plus size={18} />
                      Crear
                    </button>
                    <button type="button" onClick={() => reset()} className="w-full flex items-center justify-center bg-gray/10 text-gray-700 py-2    hover:bg-gray-300">
                      <RefreshCw size={18} />
                      Limpiar
                    </button>
                  </div>
                </form>
              </div>

              {/* Lista de Servicios */}
              <div className="ml-6 flex-1 border    border-gray/20 overflow-auto max-h-[300px]">
                <div className=" sticky top-0 border-b p-2 border-gray/20 bg-black/10 backdrop-blur">
                  <h4 className="text-lg text-center font-semibold">Lista de Servicios</h4>
                </div>

                {services.length === 0 ? (
                  <NoRecords />
                ) : (
                  <ul className="p-4 mt-8">
                    {services.map((service) => (
                      <li
                        key={service.id}
                        className="flex items-center justify-between mb-4 p-4    border border-gray/20 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSelectService(service)}
                      >
                        <strong>{capitalizeName(service.nameService)}</strong>
                        <span
                          className={`font-semibold py-1 px-2    inline-block ${service.status ? 'bg-green text-white' : 'bg-red text-white'}`}
                        >
                          {service.status ? 'Activo' : 'Inactivo'}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

            </div>
          </section>
        )}

        {/* Sección de Subservicios */}
        {activeView === 'subservices' && (
          <section className="flex-1 p-4">
            <div className="flex justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-4">
                  Crear Subservicio {selectedService && `para ${selectedService.nameService}`}
                </h3>
                {!selectedService ? (
                  <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4    mb-4">
                    Por favor, selecciona un servicio primero.
                  </div>
                ) : (
                  <form onSubmit={handleSubmitSub(onSubmitSubService)}>
                    <div className="mb-4">
                      <label className="block text-sm text-gray/70" htmlFor="nameSubService">Nombre del Subservicio</label>
                      <input
                        type="text"
                        id="nameSubService"
                        {...registerSub('nameSubService')}
                        className="w-full p-3 border border-gray/20    shadow-sm focus:ring-  blue/70"
                      />
                      {errorsSub.nameSubService && (
                        <p className="text-red text-sm mt-1">{errorsSub.nameSubService.message}</p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm" htmlFor="subServiceStatus">Estado</label>
                      <select
                        id="subServiceStatus"
                        {...registerSub('status')}
                        className="w-full p-3 border border-gray/20    shadow-sm focus:ring-  blue/70"
                      >
                        <option value="">select a state</option>
                        <option value={'true'}>Active</option>
                        <option value={'false'}>Inactive</option>
                      </select>
                      {errorsSub.status && (
                        <p className="text-red text-sm mt-1">{errorsSub.status.message}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <button type="submit" className="w-full flex items-center justify-center bg-  blue/70 text-white py-2    hover:bg-  blue/80">
                        <Plus size={18} />
                        Crear
                      </button>
                      <button type="button" onClick={() => resetSub()} className="w-full flex items-center justify-center bg-gray/10 text-gray-700 py-2    hover:bg-gray-300">
                        <RefreshCw size={18} />
                        Limpiar
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Lista de Subservicios */}
              <div className="ml-6 flex-1 border p-6    border-gray/20">
                <h4 className="text-lg font-semibold mb-4">
                  Lista de Subservicios {selectedService && `de ${selectedService.nameService}`}
                </h4>

                {!selectedService ? (
                  <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4   ">
                    Selecciona un servicio para ver sus subservicios.
                  </div>
                ) : subServices.length === 0 ? (
                  <NoRecords />
                ) : (
                  <ul>
                    {subServices.map((subService) => (
                      <li
                        key={subService.id}
                        className="flex items-center justify-between mb-4 p-4    border border-gray/20 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSelectSubService(subService)}
                      >
                        <strong>{capitalizeName(subService.nameSubService)}</strong>
                        <span
                          className={`font-semibold py-1 px-2    inline-block ${subService.status ? 'bg-green text-white' : 'bg-red text-white'}`}
                        >
                          {subService.status ? 'Activo' : 'Inactivo'}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Sección de Items de Subservicio */}
        {activeView === 'items' && (
          <section className="flex-1 p-4">
            <div className="flex justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-4">
                  Crear Item {selectedSubService && `para ${selectedSubService.nameSubService}`}
                </h3>
                {!selectedSubService ? (
                  <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4    mb-4">
                    Por favor, selecciona un subservicio primero.
                  </div>
                ) : (
                  <form onSubmit={handleSubmitItem(onSubmitItemSubService)}>
                    <div className="mb-4">
                      <label className="block text-sm text-gray/70" htmlFor="nameItemSubService">Nombre del Item</label>
                      <input
                        type="text"
                        id="nameItemSubService"
                        {...registerItem('nameItemSubService')}
                        className="w-full p-3 border border-gray/20    shadow-sm focus:ring-  blue/70"
                      />
                      {errorsItem.nameItemSubService && (
                        <p className="text-red text-sm mt-1">{errorsItem.nameItemSubService.message}</p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm" htmlFor="itemStatus">Estado</label>
                      <select
                        id="itemStatus"
                        {...registerItem('status')}
                        className="w-full p-3 border border-gray/20    shadow-sm focus:ring-  blue/70"
                      >
                        <option value="">select a state</option>
                        <option value={'true'}>Active</option>
                        <option value={'false'}>Inactive</option>
                      </select>
                      {errorsItem.status && (
                        <p className="text-red text-sm mt-1">{errorsItem.status.message}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <button type="submit" className="w-full flex items-center justify-center bg-  blue/70 text-white py-2    hover:bg-  blue/80">
                        <Plus size={18} />
                        Crear
                      </button>
                      <button type="button" onClick={() => resetItem()} className="w-full flex items-center justify-center bg-gray/10 text-gray-700 py-2    hover:bg-gray-300">
                        <RefreshCw size={18} />
                        Limpiar
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Lista de Items */}
              <div className="ml-6 flex-1 border p-6    border-gray/20">
                <h4 className="text-lg font-semibold mb-4">
                  Lista de Items {selectedSubService && `de ${selectedSubService.nameSubService}`}
                </h4>

                {!selectedSubService ? (
                  <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4   ">
                    Selecciona un subservicio para ver sus items.
                  </div>
                ) : itemSubServices.length === 0 ? (
                  <NoRecords />
                ) : (
                  <ul>
                    {itemSubServices.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between mb-4 p-4    border border-gray/20"
                      >
                        <strong>{capitalizeName(item.nameItemSubService)}</strong>
                        <span
                          className={`font-semibold py-1 px-2    inline-block ${item.status ? 'bg-green text-white' : 'bg-red text-white'}`}
                        >
                          {item.status ? 'Activo' : 'Inactivo'}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}