// simple DaisyUI theme switcher
export type AppTheme = "brand" | "sponsor" | "advertiser";

export function setTheme(theme: AppTheme) {
  document.documentElement.setAttribute("data-theme", theme);
}
