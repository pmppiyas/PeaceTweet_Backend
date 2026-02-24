import z from 'zod/v3';

const create = z.object({
  body: z.object({
    header: z
      .string()
      .min(5, 'Header must be at least 5 characters')
      .max(150, 'Header cannot exceed 150 characters')
      .trim()
      .optional(),
    content: z
      .string({
        required_error: 'Content is required',
      })
      .min(5, 'Content must be at least 5 characters')
      .trim(),
    tags: z.array(z.string().trim()).optional().default([]),
  }),
});

export const PostValidations = {
  create,
};
