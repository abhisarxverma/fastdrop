import { Button } from "@/components/ui/button";
import { LuGrid2X2, LuRows2 } from "react-icons/lu";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import SearchInput from "../reusables/search-input";
import { FaPlus } from "react-icons/fa";

interface DashboardToolbarProps { 
    view: "rows" | "grid"; 
    onViewChange: (val: "rows" | "grid") => void; 
    searchInput: string;
    onSearchInputChange: (val: string) => void;
    disableStart: boolean;
    onStartClick: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DashboardToolbar({ view, onViewChange, searchInput, onSearchInputChange, disableStart=false, onStartClick }: DashboardToolbarProps) {
  return (
    <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-6">
        <SearchInput value={searchInput} onChange={onSearchInputChange} />
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm md:text-md font-semibold uppercase text-muted-foreground">
            View
          </span>

          <ToggleGroup
            type="single"
            defaultValue="rows"
            className="border bg-muted"
            value={view}
            onValueChange={(val) => val && onViewChange(val as "rows" | "grid")}
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
        </div>
      </div>

      <Button disabled={disableStart} onClick={() => onStartClick(true)} size="lg" className="rounded-[8px] flex items-center justify-center gap-2">
        <FaPlus />
        Start a session
      </Button>
    </section>
  );
}
