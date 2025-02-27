import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { EventForm } from "../_components/event-form";

export default function CreationPage() {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/events">My Events</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>Create Event</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="my-4 flex w-full flex-col max-w-7xl mx-auto px-2 sm:px-6 lg:px-6">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
            Créer un événement
          </h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Remplissez les informations ci-dessous pour créer votre événement.
          </p>
        </div>
        <EventForm />
      </div>
    </div>
  );
}
