"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarIcon,
  Clock,
  ImageIcon,
  InfoIcon,
  MapPinIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
// import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils";
import { useOrganizationStore } from "@/store/useOrganizationStore";
import { eventFormSchema } from "@/lib/zodShemas";
import { zodResolver } from "@hookform/resolvers/zod";

type EventFormValues = z.infer<typeof eventFormSchema>;

export function EventForm() {
  const {
    // organizations,
    // setOrganizations,
    activeOrganization,
    // setActiveOrganization,
  } = useOrganizationStore();

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Valeurs par défaut du formulaire
  const defaultValues: Partial<EventFormValues> = {
    name: "",
    description: "",
    slug: "",
    location: "",
    price: 0,
    currency: "",
    status: "DRAFT",
  };

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues,
  });

  // Fonction pour générer un slug à partir du nom
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  // Mise à jour du slug lorsque le nom change
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    form.setValue("name", name);
    form.setValue("slug", generateSlug(name));
  };

  // Gestion du téléchargement d'image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Dans une application réelle, vous téléchargeriez l'image sur un service de stockage
      // et utiliseriez l'URL retournée. Ici, nous créons simplement une URL locale pour la prévisualisation.
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      form.setValue("image", imageUrl);
    }
  };

  // Soumission du formulaire
  //    async function onSubmit(data: EventFormValues, status: "DRAFT" | "PUBLISHED") {
  //     setIsSubmitting(true)
  //     data.status = status

  //     try {
  //       // Dans une application réelle, vous appelleriez une action serveur ici
  //       await createEvent(data)
  //       toast({
  //         title: "Événement créé",
  //         description:
  //           status === "PUBLISHED"
  //             ? "Votre événement a été publié avec succès."
  //             : "Votre événement a été enregistré comme brouillon.",
  //       })
  //       router.push("/events")
  //     } catch (error) {
  //       console.error(error)
  //       toast({
  //         title: "Erreur",
  //         description: "Une erreur est survenue lors de la création de l'événement.",
  //         variant: "destructive",
  //       })
  //     } finally {
  //       setIsSubmitting(false)
  //     }
  //   }

  return (
    <Form {...form}>
      <form className="space-y-6 md:space-y-8">
        <Card className="border-0 shadow-sm sm:border md:shadow">
          <CardHeader className="space-y-1 md:space-y-2">
            <CardTitle className="text-xl md:text-2xl">
              Informations générales
            </CardTitle>
            <CardDescription className="text-sm md:text-base">
              Entrez les informations principales de votre événement.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-6">
            {/* Nom de l'événement */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium md:text-base">
                    Nom de l'événement*
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Conférence Annuelle Tech 2025"
                      className="h-10 md:h-11"
                      {...field}
                      onChange={onNameChange}
                    />
                  </FormControl>
                  <FormMessage className="text-xs md:text-sm" />
                </FormItem>
              )}
            />

            {/* Slug */}
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium md:text-base">
                    Slug*
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="conference-annuelle-tech-2025"
                      className="h-10 md:h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs md:text-sm">
                    L'identifiant unique de votre événement dans l'URL.
                  </FormDescription>
                  <FormMessage className="text-xs md:text-sm" />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium md:text-base">
                    Description*
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez votre événement en détail..."
                      className="min-h-[120px] md:min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs md:text-sm" />
                </FormItem>
              )}
            />

            {/* Lieu */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium md:text-base">
                    Lieu
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <MapPinIcon className="mr-2 h-4 w-4 text-muted-foreground md:h-5 md:w-5" />
                      <Input
                        placeholder="Canada, Toronto ou Événement en ligne"
                        className="h-10 md:h-11"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs md:text-sm" />
                </FormItem>
              )}
            />

            {/* Image */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium md:text-base">
                    Image de l'événement
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="flex h-32 w-32 items-center justify-center rounded-md border border-dashed sm:h-40 sm:w-40">
                        {imagePreview ? (
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Prévisualisation"
                            className="h-full w-full rounded-md object-cover"
                          />
                        ) : (
                          <ImageIcon className="h-8 w-8 text-muted-foreground md:h-10 md:w-10" />
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="w-full max-w-sm text-sm md:text-base"
                        />
                        <FormDescription className="text-xs md:text-sm">
                          Téléchargez une image représentative de votre
                          événement.
                        </FormDescription>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs md:text-sm" />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Carte Date et heure */}
        <Card className="border-0 shadow-sm sm:border md:shadow">
          <CardHeader className="space-y-1 md:space-y-2">
            <CardTitle className="text-xl md:text-2xl">Date et heure</CardTitle>
            <CardDescription className="text-sm md:text-base">
              Définissez quand votre événement aura lieu.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
              {/* Date de début */}
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-sm font-medium md:text-base">
                      Date de début*
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "h-10 w-full pl-3 text-left font-normal md:h-11",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              new Date(field.value).toLocaleDateString()
                            ) : (
                              <span>Sélectionner une date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-xs md:text-sm" />
                  </FormItem>
                )}
              />

              {/* Date de fin */}
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-sm font-medium md:text-base">
                      Date de fin
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "h-10 w-full pl-3 text-left font-normal md:h-11",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              new Date(field.value).toLocaleDateString()
                            ) : (
                              <span>Sélectionner une date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value || undefined}
                          onSelect={field.onChange}
                          initialFocus
                          disabled={(date) => {
                            const startDate = form.getValues("startDate");
                            return startDate ? date < startDate : false;
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription className="text-xs md:text-sm">
                      Optionnel. Laissez vide pour un événement d'une journée.
                    </FormDescription>
                    <FormMessage className="text-xs md:text-sm" />
                  </FormItem>
                )}
              />

              {/* Heure de début */}
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium md:text-base">
                      Heure de début
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground md:h-5 md:w-5" />
                        <Input
                          type="time"
                          className="h-10 md:h-11"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs md:text-sm" />
                  </FormItem>
                )}
              />

              {/* Heure de fin */}
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium md:text-base">
                      Heure de fin
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground md:h-5 md:w-5" />
                        <Input
                          type="time"
                          className="h-10 md:h-11"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs md:text-sm" />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Carte Tarification et détails */}
        <Card className="border-0 shadow-sm sm:border md:shadow">
          <CardHeader className="space-y-1 md:space-y-2">
            <CardTitle className="text-xl md:text-2xl">
              Tarification et détails supplémentaires
            </CardTitle>
            <CardDescription className="text-sm md:text-base">
              Définissez le prix et ajoutez des informations complémentaires.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Prix */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix*</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                      <FormField
                        control={form.control}
                        name="currency"
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Devise" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="CAD">🇨🇦 CAD</SelectItem>
                              <SelectItem value="USD">🇺🇸 USD</SelectItem>
                              <SelectItem value="EUR">🇪🇺 EUR</SelectItem>
                              <SelectItem value="GBP">🇬🇧 GBP</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Entrez 0 pour un événement gratuit.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Informations supplémentaires */}
            <FormField
              control={form.control}
              name="moreInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium md:text-base">
                    Informations supplémentaires
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-start">
                      <InfoIcon className="mr-2 mt-2 h-4 w-4 text-muted-foreground md:h-5 md:w-5" />
                      <Textarea
                        placeholder="Détails supplémentaires, instructions spéciales, etc."
                        className="min-h-[100px] md:min-h-[120px]"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs md:text-sm" />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="outline"
              // onClick={() => onSubmit(form.getValues(), "DRAFT")}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              Enregistrer comme brouillon
            </Button>
            <Button
              type="button"
              onClick={() => {
                // form.handleSubmit((data) => onSubmit(data, "PUBLISHED"))()
              }}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Création en cours..." : "Publier l'événement"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
