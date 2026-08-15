# Build patches (optional)

Patches placed here are applied by `.github/workflows/build-web-manual.yml`
**after** checking out the upstream tag, before building.

| Directory | Applied when |
|---|---|
| `common/` | every build |
| `v2.1.56/` (exact tag) | only that tag |
| `2.1.56/` (version, no `v`) | only that version |

Usage: branch off the upstream tag, edit, `git diff > build-patches/v2.1.56/my-change.patch`,
commit to this carrier branch. The workflow runs `git apply --check` first —
a patch that fails to apply cleanly fails the build instead of silently
skipping.

Currently empty: v2.1.56+ builds are unrestricted out of the box
(`IS_DISCONTINUED_BUILD` is only set for `-final` tags upstream CI; the web
build has no cloud-login gate).
