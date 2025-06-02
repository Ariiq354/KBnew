import { z } from "zod/v4-mini";

export const OPagination = z.object({
  page: z._default(z.coerce.number(), 1),
  limit: z._default(z.coerce.number(), 10),
});

export type TPagination = z.infer<typeof OPagination>;

export type TPaginationMetadata = {
  page: number;
  total: number;
  itemPerPage: number;
};
