import {
  Calendar,
  CreditCard,
  LayoutDashboard,
  LifeBuoy,
  PersonStanding,
  Send,
  Settings,
  Ticket,
} from "lucide-react";

// Menu items.
export const menu = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Events",
    url: "/dashboard/events",
    icon: Calendar,
  },
  {
    title: "Tickets",
    url: "#",
    icon: Ticket,
  },
  {
    title: "Payments",
    url: "#",
    icon: CreditCard,
  },
  {
    title: "Attendees",
    url: "#",
    icon: PersonStanding,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

//menu secondaire
export const navSecondary = [
  {
    title: "Support",
    url: "#",
    icon: LifeBuoy,
  },
  {
    title: "Feedback",
    url: "#",
    icon: Send,
  },
];
