import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ShareItemType } from "@/types/share-items"

interface ItemTypeToggleProps {
    onTypeFilterChange: (val: ShareItemType | "all") => void;
}

export default function ItemTypeToggle({ onTypeFilterChange }: ItemTypeToggleProps) {

    return (
        <ToggleGroup
            type="single"
            className="border bg-muted/70"
            defaultValue="all"
            onValueChange={(value) => onTypeFilterChange?.(value as ShareItemType | "all")}
        >
            {["all", "links", "files", "code", "text"].map((type) => (
                <ToggleGroupItem
                    key={type}
                    value={type}
                    className="capitalize"
                >
                    {type}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    )

}