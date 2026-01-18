
import { TbBrandCSharp } from "react-icons/tb";
import { IconType } from "react-icons"
import { VscVscode } from "react-icons/vsc";
import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaJava,
  FaPython,
  FaPhp,
  FaRust,
  FaSwift,
  FaFileCode,
} from "react-icons/fa";
import {
  SiC,
  SiCplusplus,
  SiGo,
  SiKotlin,
  SiRuby,
  SiPerl,
  SiLua,
  SiR,
  SiTypescript,
  SiGraphql,
} from "react-icons/si";

export type LanguageInfoType = {
  name: string;
  icon: IconType
};

// These are the programming languages that are common and are supported by Monaco code editor

export const codeLanguageInfo: { [key: string]: LanguageInfoType } = {
  bat: { name: "Batch", icon: FaFileCode },
  c: { name: "C", icon: SiC },
  cpp: { name: "C++", icon: SiCplusplus },
  csharp: { name: "C#", icon: TbBrandCSharp },
  css: { name: "CSS", icon: FaCss3Alt },
  dockerfile: { name: "Dockerfile", icon: FaFileCode },
  fsharp: { name: "F#", icon: FaFileCode },
  go: { name: "Go", icon: SiGo },
  graphql: { name: "GraphQL", icon: SiGraphql },
  handlebars: { name: "Handlebars", icon: FaFileCode },
  html: { name: "HTML", icon: FaHtml5 },
  ini: { name: "INI", icon: FaFileCode },
  java: { name: "Java", icon: FaJava },
  javascript: { name: "JavaScript", icon: FaJsSquare },
  json: { name: "JSON", icon: FaFileCode },
  kotlin: { name: "Kotlin", icon: SiKotlin },
  less: { name: "Less", icon: FaFileCode },
  lua: { name: "Lua", icon: SiLua },
  markdown: { name: "Markdown", icon: FaFileCode },
  objectivec: { name: "Objective-C", icon: FaFileCode },
  pascal: { name: "Pascal", icon: FaFileCode },
  perl: { name: "Perl", icon: SiPerl },
  php: { name: "PHP", icon: FaPhp },
  plaintext: { name: "Plain Text", icon: FaFileCode },
  powershell: { name: "PowerShell", icon: FaFileCode },
  python: { name: "Python", icon: FaPython },
  r: { name: "R", icon: SiR },
  razor: { name: "Razor", icon: FaFileCode },
  ruby: { name: "Ruby", icon: SiRuby },
  rust: { name: "Rust", icon: FaRust },
  scss: { name: "SCSS", icon: FaFileCode },
  shell: { name: "Shell Script", icon: FaFileCode },
  sql: { name: "SQL", icon: FaFileCode },
  swift: { name: "Swift", icon: FaSwift },
  typescript: { name: "TypeScript", icon: SiTypescript },
  vb: { name: "Visual Basic", icon: FaFileCode },
  xml: { name: "XML", icon: FaFileCode },
  yaml: { name: "YAML", icon: FaFileCode },
};


const getLanguageInfo = (language: string): LanguageInfoType => {
  return codeLanguageInfo[language] || { name: 'Code', icon: VscVscode };
};

export default getLanguageInfo;