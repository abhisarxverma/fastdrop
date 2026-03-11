import { useState } from "react";

interface DownloadState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

export function useFileDownload() {
  const [state, setState] = useState<DownloadState>({
    loading: false,
    success: false,
    error: null,
  });

  async function downloadFile(url: string, suggestedName?: string) {
    setState({ loading: true, success: false, error: null });

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = suggestedName || url.split("/").pop() || "download";
      link.click();
      URL.revokeObjectURL(link.href);

      setState({ loading: false, success: true, error: null });
    } catch (err) {
      setState({
        loading: false,
        success: false,
        error: (err as Error).message,
      });
    }
  }

  return { ...state, action: downloadFile };
}
