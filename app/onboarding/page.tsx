"use client";

import type React from "react";

import { useState } from "react";
import { CheckCircle, Tickets } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const backgroundStyle2 = `
  .bg-pattern {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    background-image:
      linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 2px),
      linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 2px);
    background-size: 100px 100px; /* Taille des carrés */
    pointer-events: none;
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 2;
  }
`;

export default function OnboardingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orgName, setOrgName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {};
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "radial-gradient(circle at center, #1E40AF, #000000)",
      }}
    >
      <style>{backgroundStyle2}</style>
      <div className="bg-pattern"></div>
      <div className="content w-full">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <a href="/" className=" flex  items-center gap-1 font-medium mb-4">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Tickets className="size-4" />
              </div>
              Ollofy
            </a>
            <CardTitle>Create Organization</CardTitle>
            <CardDescription>
              {/* Get started by creating your organization. */}
              Start by creating your organization. you can always modify it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="orgName"
                  placeholder="Enter organization name"
                  // value={orgName}
                  // onChange={(e) => setOrgName(e.target.value)}
                  required
                  minLength={2}
                  maxLength={50}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || orgName.length < 2}
              >
                {isSubmitting ? "Creating..." : "Create Organization"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
