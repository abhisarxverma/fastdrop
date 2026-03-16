export function getStoragePathFromPublicUrl(url: string) {
  const prefix = "/object/public/fastdrop/";
  const idx = url.indexOf(prefix);
  if (idx === -1) throw new Error("Invalid file_path format: " + url);
  return decodeURIComponent(url.substring(idx + prefix.length));
}

