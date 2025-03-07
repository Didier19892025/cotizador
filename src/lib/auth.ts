// // lib/auth.ts
// import { cookies } from 'next/headers';
// import jwt from 'jsonwebtoken';
// import { redirect } from 'next/navigation';

// // Interfaz para el payload decodificado
// export interface DecodedToken {
//   id: string;
//   role: string;
//   userName: string;
//   name: string;
//   employeeId: string | null;
//   iat: number;
//   exp: number;
// }

// // Función para verificar autenticación en server actions
// export async function verificarAutenticacion() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get('token')?.value;
  
//   if (!token) {
//     redirect('/');
//   }
  
//   try {
//     const decoded = jwt.verify(
//       token, 
//       process.env.JWT_SECRET || 'secret'
//     ) as DecodedToken;
    
//     // Verificar si el rol es admin
//     if (decoded.role !== 'admin') {
//       redirect('/');
//     }
    
//     return decoded; // Devuelve los datos del usuario
//   } catch (error) {
//     console.error('Error al verificar token en server action:', error);
//     redirect('/');
//   }
// }

