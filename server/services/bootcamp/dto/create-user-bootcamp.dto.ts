import { z } from "zod/mini";

export const OUserBootcampCreate = z.object({
  idBootcamp: z.number(),
  harga: z.number(),
  diskon: z.string(),
});

export type TUserBootcampCreate = z.infer<typeof OUserBootcampCreate>;
