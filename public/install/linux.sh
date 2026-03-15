#!/usr/bin/env bash
set -euo pipefail

REPO_URL="${ZENMIND_REPO_URL:-https://github.com/linlay/zenmind.git}"
INSTALL_DIR="${ZENMIND_HOME:-$HOME/zenmind}"
TARGET_SCRIPT="setup-linux.sh"
DRY_RUN="${ZENMIND_DRY_RUN:-0}"

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

sync_repo() {
  if [[ ! -e "$INSTALL_DIR" ]]; then
    log "cloning ZenMind into $INSTALL_DIR"
    git clone "$REPO_URL" "$INSTALL_DIR"
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

  [[ -f "$script_path" ]] || fail "missing $TARGET_SCRIPT in $INSTALL_DIR"

  if [[ "$DRY_RUN" == "1" ]]; then
    log "dry-run: would execute $script_path $*"
    return
  fi

  log "starting $TARGET_SCRIPT"
  exec "$script_path" "$@"
}

main() {
  require_cmd git
  require_cmd bash
  sync_repo
  run_setup "$@"
}

main "$@"
