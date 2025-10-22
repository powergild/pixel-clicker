# 배포 가이드 🚀

이 가이드는 픽셀 클리커 프로젝트를 GitHub와 Vercel에 배포하는 방법을 안내합니다.

## 📋 사전 준비사항

1. **GitHub 계정** - 코드 저장소용
2. **Vercel 계정** - 웹 호스팅용
3. **Node.js** (v16 이상) - 로컬 개발용

## 🔧 1단계: 로컬 개발 환경 설정

### 의존성 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속하여 정상 작동 확인

## 📦 2단계: GitHub 저장소 생성 및 푸시

### 1. GitHub에서 새 저장소 생성
- GitHub.com 접속
- "New repository" 클릭
- Repository name: `pixel-clicker`
- Description: `실시간 픽셀 클릭 게임`
- Public으로 설정
- "Create repository" 클릭

### 2. 로컬에서 Git 초기화 및 푸시
```bash
# Git 초기화
git init

# 원격 저장소 추가 (YOUR_USERNAME을 실제 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/pixel-clicker.git

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: 픽셀 클리커 프로젝트"

# 메인 브랜치로 푸시
git branch -M main
git push -u origin main
```

## 🌐 3단계: Vercel 배포 설정

### 1. Vercel 계정 생성
- [vercel.com](https://vercel.com) 접속
- GitHub 계정으로 로그인

### 2. 프로젝트 임포트
- Vercel 대시보드에서 "New Project" 클릭
- GitHub 저장소 목록에서 `pixel-clicker` 선택
- "Import" 클릭

### 3. 빌드 설정 확인
Vercel이 자동으로 다음 설정을 감지합니다:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. 환경 변수 설정 (필요시)
현재 프로젝트는 환경 변수가 필요하지 않지만, 필요하다면:
- Project Settings → Environment Variables
- 필요한 변수 추가

### 5. 배포 실행
- "Deploy" 버튼 클릭
- 빌드 과정 모니터링
- 배포 완료 후 제공되는 URL 확인

## 🔄 4단계: 자동 배포 설정

### GitHub Actions (선택사항)
더 고급 CI/CD를 원한다면 `.github/workflows/deploy.yml` 파일 생성:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm install
    - name: Build
      run: npm run build
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## 🎯 5단계: 도메인 설정 (선택사항)

### 커스텀 도메인 추가
1. Vercel 프로젝트 설정 → Domains
2. 원하는 도메인 입력
3. DNS 설정 안내에 따라 도메인 제공업체에서 설정

## 📊 6단계: 모니터링 및 관리

### Vercel 대시보드에서 확인 가능한 정보:
- **Analytics**: 방문자 통계
- **Functions**: 서버리스 함수 로그
- **Deployments**: 배포 히스토리
- **Performance**: 성능 메트릭

### 로그 확인
```bash
# Vercel CLI로 로그 확인
npx vercel logs
```

## 🔧 문제 해결

### 일반적인 문제들:

1. **빌드 실패**
   - `package.json`의 의존성 확인
   - Node.js 버전 호환성 확인

2. **환경 변수 문제**
   - Vercel 대시보드에서 환경 변수 설정 확인
   - 빌드 시점과 런타임 시점 구분

3. **라우팅 문제**
   - SPA 라우팅을 위한 `vercel.json` 설정 확인
   - 404 페이지 처리

### 디버깅 명령어:
```bash
# 로컬에서 프로덕션 빌드 테스트
npm run build
npm run preview

# Vercel CLI로 로컬 테스트
npx vercel dev
```

## 🎉 배포 완료!

배포가 완료되면:
1. Vercel에서 제공하는 URL로 접속
2. 모든 기능이 정상 작동하는지 확인
3. 모바일에서도 테스트
4. 성능 최적화 확인

## 📞 추가 도움

- **Vercel 문서**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Actions**: [docs.github.com/actions](https://docs.github.com/actions)
- **Vite 배포 가이드**: [vitejs.dev/guide/static-deploy](https://vitejs.dev/guide/static-deploy)

---

**성공적인 배포를 위해 화이팅! 🚀**
