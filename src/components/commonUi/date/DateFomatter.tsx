import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Timestamp } from 'firebase/firestore';

interface DateProps {
  date: Date | Timestamp;
}

function DateDisplay({ date }: DateProps) {
  const d = date instanceof Timestamp ? date.toDate() : new Date(date);
  const now = Date.now();
  const diff = (now - d.getTime()) / 1000;
  if (diff < 60 * 1) {
    return '방금 전';
  }
  if (diff < 60 * 60 * 24 * 3) {
    return formatDistanceToNow(d, { addSuffix: true, locale: ko });
  }
  return format(d, 'PPP EEE ', { locale: ko }); // 날짜 포맷
}

const DateFormatter: React.FC<DateProps> = ({ date }) => {
  const formattedDate = DateDisplay({ date });
  return <p className="text-gray-500 text-xs ">{formattedDate}</p>;
};

export default DateFormatter;
