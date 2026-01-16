import Header from "@/app/web/_components/header";
import WebappProvider from "@/providers/webapp-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <WebappProvider>
                <div className="webapp flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1 flex flex-col">
                        {children}
                    </main>
                </div>
            </WebappProvider>
        </>
    )
}