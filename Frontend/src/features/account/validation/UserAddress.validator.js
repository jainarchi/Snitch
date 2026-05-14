import {z} from 'zod'



export const userAddressSchema = z.object({
  label: z.enum(["Home", "Office", "Other"], {
    required_error: "Label is required",
    invalid_type_error: "Label must be Home, Office or Other",
  }),

  addressLine: z
    .string()
    .min(5, "Address line must be at least 5 characters")
    .max(200, "Address line too long"),

  city: z
    .string()
    .min(2, "City is required")
    .max(100, "City name too long"),

  state: z
    .string()
    .min(2, "State is required")
    .max(100, "State name too long"),

  pincode: z
    .string()
    .trim()
    .length(6, "Pincode must be 6 digits")
    .regex(/^[1-9][0-9]{5}$/, "Invalid Indian pincode"),

});

