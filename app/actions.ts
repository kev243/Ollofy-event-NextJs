"use server";

import prisma from "@/lib/prisma";
import { OrganizationShema } from "@/lib/zodShemas";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";

export async function checkAndAddUser(
  email: string,
  firstName: string,
  lastName: string
) {
  if (!email || !firstName || !lastName) {
    throw new Error("Email, firstName et lastName sont requis.");
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export async function createOrganization(name: string) {
  try {
    if (!name || name.trim() === "") {
      return { message: "Organization name is required." };
    }
    // Get the userId from auth() -- if null, the user is not signed in
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user || !user.emailAddresses?.[0]?.emailAddress) {
      return { message: "No Logged In User" };
    }

    const email = user.emailAddresses?.[0]?.emailAddress;

    // Creation de l'organisation et on l'associe à l'utilisateur
    const organization = await prisma.organization.create({
      data: {
        name,
        users: {
          connect: { email: email },
        },
      },
    });

    // Mise à jour de l'utilisateur pour associer l'organisation
    const userUpdate = await prisma.user.update({
      where: { email: email },
      data: {
        organizationId: organization.id,
        nbrOrganization: {
          increment: 1,
        },
      },
    });

    // Mise à jour des métadonnées dans Clerk
    const client = await clerkClient();
    if (organization && userUpdate) {
      const res = await client.users.updateUser(userId, {
        publicMetadata: {
          organizationComplete: true,
        },
      });

      return { message: res.publicMetadata };
    }
  } catch (error) {
    console.error("Error during onboarding process:", error);
    return { error: "There was an error completing the onboarding process." };
  }
}
