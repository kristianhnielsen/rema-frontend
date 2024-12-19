import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import RemaLogo from "@/components/RemaLogo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <SidebarProvider className="block md:flex">
          <AppSidebar />
          <div className="max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
            <header className="flex justify-between sticky top-0 bg-white py-4 z-50 items-center gap-4 border-b-4 border-rema-primary">
              <div className="flex gap-4 w-full items-center">
                <RemaLogo />
                <h1 className="text-lg md:text-3xl font-semibold leading-tight">
                  Rema 1000 <br /> Price Tracker
                </h1>
              </div>
              <SidebarTrigger className="md:hidden [&_svg]:size-full size-12 bg-transparent [&_svg]:stroke-rema-primary" />
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
