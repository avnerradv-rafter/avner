# SafeConnect — Data Protection Impact Assessment (DPIA)

**Version:** 0.1  
**Date:** 2026-04-09  
**Status:** Draft — requires legal review before launch

---

## 1. Overview

This DPIA is required under GDPR Article 35 because SafeConnect processes special category data (health data — HIV status) at scale.

## 2. Processing Description

| Item | Detail |
|------|--------|
| Controller | [Company Name] |
| Processing purpose | Dating app for PLHIV and HIV-open individuals |
| Special categories | Health data (HIV status, treatment, viral load) |
| Data subjects | App users (EU and global) |
| Recipients | None (data not shared with third parties) |
| Transfers | EU infrastructure only; no third-country transfers |

## 3. Necessity & Proportionality

HIV status information is strictly optional and collected only to:
- Allow users to filter potential matches by status preferences
- Reduce disclosure anxiety by enabling users to communicate status on their own terms

Users may use the app without entering any medical information. Medical data can be deleted at any time independently of the account.

## 4. Risk Assessment

### 4.1 Identified Risks

| Risk | Likelihood | Severity | Risk Level |
|------|-----------|----------|-----------|
| Database breach exposes HIV status | Low (zero-knowledge encryption) | Critical | Medium |
| Employee accesses user medical data | Very Low (no server-side keys) | Critical | Low |
| User is outed by another user | Medium | High | High |
| State actor compels disclosure | Low | Critical | Medium |
| Account takeover | Medium | High | High |

### 4.2 Mitigations

- **Database breach:** Zero-knowledge encryption — server has no medical decryption keys
- **Insider threat:** Technical controls prevent access to plaintext medical data
- **User outing:** Report system, block, legal prohibition in ToS, screenshot detection
- **State compelled disclosure:** Zero-knowledge design means we have nothing to disclose
- **Account takeover:** Mandatory TOTP 2FA, anomaly detection, session management

## 5. Consultation

Prior to launch, we will consult with:
- [ ] Legal counsel specializing in health data privacy
- [ ] HIV patient advocacy organizations
- [ ] Data Protection Authority (if required)
- [ ] Independent security auditor

## 6. Residual Risk

After mitigations, residual risk is assessed as **Low** for most scenarios and **Medium** for the risk of user-to-user outing (which cannot be fully mitigated technically and requires community standards enforcement).

## 7. DPO Sign-off

- [ ] DPO review: Pending
- [ ] Legal review: Pending
- [ ] Board approval: Pending

## 8. Review Schedule

This DPIA will be reviewed:
- Before launch
- Annually
- Whenever a significant change to processing occurs
