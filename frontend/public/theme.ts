export function setTheme(theme: "brand" | "sponsor" | "advertiser") {
  document.documentElement.setAttribute("data-theme", theme);
}
