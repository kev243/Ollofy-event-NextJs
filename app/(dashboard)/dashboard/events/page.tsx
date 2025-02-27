import { BtnCreationCard } from "@/app/(dashboard)/dashboard/events/_components/BtnCreationCard";
import React from "react";
import CardEvent from "./_components/CardEvent";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function EventPage() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold">Events</h1>
        <Link href="/dashboard/events/new">
          <Button className="flex items-center rounded-full gap-x-2">
            <Plus />
            <span>Add Event</span>
          </Button>
        </Link>
      </div>
      <div className=" w-full grid grid-cols-1 lg:grid-cols-3  xl:grid-cols-4 sm:grid-cols-2 gap-5">
        <CardEvent />
        <CardEvent />
        <CardEvent />
        <CardEvent />
        <CardEvent />
        <CardEvent />
      </div>
    </div>
  );
}
