import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { fetchDepartments } from "@/lib/api";
import SidebarLink from "./SidebarLink";

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
              <SidebarLink href="/">Alle Produkter</SidebarLink>
              <SidebarLink href="/tilbud">Tilbud</SidebarLink>
              <SidebarLink href="/trends">Trends</SidebarLink>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Afdelinger</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {aplhabeticallySortedDepartments.map((department) => (
                <SidebarLink
                  key={department.id}
                  href={`/afdeling/${department.id}`}
                >
                  <span>{department.name}</span>
                </SidebarLink>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
