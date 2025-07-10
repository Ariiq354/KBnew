import { z } from "zod/mini";
import { OPagination } from "../../common/pagination";

export const ODiskonList = z.object({
  ...OPagination.def.shape,
  search: z.optional(z.string()),
});

export type TDiskonList = z.infer<typeof ODiskonList>;
