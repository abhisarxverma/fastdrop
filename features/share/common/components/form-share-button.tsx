import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { IoSend } from "react-icons/io5";
import { LuLoader } from "react-icons/lu";

interface FormShareButton {
    text: string;
    addClasses?: string;
    isSubmitting?: boolean;
    isDisabled: boolean
}

export default function FormShareButton({ text, addClasses, isSubmitting, isDisabled }: FormShareButton) {
    return (
        <Button disabled={isSubmitting || isDisabled} type="submit" size="lg" className={clsx("flex w-full items-center gap-2", addClasses)}>
            {text} {isSubmitting ? <LuLoader className="animate-spin" /> : <IoSend/>}
        </Button>
    )
}