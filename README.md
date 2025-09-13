#

This repository contains the setup for **Keycloak** with a **custom DaisyUI/Tailwind theme** and a **Vite/React frontend**.  
It provides a corporate-style login experience with support for **multiple locales (English + Arabic)**.

---

## 🚀 Features

- **Keycloak 25.0** running in Docker
- **Custom Keycloak theme (`adconnect`)**
  - Styled with TailwindCSS + DaisyUI
  - Dark blue corporate look matching frontend
  - Locale switcher (English / العربية)
- **Frontend (React + Vite)** with Keycloak integration
- Secure **PKCE (S256)** flow
- Automated CSS build pipeline via **PostCSS/Tailwind**

---

## 📂 Project Structure

.
├── docker-compose.yml # Keycloak + DB setup
├── keycloak-theme/
│ └── adconnect/
│ ├── login/ # FTL templates (login.ftl, register.ftl, etc.)
│ ├── resources/
│ │ └── css/
│ │ ├── daisy.min.css # Tailwind/DaisyUI compiled CSS
│ │ └── overrides.css # Custom dark corporate overrides
│ ├── theme.properties
│ ├── package.json
│ ├── postcss.config.js
│ └── tailwind.config.js
└── frontend/
├── src/
│ ├── App.tsx
│ └── keycloak.ts # Keycloak init + login/logout helpers
├── index.html
├── package.json
└── vite.config.ts


---

## ⚙️ Setup Instructions

### 1. Clone and Install Dependencies


git clone https://github.com/your-org/adconnect-auth.git
cd adconnect-auth

# Install frontend deps
cd frontend && npm install

# Install theme build deps
cd ../keycloak-theme/adconnect && npm install
2. Run Keycloak with Theme

docker compose up -d
This mounts the keycloak-theme/adconnect directory into Keycloak at:


/opt/keycloak/themes/adconnect
3. Build Theme CSS
To compile Tailwind + DaisyUI into resources/css/daisy.min.css:


cd keycloak-theme/adconnect
npx tailwindcss -i ./resources/tailwind.css -o ./resources/css/daisy.min.css --minify
Override styles (corporate colors, dark background, etc.) are in:


keycloak-theme/adconnect/resources/css/overrides.css
4. Configure Keycloak Realm
Import realm config (realm-export.json) or create manually

Enable Internationalization

Add English (en) and Arabic (ar)

Set theme:

Realm → Themes → Login Theme = adconnect

5. Run Frontend

cd frontend
npm run dev
Frontend should be accessible at:
👉 http://localhost:5173

Login page (Keycloak) should open at:
👉 http://localhost:8080/realms/demo/protocol/openid-connect/auth?...

🌍 Localization
Locale dropdown appears on the login screen

Switches between English and العربية

Messages defined in:

messages.properties (default / English)

messages_ar.properties (Arabic)

🔧 Debugging
Theme not loading?
Ensure theme.properties contains:


parent=base
styles=css/daisy.min.css css/overrides.css
CSS not applied?
Run:

docker compose down -v && docker compose up -d
to clear Keycloak theme cache.

Frontend Keycloak init errors?
Check frontend/src/keycloak.ts:


pkceMethod: "S256",
checkLoginIframe: false,
silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html"
📝 Development Notes
daisy.min.css is ignored in Git (see .gitignore).
Build it locally before running Keycloak.

Keep .env.example committed for required variables:

