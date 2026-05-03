import { z } from 'zod';
import { ValidationError } from '../errors/index.js';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export const paginationSchema = z.object({
  page: z.coerce
    .number()
    .int()
    .min(1, 'page must be at least 1')
    .default(DEFAULT_PAGE),
  limit: z.coerce
    .number()
    .int()
    .min(1, 'limit must be at least 1')
    .max(MAX_LIMIT, `limit cannot exceed ${MAX_LIMIT}`)
    .default(DEFAULT_LIMIT),
});

export function parsePagination(query) {
  const result = paginationSchema.safeParse(query);
  if (!result.success) {
    const messages = result.error.issues
      .map((e) => `${e.path.join('.')}: ${e.message}`)
      .join(', ');
    throw new ValidationError(messages);
  }
  const { page, limit } = result.data;
  return { page, limit, skip: (page - 1) * limit };
}

export async function paginate(
  model,
  filter = {},
  { page, limit, skip },
  options = {}
) {
  const [items, total] = await Promise.all([
    model.find(filter, null, options).skip(skip).limit(limit),
    model.countDocuments(filter),
  ]);
  return { items, total, page, limit };
}
