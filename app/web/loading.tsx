import Container from "@/components/layouts/container";
import { LuLoader } from "react-icons/lu";


export default function Loading() {
    return (
        <Container className="h-50 flex items-center justify-center gap-5">
            Loading
            <LuLoader className="animate-spin" />
        </Container>
    )
}