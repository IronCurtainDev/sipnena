import type { Permission } from "@repo/contracts";
import type { LinkProps } from "@tanstack/react-router";
import {
  Building2,
  FolderOpen,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { adminAreaPermissions } from "@/features/access/use-access";

export type NavContext = {
  canAny: (...permissions: Permission[]) => boolean;
  organizationsEnabled: boolean;
};

export type NavItem = {
  to: NonNullable<LinkProps["to"]>;
  label: string;
  icon: LucideIcon;
  group: (typeof navGroups)[number]["id"];
  visible?: (context: NavContext) => boolean;
};

export const navGroups = [
  { id: "workspace", label: "Workspace" },
  { id: "admin", label: "Administration" },
] as const;

// Register a page here to show it in the sidebar and the mobile menu.
export const navItems: NavItem[] = [
  { to: "/account", label: "Account", icon: UserRound, group: "workspace" },
  { to: "/files", label: "Files", icon: FolderOpen, group: "workspace" },
  {
    to: "/organizations",
    label: "Organizations",
    icon: Building2,
    group: "workspace",
    visible: ({ organizationsEnabled }) => organizationsEnabled,
  },
  {
    to: "/admin",
    label: "Admin",
    icon: ShieldCheck,
    group: "admin",
    visible: ({ canAny }) => canAny(...adminAreaPermissions),
  },
];
