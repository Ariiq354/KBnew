import { z } from "zod/v4-mini";
import { OPagination } from "../../common/pagination";

export const OBootcampList = z.extend(OPagination, {
  search: z.optional(z.string()),
});

export type TBootcampList = z.infer<typeof OBootcampList>;
