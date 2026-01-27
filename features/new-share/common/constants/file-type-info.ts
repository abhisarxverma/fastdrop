
import {
  FaFileWord,
  FaFilePowerpoint,
  FaFileExcel,
  FaFilePdf,
  FaFileAlt,
  FaFileArchive,
  FaFileImage,
  FaFileAudio,
  FaFileVideo,
  FaDatabase,
  FaFileCode,
} from "react-icons/fa";
import { IconType } from 'react-icons'

export type FileTypeInfo = {
    name: string,
    icon: IconType
}

export const fileTypes = {
  doc: { name: "Word Document", icon: FaFileWord },
  docx: { name: "Word Document", icon: FaFileWord },

  ppt: { name: "PowerPoint Presentation", icon: FaFilePowerpoint },
  pptx: { name: "PowerPoint Presentation", icon: FaFilePowerpoint },

  xls: { name: "Excel Spreadsheet", icon: FaFileExcel },
  xlsx: { name: "Excel Spreadsheet", icon: FaFileExcel },

  accdb: { name: "Access Database", icon: FaDatabase },
  mdb: { name: "Access Database", icon: FaDatabase },

  pdf: { name: "PDF Document", icon: FaFilePdf },

  txt: { name: "Text File", icon: FaFileAlt },

  csv: { name: "CSV File", icon: FaFileExcel },

  zip: { name: "Archive File", icon: FaFileArchive },
  rar: { name: "Archive File", icon: FaFileArchive },

  jpg: { name: "Image File", icon: FaFileImage },
  jpeg: { name: "Image File", icon: FaFileImage },
  gif: { name: "Image File", icon: FaFileImage },
  png: { name: "Image File", icon: FaFileImage },
  svg: { name: "Image File", icon: FaFileImage },

  mp3: { name: "Audio File", icon: FaFileAudio },
  wav: { name: "Audio File", icon: FaFileAudio },

  mp4: { name: "Video File", icon: FaFileVideo },
  avi: { name: "Video File", icon: FaFileVideo },
  mkv: { name: "Video File", icon: FaFileVideo },

  html: { name: "HTML File", icon: FaFileCode },
  css: { name: "CSS File", icon: FaFileCode },
  js: { name: "JavaScript File", icon: FaFileCode },
  ts: { name: "TypeScript File", icon: FaFileCode },
  json: { name: "JSON File", icon: FaFileCode },
} as const;

