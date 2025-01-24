"use client";

import Link from "next/link";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export default function SidebarLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const { toggleSidebar, isMobile } = useSidebar();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        {isMobile ? (
          <Link
            href={href}
            onClick={() => {
              toggleSidebar();
            }}
          >
            {children}
          </Link>
        ) : (
          <Link href={href}>{children}</Link>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
