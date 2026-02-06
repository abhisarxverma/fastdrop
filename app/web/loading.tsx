import PageShell from "@/components/layouts/page-shell";
import { Loader } from "lucide-react";

export default function Loading() {
    return (
        <PageShell addClassName="flex items-center justify-center">
            <Loader className="animate-spin" />
        </PageShell>
    )
}