import * as v from "valibot";

export const ODeleteSchema = v.object({
  id: v.array(v.number()),
});

export type TDeleteDto = v.InferOutput<typeof ODeleteSchema>;
