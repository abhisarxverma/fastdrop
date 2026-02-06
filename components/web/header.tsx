import { FaGithub } from "react-icons/fa";
import { ThemeToggle } from "../theme/theme-toggle";
import Logo from "./logo";
import Container from "../layouts/container";

export default function Header() {
  return (
    <div className="w-full border-b border-secondary bg-accent/30">
      <Container>
        <div className="flex items-center justify-between py-2">
          <Logo />
          <div className="flex items-center gap-2">
            <FaGithub size="20" />
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </div>
  );
}
