"use client";
import type React from "react";
import { useEffect, useState } from "react";
import { CheckCircle, Loader2, Tickets } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { checkAndAddUser, createOrganization } from "../actions";
import { useRouter } from "next/navigation";
import { backgroundStyle2 } from "@/lib/utils";

export default function OnboardingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Add user to database if not already present
    if (
      user?.primaryEmailAddress?.emailAddress &&
      user.firstName &&
      user.lastName
    ) {
      checkAndAddUser(
        user?.primaryEmailAddress?.emailAddress,
        user?.firstName,
        user?.lastName
      );
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await createOrganization(orgName);
      if (response?.message) {
        // Reloads the user's data from the Clerk API
        await user?.reload();
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Failed to create organization:", error);
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <main
        className="min-h-screen flex  items-center justify-center"
        style={{
          background: "radial-gradient(circle at center, #1E40AF, #000000)",
        }}
      >
        <style>{backgroundStyle2}</style>
        <div className="bg-pattern"></div>
        <div className="  content w-full">
          <Card className="   w-full max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center space-y-4">
                <CheckCircle className="w-12 h-12 text-green-500" />
                <CardTitle>Organization Created!</CardTitle>
                <CardDescription>
                  Your organization &quot;{orgName}&quot; has been successfully
                  created.
                </CardDescription>
              </div>
              <Button
                className="w-full mt-5 "
                onClick={() => router.push("/dashboard")} // Redirection au Dashboard
              >
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

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
              Start by creating your organization.You can always change it
              later.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="orgName"
                  placeholder="Enter organization name"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
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
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create Organization
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
