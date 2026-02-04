import Link from "next/link"

export default function Logo() {
    return (
        <div>
            <Link className="flex items-center text-2xl font-bold tracking-tight" href="/">
                <h3>Fast</h3><h3 className="text-primary">drop</h3>
            </Link>
        </div>
    )
}