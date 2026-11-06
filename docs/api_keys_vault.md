# 🔒 DMDG Confidential API Keys & Credentials Vault
> ⚠️ **SECURITY WARNING**: 
> This document is strictly excluded from Git tracking via `.gitignore` (`*vault*.md`).
> NEVER commit, copy, or expose these private API secrets to public frontend files, client-side HTML/JS, or public repositories.

---

### 1. 💳 포트원 (PortOne v2) 결제 연동 키

| 구분 | 키 명칭 / 용도 | 키 값 (Credential) | 보안 등급 & 사용처 |
| :--- | :--- | :--- | :--- |
| **Store ID (상점 식별자)** | `PORTONE_STORE_ID` | `store-e66b704c-bdd0-4e99-9ec1-a7602b3b6d56` | 🟢 **공개 가능 (Frontend)**<br>브라우저 JavaScript SDK `PortOne.requestPayment({ storeId })` 호출용 |
| **API Secret (관리자 비밀키)** | `PORTONE_API_SECRET` | `YISBLsuisoziqAll5femCO6QydgeSP8LCr14SmpaJkTqsXX2Y8GVOFX1mxn7b80dudQiwM8n0B8B3sum` | 🔴 **절대 비공개 (Backend Only)**<br>결제 사후 위변조 검증, 결제 취소/환불 API 호출 헤더용 (`Authorization: PortOne <API_SECRET>`).<br>프론트엔드 HTML/JS에 포함 절대 금지! |

---

### 2. 🛡️ 보안 관리 원칙
1. **프론트엔드(`index.html`)**: `storeId`만 사용합니다.
2. **백엔드(Firebase Cloud Functions / Python 서버)**: `process.env.PORTONE_API_SECRET`를 참조하여 결제 위변조 검증 및 트랜잭션 검사를 수행합니다.
3. **로컬 환경 변수**: 루트 디렉터리의 `.env` 파일에 저장되어 관리됩니다.
