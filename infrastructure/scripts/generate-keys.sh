#!/bin/bash
# SafeConnect — Key Generation Script
# Run once during initial setup: bash infrastructure/scripts/generate-keys.sh

set -e

KEYS_DIR="./keys"
mkdir -p "$KEYS_DIR"
chmod 700 "$KEYS_DIR"

echo "Generating RSA keypair for JWT signing..."
openssl genrsa -out "$KEYS_DIR/private.pem" 2048
openssl rsa -in "$KEYS_DIR/private.pem" -pubout -out "$KEYS_DIR/public.pem"
chmod 600 "$KEYS_DIR/private.pem"
chmod 644 "$KEYS_DIR/public.pem"

echo "Generating AES-256 keys for field encryption..."
echo "SERVER_ENCRYPTION_KEY=$(openssl rand -hex 32)" >> "$KEYS_DIR/.env.keys"
echo "PHONE_HASH_SECRET=$(openssl rand -hex 32)" >> "$KEYS_DIR/.env.keys"
echo "IP_HASH_SECRET=$(openssl rand -hex 32)" >> "$KEYS_DIR/.env.keys"
chmod 600 "$KEYS_DIR/.env.keys"

echo ""
echo "Keys generated in $KEYS_DIR/"
echo "  private.pem     — JWT signing key (KEEP SECRET)"
echo "  public.pem      — JWT verification key"
echo "  .env.keys       — AES secrets (KEEP SECRET, add to .env)"
echo ""
echo "WARNING: Never commit keys/ to git. It is in .gitignore."
