"use client";

import { useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import ViewToggle from "../reusables/view-toggle";
import ItemTypeToggle from "../reusables/item-type-toggle";
import SearchInput from "../reusables/search-input";

interface FiltersProps {
  view: "rows" | "grid";
  searchInput: string;
  onSearchInputChange: (val: string) => void;
  onViewChange: React.Dispatch<React.SetStateAction<"rows" | "grid">>;
  onTypeFilterChange: (type: string) => void;
  onSortChange?: (sort: string) => void;
}

export function SessionFilters({
  view,
  searchInput,
  onSearchInputChange,
  onViewChange,
  onTypeFilterChange,
  onSortChange,
}: FiltersProps) {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        onViewChange("grid");
      }
    };

    handleResize(mediaQuery);
    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [onViewChange]);

  return (
    <section className="w-full bg-background sticky top-0 z-10 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="container py-3">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">

          {/* LEFT SIDE */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-1">

            <div className="flex-1 min-w-[200px]">
              <SearchInput
                value={searchInput}
                onChange={onSearchInputChange}
                placeholder="Search in session..."
              />
            </div>

            {/* Hidden below md */}
            <div className="hidden md:block">
              <ViewToggle
                value={view}
                onChange={onViewChange}
              />
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:gap-4">

            <div className="overflow-x-auto lg:overflow-visible">
              <ItemTypeToggle onTypeFilterChange={onTypeFilterChange} />
            </div>

            <Select onValueChange={onSortChange}>
              <SelectTrigger className="w-full sm:w-[170px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="az">Name A-Z</SelectItem>
              </SelectContent>
            </Select>

          </div>

        </div>

      </div>
    </section>
  );
}
