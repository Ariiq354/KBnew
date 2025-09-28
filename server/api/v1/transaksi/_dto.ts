import { z } from "zod/mini";

export const OTransaksiCreate = z.object({
  status: z.boolean(),
});

export type TTransaksiCreate = z.infer<typeof OTransaksiCreate>;
