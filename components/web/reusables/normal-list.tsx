"use client";

import { AnimatePresence, motion } from "framer-motion";

interface NormalListProps<T extends { id: string }> {
  items: T[];
  view: "rows" | "grid";
  renderItem: (item: T) => React.ReactNode;
}

export function NormalList<T extends { id: string }>({
  items,
  view,
  renderItem,
}: NormalListProps<T>) {
  return (
    <motion.section
      layout
      className={
        view === "rows"
          ? "flex flex-col gap-3 sm:gap-4"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      }
    >
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
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
  );
}
