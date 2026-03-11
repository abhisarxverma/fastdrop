import { useState } from "react";

interface ClipboardState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

export function useClipboard() {
  const [state, setState] = useState<ClipboardState>({
    loading: false,
    success: false,
    error: null,
  });

  async function copy(text: string) {
    setState({ loading: true, success: false, error: null });

    try {
      await navigator.clipboard.writeText(text);
      setState({ loading: false, success: true, error: null });
    } catch (err) {
      setState({
        loading: false,
        success: false,
        error: (err as Error).message,
      });
    }
  }

  return { ...state, action: copy };
}
