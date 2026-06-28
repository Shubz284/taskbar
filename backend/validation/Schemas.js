const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().min(3).email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least 1 uppercase letter",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must contain at least 1 lowercase letter",
    })
    .refine((val) => /[!@#$%^&*()_\-=+{}[\]|;:'",.<>/?]/.test(val), {
      message: "Password must contain at least 1 special character",
    }),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

const todosSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  description: z
    .string()
    .max(500, "Description is too long")
    .optional()
    .default(""),
  completed: z.boolean().optional().default(false),
});

module.exports = { registerSchema, loginSchema, todosSchema };
