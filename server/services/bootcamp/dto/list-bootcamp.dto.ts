import * as v from "valibot";
import { OPagination } from "../../common/pagination";

export const OBootcampList = v.object({
  ...OPagination.entries,
  search: v.optional(v.string()),
});

export type TBootcampList = v.InferOutput<typeof OBootcampList>;
