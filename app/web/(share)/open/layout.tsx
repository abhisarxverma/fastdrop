import { Badge } from "@/components/ui/badge";
import PageShell from "../../_components/page-shell";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";


export default function OpenShareLayout({ children }: { children: React.ReactNode }) {
    return (
        <PageShell addClassName="webapp w-5xl max-w-5xl h-full mx-auto flex flex-col gap-7 py-10">
            <div className="flex items-center gap-2">
                <Link href="/web" >
                    <FaArrowLeft className="text-muted-foreground" size="15" />
                </Link>
                <Badge>In Open Space</Badge>
            </div>
            {children}
        </PageShell>
    )
}