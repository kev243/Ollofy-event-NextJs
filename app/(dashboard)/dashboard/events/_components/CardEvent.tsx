import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Share } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CardEvent() {
  return (
    <div className="w-full  bg-white border border-gray-200 rounded-3xl shadow-md dark:bg-gray-800 dark:border-gray-700 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer z-10">
      <div className="p-2 relative">
        <Image
          alt="Event image"
          src="/img/demo2.jpg"
          height={160}
          width={160}
          className="rounded-3xl object-cover w-full h-40"
        />
        {/* Badge */}
        <Badge className="absolute top-4 right-5 bg-green-500   ">
          Published
        </Badge>
      </div>

      <div className="px-3 pb-4 ">
        <h5 className="text-sm md:text-base font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
          Festival De Musique Apprécie Le Concert
        </h5>
        <div className="flex items-center ">
          <div className="flex gap-2 items-center">
            <Link href={""}>
              <Button size="sm" variant={"secondary"} className="rounded-full ">
                <Pencil className="" />
              </Button>
            </Link>
            <Button size="sm" className="rounded-full">
              <Share className="" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
