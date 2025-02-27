import FormEditEmployee from "@/components/employees/FormEditEmployee";
import { getEmployeeById } from "@/server/employees";
import { notFound } from "next/navigation";


interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditEmployeePage({ params }: PageProps) {
    // Ensure params is awaited
    const { id } = await params;

    // Convert the id to a number
    if (!id || isNaN(Number(id))) {
        return notFound();
    }

    const employeeId = Number(id);
    const result = await getEmployeeById(employeeId);

    if (!result.success || !result.data) {
        return notFound();
    }

    console.log('empleado por id',result.data);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-4">Editar Empleado</h1>
            <FormEditEmployee employee={result.data}/>
        </div>
    );
}
