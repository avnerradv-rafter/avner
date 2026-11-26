# SafeConnect — Privacy Policy

**Effective Date:** TBD  
**Last Updated:** 2026-04-09

*Available in: English | עברית*

---

## 1. Who We Are

SafeConnect ("we", "us", "our") is operated by [Company Name], registered in [Jurisdiction]. We can be reached at privacy@safeconnect.app.

## 2. What Data We Collect

### 2.1 Data You Provide
| Data | How Stored | Purpose |
|------|-----------|---------|
| Phone number | HMAC hash only — plaintext never stored | Identity verification |
| Display name | AES-256-GCM encrypted | Profile display |
| Bio | AES-256-GCM encrypted | Profile display |
| Birth year | AES-256-GCM encrypted | Age verification & display |
| Photos | Client-encrypted, stored encrypted in S3 | Profile display |
| Medical information | Zero-knowledge: encrypted before leaving your device | Optional profile information |
| Location | Fuzzed to ~500m; only city name stored | Discovery feature |

### 2.2 Data We Collect Automatically
| Data | How Stored | Purpose |
|------|-----------|---------|
| IP address | Hashed immediately, hash stored max 30 days | Fraud & abuse prevention |
| App version | Plaintext | Bug reporting |
| Device type (iOS/Android) | Plaintext | Feature compatibility |

### 2.3 Data We Never Collect
- Real name
- Email address
- Precise GPS coordinates
- Contacts (we only process hashes you optionally upload for contact blocking)
- Health records beyond what you voluntarily enter

## 3. How We Use Your Data

- Provide and improve the SafeConnect service
- Verify your identity and prevent fraud
- Enable discovery and matching features
- Deliver encrypted messages between users
- Investigate reports of abuse or policy violations
- Comply with legal obligations

We **never** use your data for advertising or sell it to third parties.

## 4. Legal Basis (GDPR)

- **Contract performance** — providing the service you signed up for
- **Legitimate interests** — security, fraud prevention
- **Consent** — medical profile information (you can remove it at any time)

## 5. Data Sharing

We share data only:
- With infrastructure providers (AWS, Hetzner) under strict data processing agreements
- With SMS providers (for OTP delivery, phone number only, not stored by provider)
- When required by law — we will notify you unless legally prohibited and will challenge overbroad requests

## 6. Data Retention

| Data | Retention |
|------|----------|
| Account data | Until deletion request + 30 days |
| Messages | Delivered and deleted from server; TTL per disappearing message setting |
| Audit logs | 90 days, then deleted |
| IP hashes | 30 days |
| Backups | 7 days rolling |

## 7. Your Rights (GDPR)

- **Access** — request a copy of your data
- **Rectification** — correct inaccurate data
- **Erasure** — delete your account and all data
- **Portability** — receive your data in machine-readable format
- **Objection** — object to processing based on legitimate interests

To exercise your rights: privacy@safeconnect.app

## 8. Security

We use industry-leading encryption (AES-256-GCM, Signal Protocol, TLS 1.3). Medical data is zero-knowledge — we cannot read it even if compelled. See our Security Architecture document for details.

## 9. Children

SafeConnect is for users 18 and older. We do not knowingly collect data from minors.

## 10. Changes

We will notify you of material changes via in-app notification at least 30 days before they take effect.
