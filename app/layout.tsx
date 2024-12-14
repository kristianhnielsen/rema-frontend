import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <SidebarProvider>
          <AppSidebar />
          <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                Product List
              </h1>
              {children}
            </div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
