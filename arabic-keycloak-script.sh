#!/usr/bin/env bash
set -euo pipefail
SRC=keycloak/realm-export.json
OUT=keycloak/realm-export.patched.json

jq '
  (.realms // .) as $r |
  if $r then
    .realms = (.realms | map(
      if .realm=="demo" then
        . + {
          internationalizationEnabled: true,
          supportedLocales: ((.supportedLocales // []) + ["ar"] | unique),
          defaultLocale: (.defaultLocale // "en")
        }
      else . end
    ))
  else
    . + {
      internationalizationEnabled: true,
      supportedLocales: ((.supportedLocales // []) + ["ar"] | unique),
      defaultLocale: (.defaultLocale // "en")
    }
  end
' "$SRC" > "$OUT"

# (optional) atomically replace the original
mv "$OUT" "$SRC"
echo "Patched $SRC with Arabic locale."

