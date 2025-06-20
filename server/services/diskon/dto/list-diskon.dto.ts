import { z } from "zod/v4-mini";
import { OPagination } from "../../common/pagination";

export const ODiskonList = z.extend(OPagination, {
  search: z.optional(z.string()),
});

export type TDiskonList = z.infer<typeof ODiskonList>;
