import { RefObject, useEffect } from "react";

export const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      callback();
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, callback]);
};
