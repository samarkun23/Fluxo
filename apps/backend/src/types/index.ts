
import { email, z } from 'zod'

export const signUpSchema = z.object({
    name: z.string().min(3, "username is to short"),
    email: z.string().min(2, "username is to short"),
    password: z.string().min(5, "Password is too short")
})

export const signInSchema = z.object({
    email: z.string().min(2, "username is to short"),
    password: z.string().min(5, "Password is too short")
})

export const zapCreateSchema = z.object({
    availableTriggerId: z.string(),
    triggerMetadata: z.any().optional(),
    actions: z.array(z.object({
        availableactionId: z.string(),
        actionMetadata: z.any().optional()
    }))
})

