import z from 'zod';

const updateUserValidationSchema = z.object({
  body: z.object({
    firstName: z.string().nonempty('First name is required').optional(),
    lastName: z.string().optional(),
    phoneNumber: z
      .string()
      .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format')
      .optional(),
    email: z.string().email('Invalid email format').optional(),
    bio: z.string().optional(),
    address: z.string().optional(),
    workAt: z.string().optional(),
    role: z.string().optional(),
    website: z.string().url('Invalid website URL').optional().or(z.literal('')),
    birthday: z
      .string()
      .optional()
      .transform((val) => (val ? new Date(val) : undefined)),
  }),
});

export const UserValidations = {
  updateUserValidationSchema,
};
