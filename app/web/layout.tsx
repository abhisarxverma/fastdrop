import Header from "@/app/web/_components/header";
import WebappProvider from "@/providers/webapp-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <WebappProvider>
                <div className="webapp flex-1 flex flex-col items-center">
                    <Header />
                    <main className="flex-1 w-full h-full  flex flex-col max-w-7xl">
                        {children}
                    </main>
                </div>
            </WebappProvider>
        </>
    )
}