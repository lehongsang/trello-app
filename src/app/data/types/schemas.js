import { z } from 'zod';
const houseSchema = z.object({
    owner: z.object({ id: z.number() }),
    address: z.string().min(10, { message: 'Address should have at least 10 characters ' }),
    price: z.number().min(1, { message: 'Price should at least 1$ ' }),
    state: z.enum(["RENTED", "EMPTY"]),
    title: z.string().min(10, { message: 'Title should have at least 10 characters ' })
});
const imageSchema = z.object(
    {
        file: z.instanceof(File, { message: "There is no File !" })
            .refine((file) => file.type.startsWith('image/'), {
                message: 'File must be an image',
            })
            .refine((file) => file.size <= 5 * 1024 * 1024, {
                message: 'Image size must be less than 5MB',
            })
    }
)
const userSchema = z.object(
    {
        address: z.string().min(10, { message: 'Address should have at least 10 characters ! ' }).nullable(),
        phone: z.string().min(8, { message: 'Phone should have at least 8 number ! ' }),
        email: z.string().email(),
        name: z.string()

    }

)
export { houseSchema, imageSchema,userSchema }