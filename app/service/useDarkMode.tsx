import { useEffect } from "react";

function useDarkMode(iconRef: React.RefObject<HTMLElement | null>) {
  const toggleDarkMode = () => {
    const htmlElement = document.documentElement;
    const isDarkMode = htmlElement.classList.contains("dark");

    if (isDarkMode) {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    if (iconRef.current) {
      iconRef.current.classList.remove("fa-moon", "fa-sun");
      htmlElement.classList.contains("dark")
        ? iconRef.current.classList.add("fa-sun")
        : iconRef.current.classList.add("fa-moon");
    }
  };

  useEffect(() => {
    const htmlElement = document.documentElement;
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = storedTheme === "dark" || (!storedTheme && prefersDark);

    if (shouldUseDark) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }

    if (iconRef.current) {
      iconRef.current.classList.remove("fa-moon", "fa-sun");
      htmlElement.classList.contains("dark")
        ? iconRef.current.classList.add("fa-sun")
        : iconRef.current.classList.add("fa-moon");
    }
  }, [iconRef]);

  return toggleDarkMode;
}

export default useDarkMode
