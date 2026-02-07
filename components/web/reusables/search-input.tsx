"use client";

import { Input } from "@/components/ui/input";
import { LuSearch } from "react-icons/lu";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  delay?: number;
}

export default function SearchInput({
  value,
  onChange,
  delay = 400,
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(value);
  const [debouncedValue] = useDebounce(internalValue, delay);

  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, value, onChange]);

  return (
    <div className="relative w-full sm:w-64">
      <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        placeholder="Search sessions..."
        className="pl-9 text-sm sm:text-base"
      />
    </div>
  );
}
