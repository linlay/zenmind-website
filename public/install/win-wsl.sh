#!/usr/bin/env bash
set -euo pipefail

REPO_URL="${ZENMIND_REPO_URL:-https://github.com/linlay/zenmind.git}"
INSTALL_DIR="${ZENMIND_HOME:-$HOME/zenmind}"
TARGET_SCRIPT="setup-win-wsl.sh"
DRY_RUN="${ZENMIND_DRY_RUN:-0}"
SITE_URL="${ZENMIND_SITE_URL:-https://www.zenmind.cc}"
DEFAULT_MANIFEST_URL="${SITE_URL%/}/install/manifest.json"

log() {
  printf '[zenmind-bootstrap] %s\n' "$*"
}

fail() {
  printf '[zenmind-bootstrap] ERROR: %s\n' "$*" >&2
  exit 1
}

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || fail "missing required command: $1"
}

resolve_manifest_url() {
  if [[ -n "${ZENMIND_MANIFEST_URL:-}" ]]; then
    printf '%s\n' "$ZENMIND_MANIFEST_URL"
    return
  fi

  if [[ -n "${ZENMIND_RELEASE_LINE:-}" ]]; then
    [[ "$ZENMIND_RELEASE_LINE" =~ ^v[0-9]+\.[0-9]+$ ]] || fail "ZENMIND_RELEASE_LINE must match vX.Y"
    printf '%s/install/releases/%s/release-manifest.json\n' "${SITE_URL%/}" "$ZENMIND_RELEASE_LINE"
    return
  fi

  printf '%s\n' "$DEFAULT_MANIFEST_URL"
}

ensure_wsl() {
  if [[ "$(uname -s)" != "Linux" ]]; then
    fail "this installer must be executed inside a WSL Linux shell"
  fi

  if [[ -z "${WSL_INTEROP:-}" && -z "${WSL_DISTRO_NAME:-}" ]]; then
    fail "WSL was not detected; use mac.sh or linux.sh on native systems"
  fi
}

sync_repo() {
  if [[ ! -e "$INSTALL_DIR" ]]; then
    log "cloning ZenMind into $INSTALL_DIR"
    git clone --depth 1 "$REPO_URL" "$INSTALL_DIR"
    return
  fi

  if [[ ! -d "$INSTALL_DIR/.git" ]]; then
    fail "$INSTALL_DIR exists but is not a git repository"
  fi

  log "updating existing repository in $INSTALL_DIR"
  git -C "$INSTALL_DIR" pull --ff-only
}

run_setup() {
  local script_path="$INSTALL_DIR/$TARGET_SCRIPT"
  local manifest_url
  manifest_url="$(resolve_manifest_url)"

  [[ -f "$script_path" ]] || fail "missing $TARGET_SCRIPT in $INSTALL_DIR"

  if [[ "$DRY_RUN" == "1" ]]; then
    log "dry-run: would execute $script_path --action check"
    log "dry-run: would execute $script_path --action install --release --manifest $manifest_url $*"
    return
  fi

  log "running environment check"
  "$script_path" --action check
  log "installing release from $manifest_url"
  exec "$script_path" --action install --release --manifest "$manifest_url" "$@"
}

main() {
  require_cmd git
  require_cmd bash
  require_cmd curl
  ensure_wsl
  sync_repo
  run_setup "$@"
}

main "$@"
