import { z } from "zod/mini";
import { OPagination } from "../../common/pagination";

export const OTaarufList = z.object({
  ...OPagination.def.shape,
  search: z.optional(z.string()),
});

export type TTaarufList = z.infer<typeof OTaarufList>;
