import { z } from "zod/mini";
import { OPagination } from "../../common/pagination";

export const OBootcampList = z.object({
  ...OPagination.def.shape,
  search: z.optional(z.string()),
});

export type TBootcampList = z.infer<typeof OBootcampList>;
