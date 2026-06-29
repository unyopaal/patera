'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin';
    
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('비밀번호가 올바르지 않습니다');
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-navy via-navy to-blue-900 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="glass p-8 rounded-2xl">
            <h1 className="text-2xl font-bold mb-6 text-gold">관리자 로��인</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full btn-primary"
              >
                로그인
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-navy via-navy to-blue-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gold">관리자 대시보드</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="btn-secondary text-sm"
          >
            로그아웃
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Stats Cards */}
          <div className="glass p-6 rounded-xl text-center">
            <p className="text-white/60 text-sm mb-2">목요일 참여</p>
            <p className="text-3xl font-bold text-lime">0</p>
          </div>
          <div className="glass p-6 rounded-xl text-center">
            <p className="text-white/60 text-sm mb-2">목요일 대기</p>
            <p className="text-3xl font-bold text-gold">0</p>
          </div>
          <div className="glass p-6 rounded-xl text-center">
            <p className="text-white/60 text-sm mb-2">일요일 참여</p>
            <p className="text-3xl font-bold text-lime">0</p>
          </div>
          <div className="glass p-6 rounded-xl text-center">
            <p className="text-white/60 text-sm mb-2">전체 회원</p>
            <p className="text-3xl font-bold text-gold">0</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="glass p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-gold">기능 개발 중...</h2>
          <p className="text-white/60 whitespace-pre-line">
            • 회원 관리
            • 강제 취소/승격
            • 참여 기록 조회
            • CSV 다운로드
          </p>
        </div>
      </div>
    </main>
  );
}