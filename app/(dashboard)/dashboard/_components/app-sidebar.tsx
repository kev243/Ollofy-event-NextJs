"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  // SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { menu, navSecondary } from "@/lib/menu";
import { Tickets } from "lucide-react";
import { NavSecondary } from "./nav-secondary";
import { usePathname } from "next/navigation";
import { NavUser } from "./nav-user";
import { useUser } from "@clerk/nextjs";
import { getOrganizationByEmail } from "@/app/actions";
import {
  Organization,
  useOrganizationStore,
} from "@/store/useOrganizationStore";
import { useEffect, useState } from "react";

export function AppSidebar() {
  const pathname = usePathname(); // on récupère l'URL actuelle
  const { user } = useUser(); // on récupère le user connecter
  const {
    // organizations,
    setOrganizations,
    activeOrganization,
    setActiveOrganization,
  } = useOrganizationStore();
  const [emailUser, setEmailUser] = useState("");

  // Effet pour mettre à jour l'email quand l'utilisateur change
  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setEmailUser(user.primaryEmailAddress.emailAddress);
    }
  }, [user]);

  // Effet pour récupérer l'organisation quand l'email change
  useEffect(() => {
    async function fetchOrganizations() {
      if (emailUser) {
        try {
          const res = await getOrganizationByEmail(emailUser);

          if (res) {
            const organization: Organization = {
              ...res,
              image: res.image ?? undefined,
            };
            setOrganizations([organization]); // on stocke l'organisation dans un tableau

            // Vérifie s'il n'y a pas déjà une organisation active
            if (!activeOrganization && organization) {
              setActiveOrganization(organization); // Définir l'organisation active
            }
          }
        } catch (error) {
          console.error("Error fetching organization:", error);
        }
      }
    }
    fetchOrganizations();
  }, [emailUser]);

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Tickets className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeOrganization?.name}
                  </span>
                  <span className="truncate  text-sm">
                    {activeOrganization?.plan}
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((item) => {
                const isActive = pathname === item.url; // Vérifie si l'URL correspond au menu
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        className={` ${isActive && " font-bold"}`}
                        href={item.url}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {user && (
          <NavUser
            user={{
              name: user.fullName ?? "",
              email:
                user.primaryEmailAddress?.emailAddress ?? "Email not provided", // 🔹 Utilise `??` au lieu de `||`
              avatar: user.imageUrl,
            }}
          />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
