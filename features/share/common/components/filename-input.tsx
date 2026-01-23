
import { Input } from "@/components/ui/input"
import { IconType } from "react-icons";

interface FileNameInputProps {
    value: string
    onChange: (value: string) => void
    Icon?: IconType
    extension: string
}

export default function FileNameInput({ value, onChange, Icon, extension }: FileNameInputProps) {
    
    return (
        <div className="flex max-w-sm w-full border border-input overflow-hidden">
            {Icon && (
            <div className="flex items-center justify-center bg-primary/20 border border-primary/50 px-4 text-lg font-medium text-secondary-foreground whitespace-nowrap">
                {<Icon />}
            </div>)}

            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Enter file name"
            />

            <p className="flex items-center px-4 bg-secondary text-sm font-medium text-secondary-foreground whitespace-nowrap">
                . {extension}
            </p>
        </div>
    )
}
