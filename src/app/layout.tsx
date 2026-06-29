import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PATERA - 동호회 운영 관리',
  description: '동호회 운영을 위한 실시간 신청 관리 시스템',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-navy text-white min-h-screen">
        <div className="container mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}