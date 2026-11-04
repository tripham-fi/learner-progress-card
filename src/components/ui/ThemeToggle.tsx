import { useTheme } from "../../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === "dark"}
      className="rounded-card border border-track bg-surface px-3 py-2 text-sm text-text hover:bg-accent"
    >
      {theme} mode
    </button>
  );
}