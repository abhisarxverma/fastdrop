import { Input } from "@/components/ui/input";
import { formatDateForInput } from "@/lib/utils/formatters";

interface ExpirySelectorProps {
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
}

export function ExpirySelector({ value, onChange }: ExpirySelectorProps) {

    const now = new Date();

    const minDate = new Date(now.getTime() + 10 * 60000);
    const minFormatted = formatDateForInput(minDate);

    const maxDate = new Date(now.getTime() + 7 * 24 * 60 * 60000);
    const maxFormatted = formatDateForInput(maxDate);

    return (
        <Input
            id="expiry"
            type="datetime-local"
            min={minFormatted}
            max={maxFormatted}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full transition-all sm:text-sm"
        />
    );
}
