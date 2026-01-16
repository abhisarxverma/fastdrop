import { ModeToggle } from "../../../components/theme/theme-toggle";
import Logo from "./logo";

export default function Header() {
    return (
        <div className="flex items-center justify-between px-12 py-3 border-b border-secondary bg-card/40">
            <Logo />
            <ModeToggle />
        </div>
    )
}