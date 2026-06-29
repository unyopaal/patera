// 날짜 관련 유틸리티
export const getThisWeekThursday = (): Date => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilThursday = (4 - dayOfWeek + 7) % 7 || 7;
  const thursday = new Date(today);
  thursday.setDate(thursday.getDate() + daysUntilThursday);
  return thursday;
};

export const getThisWeekSunday = (): Date => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilSunday = (0 - dayOfWeek + 7) % 7 || 7;
  const sunday = new Date(today);
  sunday.setDate(sunday.getDate() + daysUntilSunday);
  return sunday;
};

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatTime = (time: string): string => {
  return time.slice(0, 5); // HH:mm
};

// 상태 관련 유틸리티
export const getStatusBadge = (status: string): string => {
  const badges: Record<string, string> = {
    confirmed: '🟢 참여',
    waitingA: '🟡 대기A',
    waitingB: '🟡 대기B',
    cancelled: '🔴 취소',
    maybe: '⚪ 미정',
  };
  return badges[status] || status;
};

// 카운트다운 계산
export const getCountdown = (targetDate: Date): string => {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) return '신청 오픈!';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days}일 ${hours}시간 ${minutes}분`;
  if (hours > 0) return `${hours}시간 ${minutes}분`;
  return `${minutes}분`;
};