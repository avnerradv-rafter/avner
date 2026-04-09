# SafeConnect — Security Architecture

**Version:** 0.1  
**Classification:** Internal

---

## 1. Threat Model

### 1.1 Assets to Protect
1. User identity (phone number, real name)
2. Medical information (HIV status, treatment details)
3. Location data
4. Photos
5. Messages
6. Social graph (who is connected to whom)

### 1.2 Threat Actors
- **External attacker** — attempts to breach the database or API
- **Malicious insider** — employee with database access
- **Malicious user** — attempts to dox, blackmail, or out another user
- **State actor** — compelled disclosure, surveillance
- **Data broker** — wants to aggregate and sell user data

### 1.3 Mitigations Summary

| Threat | Mitigation |
|--------|-----------|
| DB breach | Field-level AES-256-GCM encryption; medical data zero-knowledge |
| Insider threat | Encrypted fields; no decryption keys on server for medical data |
| Doxing | Fuzzed location; no real name required; hashed phone |
| Blackmail | Screenshot detection; panic mode; easy reporting |
| State compelled disclosure | Zero-knowledge design; minimal data retention |

## 2. Encryption Architecture

### 2.1 Key Hierarchy

```
Master Secret (user password)
    └── Profile Encryption Key (PEK) [derived via PBKDF2-SHA512, 600k iterations]
            ├── Field keys (display name, bio, birth year)
            └── Photo key (per-photo, wrapped by PEK)

Medical Data Encryption Key (MDEK) [separate password or biometric-derived]
    ├── HIV status
    ├── Treatment status
    └── Diagnosis year
```

### 2.2 Server-Side Encryption
- All database fields containing PII: AES-256-GCM with server-managed field encryption key (FEK)
- FEK stored in AWS KMS / HashiCorp Vault, never in application code or environment variables in plaintext
- FEK rotated annually

### 2.3 Medical Data (Zero-Knowledge)
- Encrypted client-side before leaving the device
- Server stores only ciphertext blobs
- Server encryption key never touches medical data
- Users can decrypt only with their own password/biometric

### 2.4 Message Encryption
- Signal Protocol (X3DH key exchange + Double Ratchet)
- Forward secrecy: compromise of current keys does not expose past messages
- Break-in recovery: compromise of past keys does not expose future messages

## 3. Authentication

### 3.1 Registration Flow
1. User enters phone number
2. Phone number HMAC-hashed before storage (secret stored in KMS)
3. SMS OTP sent (6-digit, 10-minute TTL)
4. On verification, TOTP secret generated and QR shown
5. User must enroll authenticator app (mandatory, not optional)
6. JWT (RS256) issued on successful 2FA

### 3.2 Session Management
- Access token: 15-minute TTL, RS256 JWT
- Refresh token: 7-day TTL, stored httpOnly cookie + Redis allowlist
- All tokens invalidated on password change or account wipe

### 3.3 Brute Force Protection
- OTP: 5 attempts then 1-hour lockout
- Login: 10 attempts then account lock + email notification
- TOTP: 3 attempts then session terminated

## 4. API Security

### 4.1 Every Endpoint Must Have
- [ ] Rate limiting (global + per-user)
- [ ] JWT authentication middleware
- [ ] Input validation (Zod schemas)
- [ ] Audit logging (action, user ID hash, IP hash, timestamp)
- [ ] CORS allowlist

### 4.2 What We Never Log
- Phone numbers
- Real names
- Medical data
- IP addresses (only hashed)
- Message content

## 5. Infrastructure Security

- All traffic: TLS 1.3 minimum
- Database: private subnet, no public endpoint
- Redis: private subnet, AUTH enabled, TLS
- S3: private bucket, pre-signed URLs only (15-min TTL)
- Security groups: principle of least privilege
- Secrets: AWS Secrets Manager / HashiCorp Vault

## 6. Incident Response

1. Detection → PagerDuty alert
2. Containment → rotate affected keys, invalidate all sessions
3. Eradication → patch vulnerability
4. Recovery → restore from backup if needed
5. Notification → users notified within 72 hours per GDPR

## 7. Penetration Testing

- Schedule: before v1 launch, annually thereafter
- Scope: API, mobile apps, infrastructure
- Provider: independent third-party security firm
- Reports: available to enterprise customers under NDA
