import * as v from "valibot";
import { OPagination } from "../../common/pagination";

export const OAnggotaList = v.object({
  ...OPagination.entries,
  search: v.optional(v.string()),
});

export type TAnggotaList = v.InferOutput<typeof OAnggotaList>;
