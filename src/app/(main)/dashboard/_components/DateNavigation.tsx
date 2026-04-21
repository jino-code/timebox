'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { addDays, subDays } from 'date-fns';
import { useRouter } from 'next/navigation';

type DateNavigationProps = {
  date: string,
};

function DateNavigation({ date }: DateNavigationProps) {

  const router = useRouter();

  const handlePrevDay = () => {
    const prevDay = subDays(new Date(date), 1).toISOString().split('T')[0];
    router.push(`/dashboard?date=${prevDay}`);
  }

  const handleNextDay = () => {
    const nextDay = addDays(new Date(date), 1).toISOString().split('T')[0];
    router.push(`/dashboard?date=${nextDay}`);
  }

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <button onClick={handlePrevDay}><ChevronLeft /></button>
      <span>{date}</span>
      <button onClick={handleNextDay}><ChevronRight /></button>
    </div>
  );
}

export default DateNavigation;
