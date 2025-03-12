import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/admin/Appsidebar"
import { UserProvider } from "@auth0/nextjs-auth0/client"
import { Providers } from "../../provider"

export default function Layout({ children }) {
  return (
    <UserProvider>
    <Providers>
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
   
</Providers>
</UserProvider>
  )
}
