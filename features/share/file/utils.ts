
export function getExtension(fileName: string) {
    return fileName.split(".").pop()?.toLowerCase() || ""
}

export function removeExtension(rawFileName: string) {
    const parts = rawFileName.split(".");
    if (parts.length <= 1) return rawFileName;
    return parts[0];
}