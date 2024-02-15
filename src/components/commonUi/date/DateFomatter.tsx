import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface DateProps {
  date: string | number | Date;
}

function DateDisplay({ date }: DateProps) {
  const d = new Date(date);
  const now = Date.now();
  const diff = (now - d.getTime()) / 1000; // 현재 시간과의 차이(초)
  if (diff < 60 * 1) {
    return '방금 전';
  }
  if (diff < 60 * 60 * 24 * 3) {
    return formatDistanceToNow(d, { addSuffix: true, locale: ko });
  }
  return format(d, 'PPP EEE p', { locale: ko }); // 날짜 포맷
}

const DateFormatter: React.FC<DateProps> = ({ date }) => {
  const formattedDate = DateDisplay({ date });
  return (
    <span>{formattedDate}</span> 
  );
};

export default DateFormatter;
