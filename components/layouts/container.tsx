import React from "react";
import clsx from "clsx";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={clsx(
        "w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}
