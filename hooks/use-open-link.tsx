
import { useState } from "react";

interface OpenLinkState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

export function useOpenLink() {
  const [state, setState] = useState<OpenLinkState>({
    loading: false,
    success: false,
    error: null,
  });

  function open(url: string) {
    setState({ loading: true, success: false, error: null });
    try {
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
      setState({ loading: false, success: true, error: null });
    } catch (err) {
      setState({ loading: false, success: false, error: (err as Error).message });
    }
  }

  return { ...state, action: open };
}