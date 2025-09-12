<!doctype html>
<html lang="${(locale.currentLanguageTag!'en')}"
      dir="${(locale.currentLanguageTag!'en')?starts_with('ar')?then('rtl','ltr')}">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/daisyui@4.12.24/dist/full.min.css">
  <title>${msg("updateProfileTitle")! "Update profile"}</title>
</head>
<body class="min-h-screen bg-base-200 flex items-center justify-center">
  <div class="card w-full max-w-lg bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title justify-center">${msg("updateProfileTitle")! "Update profile"}</h2>

      <#if message??>
        <#assign alertClass = "alert-info">
        <#if message.type??>
          <#if message.type == "success"><#assign alertClass="alert-success">
          <#elseif message.type == "warning"><#assign alertClass="alert-warning">
          <#elseif message.type == "error"><#assign alertClass="alert-error"></#if>
        </#if>
        <div class="alert ${alertClass} mt-3" role="alert"><span>${message.summary}</span></div>
      </#if>

      <form id="kc-update-profile-form" action="${url.loginAction}" method="post" class="form-control gap-3 mt-4">
        <label class="input input-bordered flex items-center gap-2">
          <span class="w-32">${msg("firstName")! "First name"}</span>
          <input class="grow" type="text" id="firstName" name="firstName" value="${(user.firstName!'')}" required/>
        </label>

        <label class="input input-bordered flex items-center gap-2">
          <span class="w-32">${msg("lastName")! "Last name"}</span>
          <input class="grow" type="text" id="lastName" name="lastName" value="${(user.lastName!'')}" required/>
        </label>

        <label class="input input-bordered flex items-center gap-2">
          <span class="w-32">${msg("email")! "Email"}</span>
          <input class="grow" type="email" id="email" name="email" value="${(user.email!'')}" required/>
        </label>

        <button class="btn btn-primary w-full mt-2" type="submit">${msg("doSubmit")! "Save"}</button>
      </form>

      <div class="text-sm mt-3 text-center">
        <a class="link link-hover" href="${url.loginUrl}">${msg("backToLogin")! "Back to login"}</a>
      </div>
    </div>
  </div>
</body>
</html>
