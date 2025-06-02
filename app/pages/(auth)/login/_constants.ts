import { z } from "zod/v4-mini";

export const loginSchema = z.object({
  email: z.string().check(z.minLength(1, "Required"), z.email()),
  password: z.string().check(z.minLength(1, "Required")),
  rememberMe: z.boolean(),
});

export const getInitialFormData = (): Schema => ({
  email: "",
  password: "",
  rememberMe: false,
});

export type Schema = z.infer<typeof loginSchema>;
