import { z } from "zod/v4-mini";
import { OPagination } from "../../common/pagination";

export const OAnggotaList = z.extend(OPagination, {
  search: z.optional(z.string()),
});

export type TAnggotaList = z.infer<typeof OAnggotaList>;
