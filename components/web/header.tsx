import { FaGithub } from "react-icons/fa";
import { ThemeToggle } from "../theme/theme-toggle";
import Logo from "./logo";

export default function Header() {
    return (
        <div className="w-full flex border-b border-secondary bg-accent/30">
            <div className="flex-1 flex items-center justify-between px-12 py-2 bg-transparent max-w-7xl mx-auto">
                <Logo />
                <div className="flex items-center gap-2">
                    <FaGithub size="20" />
                    <ThemeToggle />
                </div>
            </div>
        </div>
    )
}