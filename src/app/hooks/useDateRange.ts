import config from '@/app/config';

export type DateRange = {
  begin: string;
  end: string;
};

/**
 * Custom hook for date range calculations
 * @returns Object with begin and end dates for the last week in YYYY-MM-DD format
 */
export function useDateRange(): DateRange {
  const now = new Date();
  const lastWeek = new Date(now.getTime() - config.FETCH_PERIOD);
  
  return {
    begin: lastWeek.toISOString().split('T')[0], // Format: YYYY-MM-DD
    end: now.toISOString().split('T')[0]
  };
}

export default useDateRange;
