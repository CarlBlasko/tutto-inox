import { useEffect } from "react";

interface UseKeyboardArgs {
  key: string;
  handleKeyboardShortcut: () => void;
}

export function useKeyboard({ key, handleKeyboardShortcut }: UseKeyboardArgs) {
  useEffect(() => {
    function keyDownHandler(e: globalThis.KeyboardEvent) {
      if (e.metaKey && e.key === key) {
        e.preventDefault();
        handleKeyboardShortcut();
      }
    }

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);
}
