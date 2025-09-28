import { z } from "zod/mini";

export const DaerahDto = z.object({
  data: z.array(
    z.object({
      code: z.string(),
      name: z.string(),
    })
  ),
  meta: z.object({
    administrative_area_level: z.number(),
    updated_at: z.string(),
  }),
});

export const ODelete = z.object({
  id: z.array(z.number()),
});

export type TDeleteDto = z.infer<typeof ODelete>;

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

export const OSearchPagination = z.object({
  ...OPagination.def.shape,
  search: z.optional(z.string()),
});

export type TSearchPagination = z.infer<typeof OSearchPagination>;

export const OParam = z.coerce.number();
