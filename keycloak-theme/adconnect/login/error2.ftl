<#-- Standalone error.ftl: safe defaults, no macro imports -->
<#assign hasI18n    = (realm.internationalizationEnabled?? && realm.internationalizationEnabled)>
<#assign currentLang = "en">
<#if hasI18n && locale??>
  <#assign currentLang = (locale.currentLanguageTag)!(locale.current)!"en">
</#if>
<#assign isRtl = currentLang?lower_case?starts_with("ar")
          || currentLang?lower_case?starts_with("fa")
          || currentLang?lower_case?starts_with("ur")>
<#assign themeName = (properties.myTheme)!"corporate">

<!doctype html>
<html lang="${currentLang}" dir="${isRtl?string('rtl','ltr')}" data-theme="${themeName}">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${msg("errorTitle")!"Error"}</title>

  <link rel="stylesheet" href="${url.resourcesPath}/css/daisy.min.css"/>
  <style>
    :root { --font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial; }
    html, body { font-family: var(--font-sans); }
  </style>
</head>

<body class="min-h-screen bg-base-200 flex items-center justify-center">
  <div class="w-full max-w-xl px-4">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h1 class="card-title text-2xl">${msg("errorTitle")!"Error"}</h1>

        <#-- Message with safe fallbacks -->
        <#if message??>
          <div class="alert alert-error mt-3">
            <span>${(message.summary)! (msg("internalServerError")!"Internal Server Error")}</span>
          </div>
          <#if message.description?? && (message.description?has_content)>
            <p class="mt-2 text-sm opacity-80">${message.description}</p>
          </#if>
        <#else>
          <div class="alert alert-error mt-3">
            <span>${msg("internalServerError")!"Internal Server Error"}</span>
          </div>
        </#if>

        <div class="mt-6 flex gap-2">
          <a class="btn btn-primary" href="${(url.loginUrl)!'/'}">${msg("doLogIn")!"Log in"}</a>
          <a class="btn btn-ghost" href="${(url.realm)!'/'}">${msg("backToApplication")!"Back"}</a>
        </div>
      </div>
    </div>
  </div>

  <#-- No inline JS needed here. If you ever add one, guard the nonce like below. -->
  <script <#if cspNonce??>nonce="${cspNonce}"</#if>></script>
</body>
</html>
