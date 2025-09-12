<!doctype html>
<html lang="${(locale.currentLanguageTag!'en')}"
      dir="${(locale.currentLanguageTag!'en')?starts_with('ar')?then('rtl','ltr')}">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/daisyui@4.12.24/dist/full.min.css">
  <title>${msg("registerTitle")! "Register"}</title>
</head>
<body class="min-h-screen bg-base-200 flex items-center justify-center">
  <div class="card w-full max-w-lg bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title justify-center">${msg("registerTitle")! "Register"}</h2>

      <#-- flash messages -->
      <#if message??>
        <#assign alertClass = "alert-info">
        <#if message.type??>
          <#if message.type == "success"><#assign alertClass="alert-success">
          <#elseif message.type == "warning"><#assign alertClass="alert-warning">
          <#elseif message.type == "error"><#assign alertClass="alert-error"></#if>
        </#if>
        <div class="alert ${alertClass} mt-3" role="alert"><span>${message.summary}</span></div>
      </#if>

      <form id="kc-register-form" action="${url.registrationAction}" method="post" class="form-control gap-3 mt-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label class="input input-bordered flex items-center gap-2">
            <span class="w-28">${msg("firstName")! "First name"}</span>
            <input class="grow" type="text" id="firstName" name="firstName" value="${(user.firstName!'')}" required/>
          </label>

          <label class="input input-bordered flex items-center gap-2">
            <span class="w-28">${msg("lastName")! "Last name"}</span>
            <input class="grow" type="text" id="lastName" name="lastName" value="${(user.lastName!'')}" required/>
          </label>
        </div>

        <label class="input input-bordered flex items-center gap-2">
          <span class="w-28">${msg("email")! "Email"}</span>
          <input class="grow" type="email" id="email" name="email" value="${(user.email!'')}" required/>
        </label>

        <#-- show username only if NOT using email-as-username -->
        <#if !(realm.registrationEmailAsUsername?? && realm.registrationEmailAsUsername) >
          <label class="input input-bordered flex items-center gap-2">
            <span class="w-28">${msg("username")! "Username"}</span>
            <input class="grow" type="text" id="username" name="username" value="${(user.username!'')}" required/>
          </label>
        </#if>

        <label class="input input-bordered flex items-center gap-2">
          <span class="w-28">${msg("password")! "Password"}</span>
          <input class="grow" type="password" id="password" name="password" required/>
        </label>

        <label class="input input-bordered flex items-center gap-2">
          <span class="w-28">${msg("passwordConfirm")! "Confirm"}</span>
          <input class="grow" type="password" id="password-confirm" name="password-confirm" required/>
        </label>

        <div id="email-policy-error" class="alert alert-warning hidden mt-2">
          <span>
            ${msg("invalidEmail")! "Please use a company email (public email domains are not allowed)."}
          </span>
        </div>

        <button class="btn btn-primary w-full mt-2" type="submit">${msg("doRegister")! "Register"}</button>

        <div class="text-sm mt-3 text-center">
          <a class="link link-hover" href="${url.loginUrl}">${msg("backToLogin")! "Back to login"}</a>
        </div>
      </form>
    </div>
  </div>

  <script>
    (function () {
      const deny = new Set([
        "gmail.com","googlemail.com","yahoo.com","yahoo.co.uk","hotmail.com","outlook.com","live.com",
        "icloud.com","aol.com","proton.me","protonmail.com","gmx.com","ymail.com","mail.com","zoho.com"
      ]);
      const form = document.getElementById("kc-register-form");
      const email = document.getElementById("email");
      const warn = document.getElementById("email-policy-error");

      function invalidDomain(domain) {
        return deny.has(domain.toLowerCase());
      }

      form.addEventListener("submit", function (e) {
        const val = (email.value || "").trim();
        const at = val.lastIndexOf("@");
        const domain = at > -1 ? val.slice(at + 1) : "";
        if (!domain || invalidDomain(domain)) {
          e.preventDefault();
          warn.classList.remove("hidden");
          email.focus();
        } else {
          warn.classList.add("hidden");
        }
      });
    })();
  </script>
</body>
</html>