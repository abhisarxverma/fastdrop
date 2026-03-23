import { Button } from "@/components/ui/button";
import SearchInput from "../reusables/search-input";
import { FaPlus } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import ViewToggle from "../reusables/view-toggle";

interface DashboardToolbarProps { 
  view: "rows" | "grid"; 
  onViewChange: (val: "rows" | "grid") => void; 
  searchInput: string;
  onSearchInputChange: (val: string) => void;
  disableStart?: boolean;
  onStartClick: React.Dispatch<React.SetStateAction<boolean>>;
  onJoin: () => void;
}

export default function DashboardToolbar({
  view,
  onViewChange,
  searchInput,
  onSearchInputChange,
  disableStart = false,
  onStartClick,
  onJoin,
}: DashboardToolbarProps) {
  return (
    <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-6">
        <SearchInput
          value={searchInput}
          onChange={onSearchInputChange}
          addClass="sm:w-75"
          placeholder="Search sessions...."
        />
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm md:text-md font-semibold uppercase text-muted-foreground">
            View
          </span>
          <ViewToggle value={view} onChange={onViewChange} />
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onJoin}
          size="lg"
          variant="secondary"
          className="rounded-[8px] flex items-center justify-center gap-2"
        >
          <FaKey />
          Join with code
        </Button>

        <Button
          disabled={disableStart}
          onClick={() => onStartClick(true)}
          size="lg"
          className="rounded-[8px] flex items-center justify-center gap-2"
        >
          <FaPlus />
          Start a session
        </Button>
      </div>
    </section>
  );
}
