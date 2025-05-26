import * as v from "valibot";

export const loginSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1, "Required")),
  noTelepon: v.pipe(v.string(), v.minLength(1, "Required")),
  email: v.pipe(v.string(), v.minLength(1, "Required"), v.email()),
  password: v.pipe(
    v.string(),
    v.minLength(1, "Required"),
    v.minLength(8, "Password must be 8 character or more")
  ),
});

export const getInitialFormData = (): Schema => ({
  email: "",
  password: "",
  noTelepon: "",
  name: "",
});

export type Schema = v.InferOutput<typeof loginSchema>;
