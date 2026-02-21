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
    <div className="flex flex-col flex-1">
      <motion.section
        layout
        className={
          view === "rows"
            ? "flex flex-col gap-3 sm:gap-4"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        }
      >
        <AnimatePresence mode="popLayout">
          {currentItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderItem(item)}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.section>

      {totalPages > 1 && (
        <div className="mt-8 pt-6 border-t border-border flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setPage((p) => Math.max(1, p - 1))
                  }
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
                  onClick={() =>
                    setPage((p) =>
                      Math.min(totalPages, p + 1)
                    )
                  }
                  aria-disabled={page === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
