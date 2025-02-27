import {z} from 'zod';

export const loginTypeZod = z.object({
    userName: z.string().min(4, 'userName must be at least 4 characters long'),
    password: z.string().min(4, 'password must be at least 4 characters long'),
})

export type loginType = z.infer<typeof loginTypeZod>;