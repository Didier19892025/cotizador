import Heading from "@/src/utils/Heading";
import Link from "next/link";



export default function EmployeesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="flex justify-between items-center p-4 bg-white shadow-md">
                <Heading>Gestionar empleados</Heading>
                <Link
                href="/employees/new"
                  className="bg-blue-500 py-2 px-8 rounded-xl hover:bg-blue-600 transition-all duration-300 ease-in-out hover:text-white text-white font-semibold"
                >
                    Agregar Empleado
                
                </Link>
            </div>
            <main>
                {children}
            </main>
        </>
    );
}
