# PATERA (P.T.L) - 동호회 운영 관리 시스템

여러 사람이 동시에 접속하고 실시간으로 데이터를 공유하는 동호회 운영 관리 웹 애플리케이션입니다.

## 🎯 주요 기능

### 일반 회원
- **로그인**: 이름 입력만으로 로그인 (회원가입, 비밀번호 불필요)
- **목요일 모임**: 신청 규칙에 따른 자동 승격
  - 일반 신청: 목19:00 ~ 수17:59
  - 추가 신청: 수18:00 ~ 목19:00
- **일요일 모임**: 단순 참여/취소/미정
- **실시간 반영**: 다른 사용자의 변경사항이 즉시 반영
- **참여 내역 조회**: 과거 참여 기록 확인

### 관리자
- **회원 관리**: 전체 회원, 참여자, 대기자 조회
- **강제 조정**: 강제 취소, 강제 승격
- **통계 및 기록**: CSV 다운로드, 검색 기능
- **대시보드**: 한 화면에서 전체 현황 파악

## 🛠 기술 스택

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Supabase Realtime**

### Backend
- **Supabase**
- **PostgreSQL**
- **Edge Functions** (자동 승격 로직)

### Deployment
- **Vercel**
- **GitHub** (자동 배포)

## 📁 프로젝트 구조

```
patera/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── page.tsx      # 홈/로그인
│   │   ├── admin/        # 관리자 페이지
│   │   └── layout.tsx    # 레이아웃
│   ├── lib/              # 유틸리티
│   │   ├── supabase.ts   # Supabase 클라이언트
│   │   ├── types.ts      # TypeScript 타입
│   │   ├── utils.ts      # 헬퍼 함수
│   │   └── database.types.ts # DB 타입
│   └── app/
│       ├── globals.css   # 전역 스타일
│       ├── layout.tsx    # 루트 레이아웃
│       ├── page.tsx      # 홈 페이지
│       └── admin/
│           └── page.tsx  # 관리자 페이지
├── public/               # 정적 파일
├── supabase/
│   └── migrations/       # DB 스키마
├── .env.example          # 환경변수 예시
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
└── README.md
```

## 🚀 설치 및 실행

### 1. 클론
```bash
git clone https://github.com/unyopaal/patera.git
cd patera
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경변수 설정
```bash
cp .env.example .env.local
# .env.local 파일을 열어 Supabase 정보 입력
```

### 4. 데이터베이스 마이그레이션
Supabase 콘솔에서 SQL을 실행:
```sql
-- supabase/migrations/001_initial_schema.sql 의 내용을 복사하여 실행
```

### 5. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

## 📊 데이터베이스 스키마

### users (회원)
- `id` (UUID, PK)
- `name` (TEXT)
- `created_at` (TIMESTAMP)

### meetings (모임)
- `id` (UUID, PK)
- `type` (ENUM: 'thursday', 'sunday')
- `date` (DATE)
- `start` (TIME)
- `end` (TIME)
- `created_at` (TIMESTAMP)

### registrations (신청 현황)
- `id` (UUID, PK)
- `meeting_id` (FK)
- `user_id` (FK)
- `status` (ENUM: 'confirmed', 'waitingA', 'waitingB', 'cancelled', 'maybe')
- `created_at` (TIMESTAMP)

### attendance_logs (참여 기록)
- `id` (UUID, PK)
- `meeting_id` (FK)
- `user_id` (FK)
- `action` (ENUM: 'participated', 'cancelled', 'promoted', 'no_show')
- `created_at` (TIMESTAMP)

## 🔐 보안

- 관리자는 관리자 페이지 접근 시 비밀번호 필요
- 일반 회원이 관리자 URL 접근 시 홈으로 리다이렉트
- Supabase RLS (Row Level Security) 정책 적용

## 🎨 UI/UX 특징

- **색상**: 짙은 네이비 배경, 골드 & 라임 포인트
- **디자인**: Glassmorphism 카드, 둥근 버튼
- **상태 표시**: 🟢 참여, 🟡 대기, 🔴 취소, ⚪ 미정
- **반응형**: 모바일 우선 설계
- **실시간**: Supabase Realtime으로 새로고침 없이 자동 반영

## 📝 개발 로드맵

### Phase 1 (필수)
- [ ] 기본 구조 및 UI
- [ ] 로그인 기능
- [ ] 목요일/일요일 모임 신청
- [ ] 실시간 반영

### Phase 2 (중요)
- [ ] 자동 승격 로직
- [ ] 관리자 대시보드
- [ ] 참여 기록 저장

### Phase 3 (개선)
- [ ] 이름 자동완성
- [ ] 참가 인원 실시간 표시
- [ ] 신청 오픈 카운트다운
- [ ] CSV 다운로드

## 🤝 기여

이슈 등록 및 PR은 자유롭게 진행하세요!

## 📄 라이선스

MIT
