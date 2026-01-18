import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    HiOutlineDocument,
    HiOutlineDocumentText,
    HiOutlineCodeBracket,
    HiOutlineLink,
    HiOutlineFolder
} from "react-icons/hi2";
import { ROUTES } from "@/config/routes";
import Link from "next/link";

export default function ShareTypeDropdownMenu({ children }:{ children: React.ReactNode }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Select type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={ROUTES.NEW_OPEN_SHARE("file")} ><HiOutlineDocument /> File</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link className="mt-2" href={ROUTES.NEW_OPEN_SHARE("text")} ><HiOutlineDocumentText /> Text</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link className="mt-2" href={ROUTES.NEW_OPEN_SHARE("code")} ><HiOutlineCodeBracket /> Code</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link className="mt-2" href={ROUTES.NEW_OPEN_SHARE("link")} ><HiOutlineLink /> link</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link className="mt-2" href={ROUTES.NEW_OPEN_SHARE("folder")} ><HiOutlineFolder /> Folder</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}