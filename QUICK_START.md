# 픽셀 클리커 빠른 시작 가이드 🚀

이 파일을 열어서 바로 프로젝트를 시작하세요!

## ⚡ 즉시 실행

### 1단계: 의존성 설치
```bash
npm install
```

### 2단계: 개발 서버 실행
```bash
npm run dev
```

### 3단계: 브라우저에서 확인
- 자동으로 `http://localhost:3000`이 열립니다
- 픽셀 클리커 게임을 즐기세요!

## 🎮 게임 플레이

1. **닉네임 입력**: 원하는 닉네임과 지역 선택
2. **참여하기 클릭**: 게임에 참여
3. **픽셀 클릭**: 5x5 보드의 픽셀을 클릭하여 색상 변화
4. **광고 픽셀**: 📢 표시된 픽셀을 클릭하여 광고 카운트 증가
5. **실시간 피드**: 다른 사용자들의 활동 확인

## 🚀 배포하기

### GitHub + Vercel 자동 배포
1. **GitHub 저장소 생성**
2. **코드 푸시**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```
3. **Vercel에서 배포**:
   - [vercel.com](https://vercel.com) 접속
   - GitHub 저장소 연결
   - 자동 배포 완료!

## 📁 프로젝트 구조

```
pixel-clicker-complete/
├── 📄 package.json          # 프로젝트 설정
├── 📄 index.html            # HTML 템플릿
├── 📄 vite.config.js        # Vite 설정
├── 📄 tailwind.config.js    # Tailwind CSS 설정
├── 📄 vercel.json           # Vercel 배포 설정
├── 📁 src/
│   ├── 📄 App.jsx           # 메인 컴포넌트 (게임 로직)
│   ├── 📄 main.jsx          # React 엔트리 포인트
│   └── 📄 index.css         # 글로벌 스타일
└── 📁 public/
    └── 📄 vite.svg          # 파비콘
```

## 🛠️ 주요 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 린트 검사
npm run lint
```

## 🎯 주요 기능

- ✅ **실시간 픽셀 보드**: 5x5 그리드 클릭 게임
- ✅ **온라인 사용자**: 실시간 사용자 목록
- ✅ **활동 피드**: 실시간 클릭 활동 표시
- ✅ **광고 시스템**: 특별한 광고 픽셀
- ✅ **자동 리셋**: 매일 자정 데이터 초기화
- ✅ **반응형 디자인**: 모바일/데스크톱 지원
- ✅ **지역별 사용자**: 전국 주요 도시 구분

## 🔧 커스터마이징

### 색상 변경
`src/App.jsx`의 `colors` 배열에서 색상 수정:
```javascript
const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', // 원하는 색상으로 변경
  // ...
];
```

### 광고 픽셀 위치 변경
`src/App.jsx`의 `adPixelIndices` 배열에서 위치 수정:
```javascript
const adPixelIndices = [7, 17]; // 0-24 범위에서 원하는 위치
```

### 지역 데이터 추가
`src/App.jsx`의 `locationData` 객체에 새로운 지역 추가:
```javascript
const locationData = {
  '서울': [...],
  '새로운지역': ['구1', '구2', '구3'], // 추가
  // ...
};
```

## 🚨 문제 해결

### 빌드 오류
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

### 포트 충돌
`vite.config.js`에서 포트 변경:
```javascript
server: {
  port: 3001, // 다른 포트로 변경
}
```

### 스타일이 적용되지 않음
Tailwind CSS가 제대로 설정되었는지 확인:
```bash
npm run build
```

## 📞 도움말

- **GitHub**: [https://github.com/powergild/pixel-clicker](https://github.com/powergild/pixel-clicker)
- **Vercel**: [vercel.com](https://vercel.com)
- **Vite 문서**: [vitejs.dev](https://vitejs.dev)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)

---

**즐거운 개발 되세요! 🎉**
