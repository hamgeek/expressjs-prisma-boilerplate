import { z } from 'zod';

export const GoogleCallbackQuerySchema = z.object({
  code: z.string().min(1),
});
