# 픽셀 클리커 - 퇴사버튼 🎯

실시간 픽셀 클릭 게임으로, 사용자들이 함께 픽셀을 클릭하며 색상을 변화시키는 인터랙티브 웹 애플리케이션입니다.

## 🚀 주요 기능

- **실시간 픽셀 보드**: 5x5 그리드의 픽셀을 클릭하여 색상 변화
- **온라인 사용자 표시**: 현재 접속 중인 사용자들과 지역 정보
- **실시간 활동 피드**: 사용자들의 클릭 활동을 실시간으로 표시
- **광고 픽셀 시스템**: 특별한 광고 픽셀 클릭으로 별도 카운트
- **자동 리셋**: 매일 자정에 모든 데이터 초기화
- **지역별 사용자**: 전국 주요 도시별 사용자 구분

## 🛠️ 기술 스택

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Deployment**: Vercel

## 📦 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 프로덕션 빌드
```bash
npm run build
```

### 4. 빌드 미리보기
```bash
npm run preview
```

## 🌐 배포

### Vercel 자동 배포
1. GitHub 저장소에 코드 푸시
2. Vercel에서 GitHub 저장소 연결
3. 자동 배포 설정 완료

### 수동 배포
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel --prod
```

## 🎮 게임 방법

1. **닉네임 입력**: 참여하기 전 닉네임과 지역을 선택
2. **픽셀 클릭**: 5x5 보드의 픽셀을 클릭하여 색상 변화
3. **광고 픽셀**: 📢 표시된 특별한 픽셀을 클릭하여 광고 카운트 증가
4. **실시간 피드**: 다른 사용자들의 활동을 실시간으로 확인

## 🎨 색상 시스템

- 클릭할 때마다 픽셀의 색상이 변화
- 3번 클릭마다 새로운 색상으로 변경
- 10가지 다양한 색상 팔레트 제공

## 📱 반응형 디자인

- 데스크톱: 3열 레이아웃 (사용자 목록, 픽셀 보드, 활동 피드)
- 모바일: 1열 레이아웃으로 자동 조정

## 🔄 자동 리셋

- 매일 자정 00:00에 모든 픽셀 데이터 초기화
- 광고 클릭 카운트도 함께 리셋
- 새로운 하루의 시작을 알리는 시스템

## 📊 통계 시스템

- 광고 클릭 수에 따른 등급 시스템
- 100, 300, 500, 1000, 2000, 3000, 5000, 7000, 10000 클릭 달성 시 특별 메시지
- 별(⭐) 이모지로 달성 등급 표시

## 🏗️ 프로젝트 구조

```
pixel-clicker/
├── public/
├── src/
│   ├── App.jsx          # 메인 컴포넌트
│   ├── main.jsx         # React 엔트리 포인트
│   └── index.css        # 글로벌 스타일
├── index.html           # HTML 템플릿
├── package.json         # 의존성 및 스크립트
├── vite.config.js       # Vite 설정
├── tailwind.config.js   # Tailwind CSS 설정
├── postcss.config.js    # PostCSS 설정
├── vercel.json          # Vercel 배포 설정
└── README.md            # 프로젝트 문서
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 연락처

프로젝트 링크: [https://github.com/your-username/pixel-clicker](https://github.com/your-username/pixel-clicker)

---

**즐거운 픽셀 클릭 되세요! 🎉**
