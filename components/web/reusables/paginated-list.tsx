"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginatedListProps<T extends { id: string }> {
  items: T[];
  view: "rows" | "grid";
  pageSize?: number;
  renderItem: (item: T) => React.ReactNode;
}

export function PaginatedList<T extends { id: string }>({
  items,
  view,
  pageSize = 6,
  renderItem,
}: PaginatedListProps<T>) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(items.length / pageSize);
  const start = (page - 1) * pageSize;
  const currentItems = items.slice(start, start + pageSize);

  return (
    <div className="flex flex-col min-h-full gap-6">
      {/* List */}
      <motion.section
        layout
        className={
          view === "rows"
            ? "flex flex-col gap-3 sm:gap-4 flex-1"
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1"
        }
      >
        <AnimatePresence mode="popLayout">
          {currentItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
            >
              {renderItem(item)}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.section>

      {/* Pagination */}
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
