export type HallColors = {
  background: string;
  foreground: string;
};

export function readHallColors(): HallColors | null {
  if (typeof document === "undefined") {
    return null;
  }
  const style = getComputedStyle(document.documentElement);
  const background = style.getPropertyValue("--background").trim();
  const foreground = style.getPropertyValue("--foreground").trim();
  if (background.length === 0 || foreground.length === 0) {
    return null;
  }
  return { background, foreground };
}
