
export function getExtension(fileName: string) {
    return fileName.split(".").pop()?.toLowerCase() || ""
}