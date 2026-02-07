"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginatedListProps {
  items: React.JSX.Element[];             // already mapped JSX elements
  view: "rows" | "grid";            // layout mode
  pageSize?: number;                // items per page
}

export function PaginatedList({ items, view, pageSize = 6 }: PaginatedListProps) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(items.length / pageSize);
  const start = (page - 1) * pageSize;
  const currentItems = items.slice(start, start + pageSize);

  return (
    <div className="flex flex-col min-h-full gap-6">
      {/* Layout wrapper */}
      <section
        className={
          view === "rows"
            ? "flex flex-col gap-3 sm:gap-4 flex-1"
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1"
        }
      >
        {currentItems}
      </section>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                aria-disabled={page === 1}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i + 1}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                aria-disabled={page === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
