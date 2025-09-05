import * as z from "zod";

const schoolSchema = z.object({
  name: z.string().min(1, "School name is required"),
  email_id: z
    .string()
    .min(1, "Email is required")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    ),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  contact: z
    .string()
    .regex(/^[0-9]{10}$/, "Contact must be a valid 10-digit number"),
  image: z
  .any()
  .refine((file) => file instanceof File, "Please select an image file")
  .refine((file) => file?.size <= 2 * 1024 * 1024, "Max size 2MB")
  .refine(
    (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file?.type),
    "Only JPG/PNG allowed"
  )
});

export default schoolSchema;