# SafeConnect — Product Requirements Document

**Version:** 0.1  
**Status:** Draft  
**Last Updated:** 2026-04-09

---

## 1. Executive Summary

SafeConnect is a privacy-first dating application serving people living with HIV (PLHIV) and those open to dating them. The app provides a safe, stigma-free environment for meaningful connections, built on a foundation of end-to-end encryption, zero-knowledge medical data, and best-in-class safety features.

## 2. Problem Statement

People living with HIV face unique challenges in the dating world:
- Fear of disclosure leading to stigma or rejection
- Risk of blackmail or "outing" by malicious actors
- Lack of platforms that understand their specific needs
- Isolation from potential partners who are informed and accepting

## 3. Target Users

### Primary
- People living with HIV (PLHIV) of all genders and orientations
- People on PrEP who are open to dating PLHIV
- HIV-negative partners of PLHIV

### Secondary
- Healthcare workers seeking resources for patients
- Community organizations supporting PLHIV

## 4. Core Features

### 4.1 Authentication & Privacy
- Phone number registration (hashed, never stored in plaintext)
- OTP verification + mandatory TOTP 2FA
- Decoy PIN / panic mode (shows empty account)
- One-tap account wipe

### 4.2 Profile
- Display name (encrypted at rest)
- Photos (client-side encrypted)
- Bio (encrypted at rest)
- Age (stored as birth year only, encrypted)
- Gender & orientation (non-binary options included)
- Location (fuzzed to ~500m radius, city only shown)

### 4.3 Medical Profile (Zero-Knowledge)
- HIV status (Positive / Negative / Prefer not to say)
- On treatment (Yes/No)
- Undetectable (U=U — Yes/No)
- Diagnosis year (optional)
- All fields encrypted client-side; server never has decryption key

### 4.4 Discovery & Matching
- Card-based discovery (swipe or button)
- Filter by: distance, age range, status preferences, looking for
- Mutual like → match
- No showing who liked you without premium (reduces pressure)

### 4.5 Messaging (E2E Encrypted)
- Signal Protocol end-to-end encryption
- Text, image, voice messages
- Disappearing messages (configurable: 1h, 24h, 7d, off)
- Screenshot detection + notification
- No server-side message history (messages stored locally only after delivery)

### 4.6 Safety Features (Always Free)
- Block & report
- Contact import blocking (hash-based — prevents known contacts from finding you)
- Panic button → decoy mode
- Screenshot prevention (iOS/Android flags)
- One-tap full account deletion

### 4.7 Community
- Anonymous forum (no profile linked to posts)
- Resource library (treatment info, legal rights, support organizations)
- Ask a counselor (anonymized Q&A)

## 5. Non-Functional Requirements

### 5.1 Privacy
- GDPR compliant (EU data residency)
- HIPAA-aware design (not a covered entity, but best practices applied)
- Right to erasure: account + all data deleted within 30 days of request
- No third-party analytics SDKs
- No ad networks

### 5.2 Security
- TLS 1.3 in transit
- AES-256-GCM at rest for all PII
- Zero-knowledge for medical data
- Signal Protocol for messages
- Penetration test before launch
- Bug bounty program post-launch

### 5.3 Performance
- App load: < 2s cold start
- Profile card load: < 500ms
- Message delivery: < 1s on good connection

### 5.4 Availability
- 99.9% uptime SLA
- Multi-region failover (EU primary)

## 6. Out of Scope (v1)

- Video calling
- Web application
- STI status beyond HIV
- Paid premium features (free during beta)

## 7. Success Metrics

- MAU growth: 20% MoM in first 6 months
- D7 retention: > 40%
- Match rate: > 15% of likes result in matches
- Zero major security incidents in year 1
- App store rating: > 4.5 stars

## 8. Regulatory Considerations

- GDPR (EU General Data Protection Regulation)
- Israel Privacy Protection Law (if serving Israeli users)
- Apple App Store health app guidelines
- Google Play Store sensitive content policies
