import { z } from "zod";

// Schema untuk Login
export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password is required")
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Schema untuk Register
export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long and include at least one symbol and one uppercase letter")
});

export type RegisterFormData = z.infer<typeof registerSchema>;
