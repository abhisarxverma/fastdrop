import { LuLoader } from "react-icons/lu";

export default function Loading(){
    return (
        <div className="h-full w-full flex items-center justify-center">
            <LuLoader className="animate-spin" /> Loading shared content
        </div>
    )
}