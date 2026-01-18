import { FieldGroup } from "@/components/ui/field";

interface FormLayoutProps {
    children: React.ReactNode;
    onSubmit: () => void
}

export default function FormLayout({ onSubmit, children }: FormLayoutProps) {
    return (
         <form onSubmit={onSubmit}>
            <FieldGroup className="flex flex-col gap-10">
                {children}
            </FieldGroup>
        </form>
    )
}