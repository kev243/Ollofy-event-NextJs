import { z } from "zod";

export const OrganizationShema = z.object({
  name: z.string().min(4, "The name must contain at least 4 characters"),
});
