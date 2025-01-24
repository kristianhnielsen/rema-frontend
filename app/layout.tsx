import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import Logo from "@/components/Logo";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className="scroll-smooth scroll-pt-48">
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body>
        <SidebarProvider>
          <AppSidebar />
          <div className="px-4 pb-6 sm:px-6 lg:px-8 w-full">
            <header className="flex justify-between sticky top-0 bg-white py-4 z-50 items-center gap-4 border-b-4 border-rema-primary">
              <div className="flex gap-4 w-full items-center">
                <Link href={"/"}>
                  <Logo size="lg" className="hidden md:block" />
                </Link>
                <Link href={"/"}>
                  <Logo size="sm" className="md:hidden" />
                </Link>
                <h1 className="sr-only">Rema Data</h1>
              </div>
              <SidebarTrigger className="md:hidden [&_svg]:size-full size-12 bg-transparent [&_svg]:stroke-rema-primary" />
            </header>
            <main>
              <div className="max-w-7xl mr-7 md:mx-0 py-12 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
