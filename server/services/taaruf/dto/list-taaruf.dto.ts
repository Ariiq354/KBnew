import { z } from "zod/v4-mini";
import { OPagination } from "../../common/pagination";

export const OTaarufList = z.extend(OPagination, {
  search: z.optional(z.string()),
});

export type TTaarufList = z.infer<typeof OTaarufList>;
