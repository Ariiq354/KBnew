import { z } from "zod/mini";
import { OPagination } from "../../common/pagination";

export const OTransaksiList = z.object({
  ...OPagination.def.shape,
  search: z.optional(z.string()),
});

export type TTransaksiList = z.infer<typeof OTransaksiList>;
