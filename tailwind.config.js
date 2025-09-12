/** @type {import('tailwindcss').Config} */
module.exports = {
  // IMPORTANT: include your FTL templates so purge keeps the classes we use
  content: [
    "./keycloak-theme/adconnect/login/**/*.ftl",
    "./keycloak-theme/adconnect/**/*.ftl"
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require('daisyui')
  ],
  // Make sure "corporate" exists and is first so it’s default
  daisyui: {
    themes: ["corporate", "light", "dark"]
  }
}
