import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import AuthGuard from "@/components/admin/AuthGuard";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard>
            <SidebarProvider>
                <AppSidebar />
                <main className="flex flex-1 flex-col overflow-hidden bg-background">
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <h1 className="text-lg font-semibold tracking-tight">Dashboard Overview</h1>
                    </header>
                    <div className="flex-1 overflow-y-auto p-6">
                        {children}
                    </div>
                </main>
            </SidebarProvider>
        </AuthGuard>
    );
}
