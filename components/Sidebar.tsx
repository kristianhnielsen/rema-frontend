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
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
              <SidebarLink href="/">Hjem</SidebarLink>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarLink href="/produkt">Alle Produkter</SidebarLink>
              <CollapsibleMenu title="Produkter i afdelinger">
                {aplhabeticallySortedDepartments.map((department) => (
                  <SidebarLink
                    key={"varer" + department.id}
                    href={`/afdeling/${department.id}`}
                  >
                    <span>{department.name}</span>
                  </SidebarLink>
                ))}
              </CollapsibleMenu>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Tilbud</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarLink href="/tilbud/top10">Top 10</SidebarLink>
              <SidebarLink href="/tilbud/underhalv">Under 50%</SidebarLink>
              <CollapsibleMenu title="Tilbud i afdelinger">
                {aplhabeticallySortedDepartments.map((department) => (
                  <SidebarLink
                    key={"tilbud" + department.id}
                    href={`/tilbud/afdeling/${department.id}`}
                  >
                    <span>{department.name}</span>
                  </SidebarLink>
                ))}
              </CollapsibleMenu>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel>Andet</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarLink href="/trends">Trends</SidebarLink>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function CollapsibleMenu({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Collapsible className="group/collapsible p-0">
      <SidebarGroup>
        <SidebarGroupLabel asChild className="hover:bg-sidebar-accent">
          <CollapsibleTrigger>
            {title}
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>{children}</SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
