import { Field, FieldGroup } from "@/components/ui/field";
import TitleInput from "../../components/title-input";
import { useState } from "react";


export default function ShareFileForm() {

    const [ title, setTitle ] = useState("");

    return (
        <form>
            <FieldGroup>
                <Field>
                    <TitleInput value={title} onChange={setTitle}  />
                </Field>
            </FieldGroup>
        </form>
    )
}