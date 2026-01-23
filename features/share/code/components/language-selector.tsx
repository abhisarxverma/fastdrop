import * as React from "react";
import { FaCheck } from "react-icons/fa";
import { HiChevronUpDown } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { codeLanguageInfo } from "../../common/constants/monaco-languages";

type LanguageSelectProps = {
    value?: string;
    onChange: (val: string) => void;
};

export const LanguageSelector: React.FC<LanguageSelectProps> = ({
    value = "java",
    onChange,
}) => {
    const [open, setOpen] = React.useState(false);

    const selectedLanguage = codeLanguageInfo[value];
    const SelectedIcon = selectedLanguage?.icon;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-lg justify-between"
                >
                    <div className="flex items-center gap-2">
                        {SelectedIcon && <SelectedIcon className="w-4 h-4" />}
                        {selectedLanguage.name || "Select language..."}
                    </div>
                    <HiChevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-xsm p-0">
                <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                            {Object.entries(codeLanguageInfo).map(([id, info]) => {
                                const Icon = info.icon;
                                return (
                                    <CommandItem
                                        key={id}
                                        value={id}
                                        onSelect={(currentValue: string) => {
                                            onChange(currentValue);
                                            setOpen(false);
                                        }}
                                    >
                                        <FaCheck
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === id ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        <Icon className="mr-2 h-4 w-4" />
                                        {info.name}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
