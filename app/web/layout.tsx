import { AppHeader } from "@/components/web/layout/app-header"
import Container from "@/components/layouts/container"
import AuthProvider from "@/providers/auth-provider"
import { GeoProvider } from "@/providers/geo-provider"

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <GeoProvider>
                <div className="webapp flex-1 flex flex-col">
                    <AppHeader />
                    <main className="flex-1 w-full h-full flex flex-col">
                        <Container className="flex-1 h-full flex flex-col">{children}</Container>
                    </main>
                </div>
            </GeoProvider>
        </AuthProvider>
    )
}
