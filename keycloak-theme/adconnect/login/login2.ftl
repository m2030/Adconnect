<#-- Standalone login.ftl (no template.ftl import) with explicit CSS + locale -->
<#assign hasI18n   = (realm.internationalizationEnabled?? && realm.internationalizationEnabled)>
<#assign currentLang = "en">
<#if hasI18n && locale??>
  <#assign currentLang = (locale.currentLanguageTag)!(locale.current)!"en">
</#if>
<#assign isRtl = currentLang?lower_case?starts_with("ar")
            || currentLang?lower_case?starts_with("fa")
            || currentLang?lower_case?starts_with("ur")>
<#-- Optional: read a theme switch (from theme.properties) -->
<#assign themeName = (properties.myTheme)!"corporate">

<!doctype html>
<html lang="${currentLang}" dir="${isRtl?string('rtl','ltr')}" data-theme="${themeName}">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${msg("doLogIn")}</title>

  <#-- IMPORTANT: load CSS directly from this theme’s resources -->
  <link rel="stylesheet" href="${url.resourcesPath}/css/daisy.min.css?v=2"/>


  <style>
    /* tiny fallback if CSS fails */
    :root { --font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial; }
    html, body { font-family: var(--font-sans); }
  </style>
</head>

<body class="min-h-screen bg-base-200 flex items-center justify-center">
  <div class="absolute top-4 ${isRtl?string('left-4','right-4')}">
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-sm">
        <#if isRtl>العربية<#else>English</#if>
      </label>
      <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-44">
        <#if hasI18n && locale?? && locale.supported?? && (locale.supported?size > 0)>
          <#list locale.supported as l>
            <li><a href="#" onclick="setLocale('${l.languageTag}');return false;">${l.label}</a></li>
          </#list>
        <#else>
          <li><a href="#" onclick="setLocale('en');return false;">English</a></li>
          <li><a href="#" onclick="setLocale('ar');return false;">العربية</a></li>
        </#if>
      </ul>
    </div>
  </div>

  <div class="w-full max-w-md px-4">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h1 class="card-title justify-center text-2xl">${msg("doLogIn")}</h1>

        <#-- Global message banner -->
        <#if message??>
          <div class="alert <#if message.type?lower_case == 'error'>alert-error<#elseif message.type?lower_case == 'warning'>alert-warning<#else>alert-info</#if> mt-2">
            <span>${(message.summary)!msg("internalServerError")}</span>
          </div>
        </#if>

        <form id="kc-form-login" action="${url.loginAction}" method="post" class="mt-4">
          <div class="form-control">
            <label class="label" for="username">
              <span class="label-text">${msg("username")}</span>
            </label>
            <input class="input input-bordered" type="text" id="username" name="username"
                   value="${(login.username!'')}" autocomplete="username" required/>
          </div>

          <div class="form-control mt-3">
            <label class="label" for="password">
              <span class="label-text">${msg("password")}</span>
            </label>
            <input class="input input-bordered" type="password" id="password" name="password"
                   autocomplete="current-password" required/>
          </div>

          <input type="hidden" name="credentialId" value="${(login.credentialId!'')}"/>
          <input type="hidden" name="ui_locales"   value="${currentLang}"/>

          <div class="mt-4 flex items-center justify-between">
            <#if realm.rememberMe?? && realm.rememberMe>
              <label class="label cursor-pointer gap-2">
                <input type="checkbox" class="checkbox" name="rememberMe"
                       <#if login.rememberMe?? && login.rememberMe>checked</#if> />
                <span class="label-text">${msg("rememberMe")}</span>
              </label>
            </#if>

            <div class="text-sm">
              <#if realm.resetPasswordAllowed?? && realm.resetPasswordAllowed>
                <a class="link link-primary" href="${url.loginResetCredentialsUrl}">${msg("doForgotPassword")}</a>
              </#if>
            </div>
          </div>

          <button type="submit" class="btn btn-primary w-full mt-5">${msg("doLogIn")}</button>
        </form>

        <#if realm.registrationAllowed?? && realm.registrationAllowed>
          <div class="divider my-6"></div>
          <div class="text-center">
            <a class="btn btn-ghost" href="${url.registrationUrl}">${msg("doRegister")}</a>
          </div>
        </#if>
      </div>
    </div>
  </div>

  <script <#if cspNonce??>nonce="${cspNonce}"</#if>>
  function setLocale(loc){
    try{
      const u = new URL(window.location.href);
      u.searchParams.set('kc_locale', loc);
      u.searchParams.set('ui_locales', loc);
      window.location.href = u.toString();
    }catch(e){
      var sep = window.location.search ? '&' : '?';
      window.location.href = window.location.href + sep +
        'kc_locale=' + encodeURIComponent(loc) +
        '&ui_locales=' + encodeURIComponent(loc);
    }
  }
</script>
</body>
</html>
