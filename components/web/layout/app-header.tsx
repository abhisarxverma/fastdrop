import ProximityIndicator from "../indicators/proximity-indicator";
import Container from "../../layouts/container";
import Logo from "../reusables/logo";
import MobileMenu from "../mobile-menu";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { ThemeToggle } from "@/components/theme/theme-toggle";


export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 border-b bg-primary/5">
      <Container>
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <Logo src="/fastdrop-logo.png" />

          {/* Desktop actions */}
          <div className="hidden sm:flex items-center gap-4">
            <ProximityIndicator />
            <ThemeToggle />
            <Link href="https://www.github.com/abhisarxverma/fastdrop">
              <FaGithub />
            </Link>
          </div>

          {/* Mobile menu */}
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
