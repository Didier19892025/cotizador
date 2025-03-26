import { Globe, FileText, DollarSign, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import Heading from "@/src/ui/Heading";
import { JobSchema, JobSchemaType } from "@/schemas/zodRoles";
import { countries } from "@/data/countries";
import { createRole, editRol } from "@/actions/rolesActions";

interface FormRolesProps {
  onClose: () => void;
  roles?: JobSchemaType;
  mode?: "created" | "edit";
}

export default function FormRoles({
  onClose,
  roles,
  mode = "created",
}: FormRolesProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JobSchemaType>({
    resolver: zodResolver(JobSchema),
    defaultValues: roles,
    mode: "onChange",
  });

  const onSubmit = async (data: JobSchemaType) => {
    try {
      let result;
      if (mode === "created") {
        result = await createRole(data);
      } else {
        if (roles) {
          result = await editRol(roles.id!, data);
        }
      }
      if (result && !result.success) {
        Swal.fire({
          title: "Error",
          text: result.message,
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
        return;
      }
      Swal.fire({
        title: result?.message,
        text:
          mode === "created"
            ? `el rol ${data.jobRole} ha sido creado correctamente`
            : `el rol ${data.jobRole} ha sido actualizado`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      if (onClose) onClose();
      reset();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "An error occurred during submission.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <main className="bg-black/50 z-50 fixed top-0 left-0 right-0 w-full flex items-center justify-center h-screen">
      <div className="bg-white    w-full max-w-5xl shadow-xl mx-auto p-10 animate-palpito">
        <section className="flex items-center justify-between">
          <Heading>New Roles Form</Heading>

          <button
            className="flex items-center hover:bg-  blue/10 transition-all duration-300 text-  blue    p-2"
            onClick={onClose}
          >
            <X />
          </button>
        </section>

        {/* Form */}
        <section className="mt-4">
          <div>
            <h2>
              {mode === "created"
                ? "formulario para crear rol"
                : "editar formulario"}
            </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              {/* Job Role */}
              <div className="space-y-2">
                <label
                  htmlFor="jobRole"
                  className="block text-sm font-medium text-negro"
                >
                  Job Role
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText size={18} color="gray" />
                  </div>
                  <input
                    required
                    id="jobRole"
                    placeholder="Ej: Software Engineer"
                    {...register("jobRole")}
                    className="w-full pl-10 p-3 bg-transparent border-b border-negro/10 focus:border-verde focus:outline-none"
                  />
                </div>
                {errors.jobRole && (
                  <p className="text-red text-sm">{errors.jobRole.message}</p>
                )}
              </div>

              {/* Country */}
              <div className="space-y-2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-negro"
                >
                  Country
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe size={18} color="gray" />
                  </div>
                  <select
                    required
                    id="country"
                    {...register("country")}
                    className="w-full pl-10 p-3 bg-transparent border-b border-negro/10 focus:border-verde focus:outline-none"
                  >
                    <option value="" disabled>
                      Select a country
                    </option>
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.country && (
                  <p className="text-red text-sm">{errors.country.message}</p>
                )}
              </div>

              {/* Area */}
              <div className="space-y-2">
                <label
                  htmlFor="area"
                  className="block text-sm font-medium text-negro"
                >
                  Area
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText size={18} color="gray" />
                  </div>
                  <input
                    required
                    id="area"
                    placeholder="Ej: Development"
                    {...register("area")}
                    className="w-full pl-10 p-3 bg-transparent border-b border-negro/10 focus:border-verde focus:outline-none"
                  />
                </div>
                {errors.area && (
                  <p className="text-red text-sm">{errors.area.message}</p>
                )}
              </div>

              {/* CC */}
              <div className="space-y-2">
                <label
                  htmlFor="cc"
                  className="block text-sm font-medium text-negro"
                >
                  CC
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign size={18} color="gray" />
                  </div>
                  <input
                    required
                    id="cc"
                    placeholder="Ej: CC12345"
                    {...register("cc")}
                    className="w-full pl-10 p-3 bg-transparent border-b border-negro/10 focus:border-verde focus:outline-none"
                  />
                </div>
                {errors.cc && (
                  <p className="text-red text-sm">{errors.cc.message}</p>
                )}
              </div>

              {/* CPH Code */}
              <div className="space-y-2">
                <label
                  htmlFor="cphCode"
                  className="block text-sm font-medium text-negro"
                >
                  CPH Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText size={18} color="gray" />
                  </div>
                  <input
                    required
                    id="cphCode"
                    placeholder="Ej: CPH98765"
                    {...register("cphCode")}
                    className="w-full pl-10 p-3 bg-transparent border-b border-negro/10 focus:border-verde focus:outline-none"
                  />
                </div>
                {errors.cphCode && (
                  <p className="text-red text-sm">{errors.cphCode.message}</p>
                )}
              </div>

              {/* CPH */}
              <div className="space-y-2">
                <label
                  htmlFor="cph"
                  className="block text-sm font-medium text-negro"
                >
                  CPH
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign size={18} color="gray" />
                  </div>
                  <input
                    required
                    id="cph"
                    type="text" // Cambiado de "number" a "text"
                    placeholder="Ej: 1.25"
                    {...register("cph")}
                    className="w-full pl-10 p-3 bg-transparent border-b border-negro/10 focus:border-verde focus:outline-none"
                  />
                </div>
                {errors.cph && (
                  <p className="text-red text-sm">{errors.cph.message}</p>
                )}
              </div>

              {/* Currency */}
              <div className="space-y-2">
                <label
                  htmlFor="currency"
                  className="block text-sm font-medium text-negro"
                >
                  Currency
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign size={18} color="gray" />
                  </div>
                  <select
                    required
                    id="currency"
                    {...register("currency")}
                    className="w-full pl-10 p-3 bg-transparent border-b border-negro/10 focus:border-verde focus:outline-none"
                  >
                    <option value="" disabled>
                      Select a currency
                    </option>
                    {/* You can map over a list of currencies */}
                    <option value="COP">COP</option>
                    <option value="EUR">EUR</option>
                    <option value="MXN">MXN</option>
                    <option value="PUR">PUR</option>
                  </select>
                </div>
                {errors.currency && (
                  <p className="text-red text-sm">{errors.currency.message}</p>
                )}
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full p-3 bg-  blue/80 hover:bg-  blue/90 text-white    focus:outline-none focus:ring-2 focus:ring-  blue-300 font-bold"
              >
                {isSubmitting
                  ? "enviando"
                  : mode === "created"
                    ? "crear cliente"
                    : "actualizar cliente"}
              </button>
              <button
                type="button"
                onClick={onClose}
              >
                cerrar
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
