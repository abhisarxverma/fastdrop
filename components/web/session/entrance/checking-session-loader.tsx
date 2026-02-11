import { Loader2 } from "lucide-react";

export default function CheckingSessionLoader() {
    return (
        <div className="h-full flex-1 flex flex-col items-center justify-center gap-3">
            <Loader2 className="animate-spin text-primary" size="40" />
            Loading session
        </div>
    )
}