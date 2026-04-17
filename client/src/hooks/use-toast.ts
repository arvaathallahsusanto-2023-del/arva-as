import * as React from "react";

export function useToast() {
  const [toasts, setToasts] = React.useState<any[]>([]);

  const toast = React.useCallback(({ title, description, variant }: any) => {
    console.log(`Toast: ${title} - ${description} [${variant}]`);
    // Minimal mock implementation
  }, []);

  return { toast, toasts };
}
