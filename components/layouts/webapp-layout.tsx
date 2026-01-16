import Header from "../../app/web/_components/header";
import WebappProvider from "@/providers/webapp-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <WebappProvider>
                <Header />
                <main className="flex">
                    {children}
                </main>
            </WebappProvider>
        </div>
    )
}