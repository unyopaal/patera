'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-navy via-navy to-blue-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-gold via-lime to-gold bg-clip-text text-transparent">
            PATERA
          </h1>
          <p className="text-white/60 text-sm">Premium Tennis Club Management</p>
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {/* Login Card */}
          <div className="glass p-8 rounded-2xl">
            <h2 className="text-xl font-semibold mb-6 text-gold">로그인</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="이름을 입력하세요"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
              />
              <button
                type="submit"
                className="w-full btn-primary"
              >
                진행하기
              </button>
            </form>
          </div>

          {/* Admin Link */}
          <div className="text-center">
            <Link
              href="/admin"
              className="text-white/40 hover:text-gold text-sm underline transition-colors"
            >
              관리자 페이지
            </Link>
          </div>
        </div>

        {/* Feature Preview */}
        <div className="mt-12 space-y-3 text-sm text-white/40">
          <div className="flex items-center gap-2">
            <span className="text-lime">✓</span>
            <span>목요일/일요일 실시간 신청</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lime">✓</span>
            <span>자동 승격 및 대기 관리</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lime">✓</span>
            <span>모든 기기에서 즉시 반영</span>
          </div>
        </div>
      </div>
    </main>
  );
}