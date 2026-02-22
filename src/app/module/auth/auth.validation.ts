import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    password: z.string().min(6, 'Password must be at least 6 characters'),

    profile: z.preprocess(
      (val) => (typeof val === 'string' ? JSON.parse(val) : val),
      z.object({
        firstName: z.string().nonempty('First name is required'),
        lastName: z.string().optional(),
        contactInfo: z
          .string()
          .nonempty('Email or Phone number is required')
          .refine(
            (val) => {
              const isEmail = z.string().email().safeParse(val).success;

              const isPhone = /^\+?[0-9]{10,15}$/.test(val);

              return isEmail || isPhone;
            },
            { message: 'Invalid email or phone number format' }
          ),
        bio: z.string().optional(),
        address: z.string().optional(),
        workAt: z.string().optional(),
        role: z.string().optional(),
        website: z
          .string()
          .url('Invalid website URL')
          .optional()
          .or(z.literal('')),
        birthday: z
          .string()
          .optional()
          .transform((val) => (val ? new Date(val) : undefined)),
      })
    ),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .optional(),

    profile: z.preprocess(
      (val) => (typeof val === 'string' ? JSON.parse(val) : val),
      z.object({
        firstName: z.string().nonempty('First name is required').optional(),
        lastName: z.string().optional(),
        contactInfo: z
          .string()
          .nonempty('Email or Phone number is required')
          .refine(
            (val) => {
              const isEmail = z.string().email().safeParse(val).success;

              const isPhone = /^\+?[0-9]{10,15}$/.test(val);

              return isEmail || isPhone;
            },
            { message: 'Invalid email or phone number format' }
          ),
        bio: z.string().optional(),
        address: z.string().optional(),
        workAt: z.string().optional(),
        role: z.string().optional(),
        website: z
          .string()
          .url('Invalid website URL')
          .optional()
          .or(z.literal('')),
        birthday: z
          .string()
          .optional()
          .transform((val) => (val ? new Date(val) : undefined)),
      })
    ),
  }),
});

export const AuthValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
