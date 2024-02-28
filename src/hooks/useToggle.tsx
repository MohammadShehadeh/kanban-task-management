import { useState } from "react";

export const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = (value?: boolean) => {
    setIsOpen((prevState) => value ?? !prevState);
  };

  return { isOpen, toggleIsOpen };
};
