import React, { useState, useEffect, useRef } from 'react';

const RealtimePixelClicker = () => {
  const [pixels, setPixels] = useState([]);
  const [userName, setUserName] = useState('');
  const [isJoined, setIsJoined] = useState(true); // 처음 접속 시 바로 서비스 진입
  const [activityFeed, setActivityFeed] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [showAllActivity, setShowAllActivity] = useState(false);
  const [adClicks, setAdClicks] = useState(0);
  const [adAnimation, setAdAnimation] = useState(false);
  const [location, setLocation] = useState('서울');
  const [district, setDistrict] = useState('강남구');
  const [totalClicks, setTotalClicks] = useState(0); // 전체 클릭 카운터
  const [showLoginModal, setShowLoginModal] = useState(false); // 로그인 모달 표시 여부

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
    '#52B788', '#F48FB1'
  ];

  const locationData = {
    '서울': ['강남구', '서초구', '송파구', '강동구', '마포구', '영등포구', '종로구', '중구', '용산구', '성동구', '광진구', '동대문구', '중랑구', '성북구', '강북구', '도봉구', '노원구', '은평구', '서대문구', '양천구', '강서구', '구로구', '금천구', '관악구', '동작구'],
    '부산': ['해운대구', '수영구', '남구', '동구', '부산진구', '연제구', '동래구', '금정구', '북구', '강서구', '사상구', '사하구', '서구', '중구', '영도구', '기장군'],
    '대구': ['중구', '동구', '서구', '남구', '북구', '수성구', '달서구', '달성군'],
    '인천': ['중구', '동구', '미추홀구', '연수구', '남동구', '부평구', '계양구', '서구', '강화군', '옹진군'],
    '광주': ['동구', '서구', '남구', '북구', '광산구'],
    '대전': ['동구', '중구', '서구', '유성구', '대덕구'],
    '울산': ['중구', '남구', '동구', '북구', '울주군']
  };
  const demoUsers = ['클릭마스터', '픽셀헌터', '무한클릭러', '튼튼한손가락', '빠른손', '클릭의신', '퇴사러버', '색칠왕', '클릭돌이', '클릭스타'];

  useEffect(() => {
    // 초기 픽셀 생성 (일부는 광고 픽셀)
    const initialPixels = [];
    const adPixelIndices = [7, 17]; // 광고 픽셀 위치 (2개)
    
    for (let i = 0; i < 25; i++) {
      initialPixels.push({
        id: i,
        clicks: 0,
        color: '#E0E0E0',
        lastUser: null,
        isAd: adPixelIndices.includes(i)
      });
    }
    setPixels(initialPixels);

    // 자정 리셋 타이머 설정
    const checkAndResetAtMidnight = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const timeUntilMidnight = midnight.getTime() - now.getTime();

      setTimeout(() => {
        // 자정에 모든 데이터 리셋
        setPixels(initialPixels);
        setAdClicks(0);
        setActivityFeed([]);
        
        // 다음 자정을 위해 다시 타이머 설정
        checkAndResetAtMidnight();
      }, timeUntilMidnight);
    };

    checkAndResetAtMidnight();
  }, []);

  useEffect(() => {
    if (!isJoined) return;

    // 다른 사용자들의 랜덤 활동 시뮬레이션
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        const randomUser = demoUsers[Math.floor(Math.random() * demoUsers.length)];
        const randomPixel = Math.floor(Math.random() * 25);
        
        setPixels(prev => prev.map(pixel => {
          if (pixel.id === randomPixel) {
            const newClicks = pixel.clicks + 1;
            const colorIndex = Math.floor(newClicks / 3) % colors.length;
            return {
              ...pixel,
              clicks: newClicks,
              color: colors[colorIndex],
              lastUser: randomUser
            };
          }
          return pixel;
        }));

        addActivity(randomUser, randomPixel, 'other');
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isJoined]);

  useEffect(() => {
    if (isJoined) {
      // 온라인 사용자 시뮬레이션 (6~10명)
      const randomCount = Math.floor(Math.random() * 5) + 5;
      const users = [userName, ...demoUsers.slice(0, randomCount)];
      setOnlineUsers(users.map(name => ({
        name,
        location: `${location} ${district}`,
        color: colors[Math.floor(Math.random() * colors.length)]
      })));
    }
  }, [isJoined, userName, location, district]);

  const addActivity = (user, pixelId, type) => {
    const timestamp = new Date().toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
    
    setActivityFeed(prev => {
      const newFeed = [...prev, { user, pixelId, timestamp, type, id: Date.now() }];
      return newFeed; // 모든 활동 기록 유지
    });
  };

  const handlePixelClick = (id) => {
    if (!isJoined) return;

    const clickedPixel = pixels.find(p => p.id === id);
    
    // 전체 클릭 카운터 증가
    setTotalClicks(prev => {
      const newTotalClicks = prev + 1;
      
      // 100번 클릭 후 로그인 모달 표시
      if (newTotalClicks === 100 && !showLoginModal) {
        setShowLoginModal(true);
      }
      
      return newTotalClicks;
    });
    
    // 광고 픽셀인 경우
    if (clickedPixel.isAd) {
      handleAdClick();
      return;
    }

    setPixels(prev => prev.map(pixel => {
      if (pixel.id === id) {
        const newClicks = pixel.clicks + 1;
        const colorIndex = Math.floor(newClicks / 3) % colors.length;
        return {
          ...pixel,
          clicks: newClicks,
          color: colors[colorIndex],
          lastUser: userName || '게스트'
        };
      }
      return pixel;
    }));

    addActivity(userName || '게스트', id, 'self');
  };

  const handleAdClick = () => {
    if (!isJoined) return;
    
    setAdClicks(prev => prev + 1);
    setAdAnimation(true);
    setTimeout(() => setAdAnimation(false), 300);
    
    addActivity(userName || '게스트', null, 'ad');
  };

  const handleJoin = () => {
    if (userName.trim()) {
      setIsJoined(true);
      setShowLoginModal(false);
      addActivity(userName, null, 'join');
    }
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* 상단 클릭 카운터 */}
        <div className="bg-gray-800 rounded-xl shadow-xl p-4 border border-gray-700 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-white">픽셀 클리커</h1>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">총 클릭:</span>
                <span className="text-cyan-400 font-bold text-xl">{totalClicks}</span>
                <span className="text-gray-400">번</span>
              </div>
            </div>
            {userName && (
              <div className="flex items-center gap-2">
                <span className="text-gray-400">안녕하세요,</span>
                <span className="text-white font-semibold">{userName}</span>
                <span className="text-gray-400">님!</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:h-[calc(100vh-8rem)]">
          {/* 왼쪽: 온라인 사용자 */}
          <div className="bg-gray-800 rounded-xl shadow-xl p-4 border border-gray-700 lg:overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center sticky top-0 bg-gray-800 pb-2">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              온라인 ({onlineUsers.length})
            </h2>
            <div className="space-y-2">
              {(showAllUsers ? onlineUsers : onlineUsers.slice(0, 6)).map((user, idx) => (
                <div key={idx} className="bg-gray-700 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: user.color }}
                    ></div>
                    <span className="text-white font-medium">{user.name}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{user.location}</span>
                </div>
              ))}
              {onlineUsers.length > 6 && (
                <button
                  onClick={() => setShowAllUsers(!showAllUsers)}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-cyan-400 rounded-lg p-3 text-sm transition-colors"
                >
                  {showAllUsers ? '접기' : `더보기 (+${onlineUsers.length - 6}명)`}
                </button>
              )}
            </div>
          </div>

          {/* 중앙: 픽셀 보드 */}
          <div className="bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-700 flex flex-col lg:overflow-hidden">
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-white mb-1">픽셀 보드</h1>
              <p className="text-gray-400 text-sm">{location} {district}</p>
              <p className="text-gray-500 text-xs mt-1">
                ⏰ 매일 자정 00:00에 리셋됩니다
              </p>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="grid grid-cols-5 gap-2 max-w-md">
                {pixels.map(pixel => (
                  <button
                    key={pixel.id}
                    onClick={() => handlePixelClick(pixel.id)}
                    className="relative w-16 h-16 rounded-lg transition-all duration-200 transform hover:scale-110 focus:outline-none"
                    style={{
                      backgroundColor: pixel.isAd 
                        ? `linear-gradient(135deg, #9333ea 0%, #ec4899 100%)`
                        : pixel.color,
                      background: pixel.isAd 
                        ? 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)'
                        : pixel.color,
                      boxShadow: pixel.isAd 
                        ? '0 0 20px rgba(236, 72, 153, 0.5)' 
                        : pixel.color !== '#E0E0E0' ? `0 0 15px ${pixel.color}40` : 'none'
                    }}
                  >
                    {pixel.isAd ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-white text-lg">📢</span>
                        <span className="text-white font-bold text-[10px] mt-0.5">AD</span>
                      </div>
                    ) : pixel.clicks > 0 ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-white font-bold text-xs drop-shadow-lg">
                          {pixel.clicks}
                        </span>
                        {pixel.lastUser && (
                          <span className="text-white text-[8px] opacity-75">
                            {pixel.lastUser}
                          </span>
                        )}
                      </div>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center text-gray-500 text-xs mt-4 mb-4">
              <p>클릭하면 색이 변해요! ✨</p>
              <p className="mt-1">📢 광고 픽셀을 클릭하면 광고 카운트가 올라가요!</p>
            </div>

            {/* 광고 클릭 통계 */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-yellow-400 text-lg">👆</span>
                  <span className="text-cyan-400 font-bold text-2xl">{adClicks}</span>
                  <span className="text-gray-400 text-sm">광고 클릭</span>
                </div>
                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-3 border border-purple-700/30">
                  <p className="text-white font-bold text-sm mb-1">
                    {adClicks === 0 && '🎯 광고 픽셀을 클릭해보세요!'}
                    {adClicks >= 1 && adClicks < 100 && '✨ 클릭해주셔서 감사합니다!'}
                    {adClicks >= 100 && adClicks < 300 && '🔥 100 돌파! 계속 클릭해보세요!'}
                    {adClicks >= 300 && adClicks < 500 && '💪 300 달성! 더 높이 올라가요!'}
                    {adClicks >= 500 && adClicks < 1000 && '🚀 500 통과! 엄청난 관심!'}
                    {adClicks >= 1000 && adClicks < 2000 && '⭐ 1,000 돌파! 인기 폭발!'}
                    {adClicks >= 2000 && adClicks < 3000 && '🌟 2,000 달성! 대단해요!'}
                    {adClicks >= 3000 && adClicks < 5000 && '💫 3,000 통과! 놀라운 기록!'}
                    {adClicks >= 5000 && adClicks < 7000 && '🏆 5,000 돌파! 챔피언급!'}
                    {adClicks >= 7000 && adClicks < 10000 && '👑 7,000 달성! 거의 다 왔어요!'}
                    {adClicks >= 10000 && '💎 10,000 달성! 전설의 등급!'}
                  </p>
                  <p className="text-purple-200 text-xs">
                    {adClicks === 0 && '보드 안의 📢 픽셀을 클릭하면 카운트가 올라갑니다'}
                    {adClicks >= 1 && adClicks < 100 && `다음 단계까지 ${100 - adClicks}번`}
                    {adClicks >= 100 && adClicks < 300 && `다음 단계까지 ${300 - adClicks}번`}
                    {adClicks >= 300 && adClicks < 500 && `다음 단계까지 ${500 - adClicks}번`}
                    {adClicks >= 500 && adClicks < 1000 && `다음 단계까지 ${1000 - adClicks}번`}
                    {adClicks >= 1000 && adClicks < 2000 && `다음 단계까지 ${2000 - adClicks}번`}
                    {adClicks >= 2000 && adClicks < 3000 && `다음 단계까지 ${3000 - adClicks}번`}
                    {adClicks >= 3000 && adClicks < 5000 && `다음 단계까지 ${5000 - adClicks}번`}
                    {adClicks >= 5000 && adClicks < 7000 && `다음 단계까지 ${7000 - adClicks}번`}
                    {adClicks >= 7000 && adClicks < 10000 && `최고 등급까지 ${10000 - adClicks}번!`}
                    {adClicks >= 10000 && '최고 등급 달성! 🎉'}
                  </p>
                  {adClicks >= 100 && (
                    <div className="mt-2 flex justify-center gap-1">
                      {adClicks >= 100 && <span className="text-xl animate-pulse">⭐</span>}
                      {adClicks >= 500 && <span className="text-xl animate-pulse">⭐</span>}
                      {adClicks >= 1000 && <span className="text-xl animate-pulse">⭐</span>}
                      {adClicks >= 3000 && <span className="text-xl animate-pulse">⭐</span>}
                      {adClicks >= 5000 && <span className="text-xl animate-pulse">⭐</span>}
                      {adClicks >= 7000 && <span className="text-xl animate-pulse">⭐</span>}
                      {adClicks >= 10000 && <span className="text-xl animate-pulse">⭐</span>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 실시간 활동 피드 */}
          <div className="bg-gray-800 rounded-xl shadow-xl p-4 border border-gray-700 flex flex-col lg:overflow-hidden">
            <h2 className="text-xl font-bold text-white mb-4 flex-shrink-0">실시간 활동</h2>
            <div className="space-y-2 flex-1 overflow-y-auto">
              {(showAllActivity ? activityFeed : activityFeed.slice(-20)).reverse().map(activity => (
                <div 
                  key={activity.id}
                  className={`rounded-lg p-3 text-sm flex-shrink-0 ${
                    activity.type === 'self' 
                      ? 'bg-cyan-900/50 border border-cyan-700' 
                      : activity.type === 'join'
                      ? 'bg-green-900/50 border border-green-700'
                      : activity.type === 'ad'
                      ? 'bg-purple-900/50 border border-purple-700'
                      : 'bg-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-white font-medium">{activity.user}</span>
                    <span className="text-gray-400 text-xs">{activity.timestamp}</span>
                  </div>
                  {activity.type === 'join' ? (
                    <p className="text-gray-300 text-xs">접속했습니다</p>
                  ) : activity.type === 'ad' ? (
                    <p className="text-gray-300 text-xs">광고를 클릭했습니다 👆</p>
                  ) : (
                    <p className="text-gray-300 text-xs">
                      픽셀 #{activity.pixelId + 1}을(를) 클릭했습니다
                    </p>
                  )}
                </div>
              ))}
              {activityFeed.length > 20 && (
                <button
                  onClick={() => setShowAllActivity(!showAllActivity)}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-cyan-400 rounded-lg p-3 text-sm transition-colors flex-shrink-0"
                >
                  {showAllActivity ? '최근 활동만 보기' : `전체 보기 (+${activityFeed.length - 20}개)`}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 로그인 모달 */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700 max-w-md w-full">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">로그인</h1>
              <p className="text-gray-400">클릭 {totalClicks}번 달성! 🎉</p>
            </div>
            
            {/* 키보드 캡 */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => setUserName(prev => prev + '퇴')}
                className="w-16 h-16 bg-gray-700 hover:bg-gray-600 text-white font-bold text-xl rounded-lg transition-colors duration-200 border border-gray-600 hover:border-gray-500"
              >
                퇴
              </button>
              <button
                onClick={() => setUserName(prev => prev + '사')}
                className="w-16 h-16 bg-gray-700 hover:bg-gray-600 text-white font-bold text-xl rounded-lg transition-colors duration-200 border border-gray-600 hover:border-gray-500"
              >
                사
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2 text-sm">닉네임</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleJoin()}
                  placeholder="닉네임을 입력하세요"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  maxLength={10}
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm">지역</label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      setDistrict(locationData[e.target.value][0]);
                    }}
                    className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    {Object.keys(locationData).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    {locationData[location].map(dist => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleJoin}
                  disabled={!userName.trim()}
                  className="flex-1 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  로그인
                </button>
                <button
                  onClick={handleCloseLoginModal}
                  className="px-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  return <RealtimePixelClicker />;
}

export default App;
