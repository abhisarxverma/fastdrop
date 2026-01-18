import * as React from "react";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { codeLanguageInfo } from "../../common/constants/code-language-info";

type LanguageSelectProps = {
    value?: string;
    onChange: (val: string) => void;
};

export const LanguageSelector: React.FC<LanguageSelectProps> = ({
    value = "java",
    onChange,
}) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-lg">
                <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
                {Object.entries(codeLanguageInfo).map(([monacoLanguage, languageInfo]) => {
                    const name = languageInfo.name;
                    const Icon = languageInfo.icon;
                    return <SelectItem key={monacoLanguage} value={monacoLanguage}>
                        <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            <span>{name}</span>
                        </div>
                    </SelectItem>
                })}
            </SelectContent>
        </Select>
    );
};
