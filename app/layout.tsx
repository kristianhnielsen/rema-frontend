import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import RemaLogo from "@/components/RemaLogo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <SidebarProvider>
          <AppSidebar />
          <div className="max-w-7xl py-6 sm:px-6 lg:px-8">
            <header className="flex items-center gap-4">
              <RemaLogo />
              <h1 className="text-5xl font-semibold">
                Rema 1000 Price Tracker
              </h1>
            </header>
            <main>
              <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
