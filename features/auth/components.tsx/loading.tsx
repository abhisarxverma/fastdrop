import { LuLoaderCircle } from "react-icons/lu";

export default function AuthLoading() {
    return (
        <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col gap-2 items-center">
                <LuLoaderCircle className="animate-spin" />
                <p className="text-lg font-semi">Welcome, please wait</p>
            </div>
        </div>
    )
}