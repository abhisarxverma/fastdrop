import { ShieldCheck } from "lucide-react";


export function AppFooter() {
    return (
        <footer className="pt-6 flex justify-center">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
                <ShieldCheck className="size-4" />
                Public and Anonymous sharing
            </p>
        </footer>
    );
}