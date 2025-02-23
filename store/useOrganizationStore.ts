import { create } from "zustand";
import { persist } from "zustand/middleware";

// Définition du type pour une organisation
export type Organization = {
  id: string;
  name: string;
  image: string | undefined;
  nbrEvents: number;
  nbrUsers: number;
  plan: string;
};

// Définition du type pour le store Zustand

type OrganizationStore = {
  organizations: Organization[]; // Toutes les organisations de l'utilisateur
  activeOrganization: Organization | null; // Organisation actuellement sélectionnée
  setOrganizations: (orgs: Organization[]) => void; // Met à jour toutes les organisations
  setActiveOrganization: (org: Organization) => void; // Change l’organisation active
  clearActiveOrganization: () => void; // Réinitialiser l’organisation
};

export const useOrganizationStore = create<OrganizationStore>()(
  persist(
    (set) => ({
      organizations: [], // Liste des organisations de l'utilisateur
      activeOrganization: null, // Organisation actuellement sélectionnée
      setOrganizations: (orgs) => set({ organizations: orgs }),
      setActiveOrganization: (org) => set({ activeOrganization: org }),
      clearActiveOrganization: () => set({ activeOrganization: null }),
    }),
    { name: "organization-storage" } //Stocké dans localStorage
  )
);
