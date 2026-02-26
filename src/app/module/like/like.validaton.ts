import { z } from 'zod/v3';

export const likeSchemaValidation = z.object({
  body: z.object({
    targetId: z
      .string({
        required_error: 'Target ID is required',
        invalid_type_error: 'Target ID must be a string',
      })
      .uuid('Invalid ID format'),

    type: z.enum(['POST', 'COMMENT'], {
      required_error: 'Type is required',
      invalid_type_error: "Type must be either 'POST' or 'COMMENT'",
    }),
  }),
});
