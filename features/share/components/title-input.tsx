import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TitleInputProps {
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
}

export default function TitleInput({ value, onChange }: TitleInputProps ) {
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
            <Input 
                
                id="title"
                placeholder="Title...."
                className="w-full max-w-xl h-10 text-2xl"
                value={value}
                onChange={(e) => onChange(e.target.value)}
             />
        </div>
    )
}

