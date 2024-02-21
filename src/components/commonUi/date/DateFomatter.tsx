import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface DateProps {
  date: string | number | Date;
}

function DateDisplay({ date }: DateProps) {
  const d = new Date(date);
  const now = Date.now();
  const diff = (now - d.getTime()) / 1000;
  if (diff < 60 * 1) {
    return '방금 전';
  }
  if (diff < 60 * 60 * 24 * 3) {
    return formatDistanceToNow(d, { addSuffix: true, locale: ko });
  }
  return format(d, 'yyyy년 M월 d일', { locale: ko });
}

const DateFormatter: React.FC<DateProps> = ({ date }) => {
  const formattedDate = DateDisplay({ date });
  return <span className="text-gray-500 text-small">{formattedDate}</span>;
};

export default DateFormatter;
