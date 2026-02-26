import { z } from 'zod/v3';

export const commentValidationSchema = z.object({
  body: z.object({
    content: z
      .string({
        required_error: 'Comment content is required',
        invalid_type_error: 'Content must be a string',
      })
      .min(1, 'Comment cannot be empty')
      .max(500, 'Comment cannot exceed 500 characters'),

    postId: z
      .string({
        required_error: 'Post ID is required',
        invalid_type_error: 'Post ID must be a string',
      })
      .uuid('Invalid Post ID format'),
  }),
});
