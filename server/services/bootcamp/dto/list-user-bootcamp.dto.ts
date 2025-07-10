import { z } from "zod/mini";
import { OPagination } from "../../common/pagination";

export const OUserBootcampList = z.object({
  ...OPagination.def.shape,
  search: z.optional(z.string()),
});

export type TUserBootcampList = z.infer<typeof OUserBootcampList>;
