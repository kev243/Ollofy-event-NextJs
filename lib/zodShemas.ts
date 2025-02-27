import { z } from "zod";

export const OrganizationShema = z.object({
  name: z.string().min(4, "The name must contain at least 4 characters"),
});

// Schéma de validation pour le formulaire creation d'événement
export const eventFormSchema = z.object({
  name: z.string().min(3, {
    message: "Le nom doit contenir au moins 3 caractères",
  }),
  description: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères",
  }),
  slug: z
    .string()
    .min(3, {
      message: "Le slug doit contenir au moins 3 caractères",
    })
    .regex(/^[a-z0-9-]+$/, {
      message:
        "Le slug ne peut contenir que des lettres minuscules, des chiffres et des tirets",
    }),
  // url: z.string().url({
  //   message: "Veuillez entrer une URL valide",
  // }),
  location: z.string().optional(),
  image: z.string().optional(),
  startDate: z.date({
    required_error: "Veuillez sélectionner une date de début",
  }),
  endDate: z.date().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  price: z.coerce.number().min(0, {
    message: "Le prix ne peut pas être négatif",
  }),
  currency: z.string().optional(),
  moreInfo: z.string().optional(),
  organizationId: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
});
