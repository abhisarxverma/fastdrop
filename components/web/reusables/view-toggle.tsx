import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LuGrid2X2, LuRows2 } from "react-icons/lu";

interface ViewToggleProps {
    value: "rows" | "grid";
    onChange: (val: "rows" | "grid") => void;
}

export default function ViewToggle({ value, onChange }: ViewToggleProps) {
    return (
        <ToggleGroup
            type="single"
            defaultValue="rows"
            className="border bg-muted/70"
            value={value}
            onValueChange={(val) => val && onChange(val as "rows" | "grid")}
        >
            <ToggleGroupItem
                value="rows"
                aria-label="Rows view"
                className="rounded-md"
            >
                <LuRows2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
                value="grid"
                aria-label="Grid view"
                className="rounded-md"
            >
                <LuGrid2X2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </ToggleGroupItem>
        </ToggleGroup>
    )
}