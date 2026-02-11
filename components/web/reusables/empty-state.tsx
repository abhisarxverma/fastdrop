import { IconType } from "react-icons/lib";

interface EmptyStateProps {
  Icon: IconType;
  title: string;
  subtitle: string;
}

export function EmptyState({ Icon, title, subtitle }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-12 sm:py-16 text-center">
      <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
      <h3 className="font-semibold text-base sm:text-lg md:text-xl">
        {title}
      </h3>
      <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-sm">
        {subtitle}
      </p>
    </div>
  );
}
