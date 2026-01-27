import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5"; // Modern search icon

export default function SearchInput() {
    return (
        <div className="relative w-full max-w-sm h-full">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                <IoSearchOutline size={20} />
            </div>
            
            <Input
                placeholder="Search here...."
                className="w-full h-full pl-10 text-md py-2"
            />
        </div>
    )
}
