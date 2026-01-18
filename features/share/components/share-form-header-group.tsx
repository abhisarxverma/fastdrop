import PageHeading from "@/app/web/_components/page-heading";
import clsx from "clsx";

interface ShareFormHeaderGroupProps {
    title: string;
    addClass?: string;
}

export default function ShareFormHeaderGroup({ addClass, title }: ShareFormHeaderGroupProps) {
    return (
        <div className={clsx("flex flex-col gap-2", addClass)}>
            <PageHeading title={title} />
            <p className="text-sm text-muted-foreground">
                People within 30m will instantly get your share
            </p>
        </div>
    )
}