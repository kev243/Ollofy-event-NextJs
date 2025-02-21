"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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

export function AppSidebar() {
  const pathname = usePathname(); // on récupère l'URL actuelle
  const { user } = useUser(); // on récupère le user connecter
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
                    Organization Inc
                  </span>
                  <span className="truncate text-xs">Free</span>
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
