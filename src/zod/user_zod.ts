// userValidation.js
import { z } from 'zod';

// Enum para los roles
const RoleEnum = z.enum(['USER', 'ADMIN']);

// Esquema de validación de User
export const UserSchema = z.object({
  name: z.string().min(1, 'Name is required'),  // name no puede ser vacío
  userName: z.string().min(1, 'Username is required').max(50, 'Username is too long').regex(/^[a-zA-Z0-9_]+$/, 'Username must be alphanumeric or underscore'),
  email: z.string().email('Invalid email format'),  // validación de email
  password: z.string().min(6, 'Password must be at least 6 characters'),  // mínimo 6 caracteres para la contraseña
  role: RoleEnum,  // Validación del role (USER o ADMIN)
});

// Tipado con Zod
export type User = z.infer<typeof UserSchema>;
