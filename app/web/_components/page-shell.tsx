import clsx from "clsx";


interface PageShellProps {
    children: React.ReactNode;
    addClassName?: string;
}

export default function PageShell({ children, addClassName }: PageShellProps ) {
    return (
        <div className={clsx("flex-1 px-12 py-5", addClassName)}>
            { children }
        </div>
    )
}