#!/usr/bin/env bash
# Reproducible local install of DeepDive + Phone OSINT Framework with Claude Code skills.
# Linux / macOS / Windows (Git Bash - the shell Claude Code uses on Windows).
# Usage: bash install.sh            (installs to ~/tools, cases in ~/osint-cases)
#        TOOLS_DIR=/path bash install.sh
set -euo pipefail
KIT="$(cd "$(dirname "$0")" && pwd)"
TOOLS="${TOOLS_DIR:-$HOME/tools}"
CASES="${OSINT_CASES_DIR:-$HOME/osint-cases}"
SKILLS="$HOME/.claude/skills"
DD_URL=https://github.com/Sinndarkblade/deepdive;           DD_SHA=5626f4d6a21caf6a13a62b2a53145641c87ff151
PH_URL=https://github.com/aegisceo/phone-osint-framework;   PH_SHA=acd577a375a397d228b28c84a8c1a9e2d6e3c89d
TS="$(date +%Y%m%d%H%M%S)"

case "$TOOLS$CASES" in *[Rr]after[Xx]*) echo "Refusing: tools/cases must live outside the RafterX vault." >&2; exit 1;; esac
command -v git >/dev/null || { echo "git is required" >&2; exit 1; }

venv_py() { if [[ -x "$1/.venv/bin/python" ]]; then echo "$1/.venv/bin/python"; else echo "$1/.venv/Scripts/python.exe"; fi; }

make_venv() {  # $1=app dir  $2=python version
  local d="$1" v="$2"
  [[ -e "$(venv_py "$d")" ]] && { echo "  venv exists: $d/.venv"; return; }
  if command -v uv >/dev/null; then uv venv -q -p "$v" "$d/.venv"
  elif command -v py >/dev/null; then py -"$v" -m venv "$d/.venv"
  elif command -v "python$v" >/dev/null; then "python$v" -m venv "$d/.venv"
  else echo "ERROR: Python $v not found (install it, or install uv: https://docs.astral.sh/uv/)" >&2; exit 1; fi
}

pip_install() {  # $1=app dir  $2..=pip args
  local d="$1"; shift; local py; py="$(venv_py "$d")"
  if command -v uv >/dev/null; then uv pip install -q -p "$py" "$@"; else "$py" -m pip install -q "$@"; fi
}

fetch() {  # $1=url $2=dir $3=sha $4=patch
  local url="$1" d="$2" sha="$3" patch="$4"
  if [[ -d "$d/.git" ]]; then
    echo "  exists: $d (not re-cloned)"
  else
    git -c core.autocrlf=false clone -q "$url" "$d"
  fi
  if git -C "$d" apply --reverse --check "$patch" 2>/dev/null; then echo "  patch already applied"; return; fi
  if [[ -n "$(git -C "$d" status --porcelain --untracked-files=no)" ]]; then
    echo "ERROR: $d has local modifications that are not this kit's patch - resolve manually." >&2; exit 1
  fi
  git -C "$d" -c advice.detachedHead=false checkout -q "$sha"
  git -C "$d" apply "$patch"; echo "  checked out $sha + applied $(basename "$patch")"
}

mkdir -p "$TOOLS/bin" "$CASES"
echo "[1/5] DeepDive";  fetch "$DD_URL" "$TOOLS/deepdive" "$DD_SHA" "$KIT/patches/deepdive.patch"
make_venv "$TOOLS/deepdive" 3.12
pip_install "$TOOLS/deepdive" -r "$KIT/locks/deepdive-py312.txt" || pip_install "$TOOLS/deepdive" -r "$TOOLS/deepdive/requirements.txt" ddgs

echo "[2/5] Phone OSINT Framework"; fetch "$PH_URL" "$TOOLS/phone-osint-framework" "$PH_SHA" "$KIT/patches/phone-osint-framework.patch"
make_venv "$TOOLS/phone-osint-framework" 3.11
pip_install "$TOOLS/phone-osint-framework" -r "$KIT/locks/phone-osint-py311.txt" || pip_install "$TOOLS/phone-osint-framework" -r "$TOOLS/phone-osint-framework/requirements.txt" pytest
ENVF="$TOOLS/phone-osint-framework/config/.env"
if [[ ! -f "$ENVF" ]]; then sed -E 's/^([A-Z_]+)=your_[^ ]*/\1=/' "$TOOLS/phone-osint-framework/config/.env.example" > "$ENVF"; chmod 600 "$ENVF" || true; echo "  created blank $ENVF"; fi

echo "[3/5] Launchers -> $TOOLS/bin"
for f in deepdive phone-osint; do
  sed "s#\$HOME/tools/#$TOOLS/#g" "$KIT/bin/$f" > "$TOOLS/bin/$f"; chmod +x "$TOOLS/bin/$f"
done

echo "[4/5] Claude Code skills -> $SKILLS"
for s in deepdive phone-osint; do
  mkdir -p "$SKILLS/$s"
  if [[ -f "$SKILLS/$s/SKILL.md" ]] && ! cmp -s "$SKILLS/$s/SKILL.md" "$KIT/skills/$s/SKILL.md"; then
    cp "$SKILLS/$s/SKILL.md" "$SKILLS/$s/SKILL.md.bak-$TS"; echo "  backed up existing $s/SKILL.md"
  fi
  cp -R "$KIT/skills/$s/." "$SKILLS/$s/"
  if [[ "$TOOLS" != "$HOME/tools" ]]; then sed "s#~/tools/#$TOOLS/#g" "$SKILLS/$s/SKILL.md" > "$SKILLS/$s/SKILL.md.tmp" && mv "$SKILLS/$s/SKILL.md.tmp" "$SKILLS/$s/SKILL.md"; fi
done
mkdir -p "$HOME/.deepdive"; cp "$KIT/config/deepdive-settings.template.json" "$HOME/.deepdive/settings.template.json"

echo "[5/5] Verify"
"$(venv_py "$TOOLS/deepdive")" -m compileall -q "$TOOLS/deepdive/core" "$TOOLS/deepdive/server" "$TOOLS/deepdive/src" >/dev/null && echo "  deepdive: compiles"
(cd "$TOOLS/deepdive" && PYTHONPATH=. "$(venv_py "$TOOLS/deepdive")" -c "import sys;sys.path[:0]=['core','cli','src'];import server.app,search.ddg;print('  deepdive: imports ok')")
(cd "$TOOLS/phone-osint-framework" && "$(venv_py "$TOOLS/phone-osint-framework")" -c "import phone_osint_master,web_interface;print('  phone-osint: imports ok')")
"$TOOLS/bin/phone-osint" validate +447700900123 >/dev/null && echo "  phone-osint: offline validate ok"
echo "Done. Restart Claude Code, then try: /deepdive status   and   /phone-osint check"
