# Build patches (optional)

Patches placed here are applied by `.github/workflows/build-web-manual.yml`
**after** checking out the upstream tag, before building.

| Directory | Applied when |
|---|---|
| `common/` | every build |
| `v2.1.56/` (exact tag) | only that tag |
| `2.1.56/` (version, no `v`) | only that version |

Usage: branch off the upstream tag, apply the earlier patches, edit,
`git diff > build-patches/common/NNNN-name.patch`, commit to this carrier
branch. The workflow runs `git apply --check` first — a patch that fails to
apply cleanly fails the build instead of silently skipping. Patches apply in
filename order and **must be diffed against the tree with all earlier patches
applied** (0004's context assumes 0001 is in).

## common/ patches (self-hosted additions)

| Patch | What it does |
|---|---|
| `0001-ttyd-proxy` | static-server: proxy `/ttyd/*` to the loopback ttyd sidecar; aionui-session gate + server-side Basic credential injection |
| `0002-mobile-copy-fork` | MessageText: always show the copy/fork row on mobile (no hover) |
| `0003-terminal-panel` | Sider entry + drawer hosting the ttyd terminal (iframe `/ttyd/`) |
| `0004-scripts-api` | static-server: local `/api/scripts/{list,run,output,stop}` — run/stop scripts from `/data/scripts.d`, output tee'd to `/data/scripts-output` |
| `0005-scripts-panel` | Sider entry + drawer UI for 0004: cards, stdin (localStorage), output rendered as table/progress from the last line's view JSON |

Note: builds are unrestricted out of the box — `IS_DISCONTINUED_BUILD` is only
set for `-final` tags upstream CI; the web build has no cloud-login gate.
