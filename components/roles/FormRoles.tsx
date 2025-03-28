import { Globe, FileText, DollarSign, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import Heading from "@/src/ui/Heading";
import { JobSchema, JobSchemaType } from "@/schemas/zodRoles";
import { countries } from "@/data/countries";
import { createRole, editRol } from "@/actions/rolesActions";
import { currencyType } from "@/types/currencysType";
import { capitalizeName, toUpperCaseName } from "@/src/utils/formatName";

interface FormRolesProps {
  onClose: () => void;
  roles?: JobSchemaType;
  mode?: "created" | "edit";
  currencies?: currencyType[];
}

export default function FormRoles({
  currencies,
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
    console.log("onSubmit", data);
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
    <main className="bg-blue/20 backdrop-blur-sm z-50 fixed top-0 left-0 right-0 w-full flex items-center justify-center h-screen">
      <div className="bg-white rounded-3xl   w-full max-w-5xl shadow-xl mx-auto p-4 animate-palpito">
        <section className="flex items-center justify-between">
          {mode === 'created' ? <Heading>New Roles Form</Heading> : <Heading>Edit Roles Form</Heading>}
          

          <button
            className="flex items-center hover:bg-red/10 rounded-full text-red    p-1"
            onClick={onClose}
          >
            <X />
          </button>
        </section>

        {/* Form */}
        <section className="mt-4">
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              {/* Job Role */}
              <div className="space-y-2">
                <label
                  htmlFor="jobRole"
                  className="block  "
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
                    className="w-full pl-10 p-3 bg-transparent border-b border-gray/20 focus:border-blue/20 focus:outline-none"
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
                    className="w-full pl-10 p-3 bg-transparent border-b border-gray/20 focus:border-blue/20 focus:outline-none"
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
                    className="w-full pl-10 p-3 bg-transparent border-b border-gray/20 focus:border-blue/20 focus:outline-none"

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
                  Cost center
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
                    className="w-full pl-10 p-3 bg-transparent border-b border-gray/20 focus:border-blue/20 focus:outline-none"

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
                    className="w-full pl-10 p-3 bg-transparent border-b border-gray/20 focus:border-blue/20 focus:outline-none"

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
                    {...register("cph", { valueAsNumber: true })}
                    className="w-full pl-10 p-3 bg-transparent border-b border-gray/20 focus:border-blue/20 focus:outline-none"

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
                    {...register("currencyId", { valueAsNumber: true })}
                    className="w-full pl-10 p-3 bg-transparent border-b border-gray/20 focus:border-blue/20 focus:outline-none"

                  >
                    <option value="" disabled>
                      Select a currency
                    </option>
                    
                    {currencies.map((cur) => (
                      <option key={cur.id} value={cur.id}>
                        {capitalizeName(cur.name)} {'-'} ({toUpperCaseName(cur.code)})
                      </option>
                    ))}
                  </select>
                </div>
                {errors.currencyId && (
                  <p className="text-red text-sm">{errors.currencyId.message}</p>
                )}
              </div>
            </div>

            <div className="mt-8 text-right">
              <button
                type="submit"
                className="w-2/12 py-2 px-1 bg-blue/80 hover:bg-blue/90 text-white  rounded-3xl  focus:outline-none focus:ring-2 focus:ring-  blue-300 font-bold"
              >
                {isSubmitting
                  ? "Send..."
                  : mode === "created"
                    ? "Created client"
                    : "Update client"}
              </button>
    
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
