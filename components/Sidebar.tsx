import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { fetchDepartments } from "@/lib/api";
import Link from "next/link";

export async function AppSidebar() {
  const departments = await fetchDepartments();
  const aplhabeticallySortedDepartments = departments.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/"}>Alle produkter</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/tilbud"}>Tilbud</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/statistik"}>Statistik og Trends</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Afdelinger</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {aplhabeticallySortedDepartments.map((department) => (
                <SidebarMenuItem key={department.id}>
                  <SidebarMenuButton asChild>
                    <Link href={`/afdeling/${department.id}`}>
                      <span>{department.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
