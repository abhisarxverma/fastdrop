import clsx from "clsx";


interface PageShellProps {
    children: React.ReactNode;
    addClassName?: string;
}

export default function PageShell({ children, addClassName }: PageShellProps ) {
  return (
    <div
      className={clsx(
        "flex-1 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8",
        addClassName
      )}
    >
      {children}
    </div>
  );
}
