import { ModeToggle } from "../../../components/theme/theme-toggle";
import Logo from "./logo";

export default function Header() {
    return (
        <div className="w-full flex border-b border-secondary bg-card">
            <div className="flex-1 flex items-center justify-between px-12 py-3 bg-transparent max-w-7xl mx-auto">
                <Logo />
                <ModeToggle />
            </div>
        </div>
    )
}