import { renderHook } from '@testing-library/react';
import useDateRange from './useDateRange';
import mockData from '@/app/__mocks__/dateRangeMocks.json';

// Mock the config
jest.mock('@/app/config', () => ({
  FETCH_PERIOD: 7 * 24 * 60 * 60 * 1000 // 7 days
}));

describe('useDateRange', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  describe('useDateRange', () => {
    it('should return correct date range for a standard week', () => {
      // Mock system time to a fixed date
      jest.useFakeTimers();
      jest.setSystemTime(new Date(mockData.testDates.mockNow));

      const { result } = renderHook(() => useDateRange());
      const dateRange = result.current;

      expect(dateRange.begin).toBe(mockData.testDates.expectedBegin);
      expect(dateRange.end).toBe(mockData.testDates.expectedEnd);
    });

    it('should handle year transition correctly', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date(mockData.edgeCases.newYearTransition.mockNow));

      const { result } = renderHook(() => useDateRange());
      const dateRange = result.current;

      expect(dateRange.begin).toBe(mockData.edgeCases.newYearTransition.expectedBegin);
      expect(dateRange.end).toBe(mockData.edgeCases.newYearTransition.expectedEnd);
    });

    it('should handle leap year February correctly', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date(mockData.edgeCases.leapYearFebruary.mockNow));

      const { result } = renderHook(() => useDateRange());
      const dateRange = result.current;

      expect(dateRange.begin).toBe(mockData.edgeCases.leapYearFebruary.expectedBegin);
      expect(dateRange.end).toBe(mockData.edgeCases.leapYearFebruary.expectedEnd);
    });

    it('should return dates in YYYY-MM-DD format', () => {
      const { result } = renderHook(() => useDateRange());
      const dateRange = result.current;

      // Test format using regex
      const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
      expect(dateRange.begin).toMatch(dateFormat);
      expect(dateRange.end).toMatch(dateFormat);
    });

    it('should ensure begin date is exactly 7 days before end date', () => {
      const { result } = renderHook(() => useDateRange());
      const dateRange = result.current;

      const beginDate = new Date(dateRange.begin);
      const endDate = new Date(dateRange.end);
      
      const timeDifference = endDate.getTime() - beginDate.getTime();
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
      
      expect(daysDifference).toBe(7);
    });

    it('should return consistent results when called multiple times in the same day', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date(mockData.testDates.mockNow));

      const { result, rerender } = renderHook(() => useDateRange());
      
      const firstCall = result.current;
      rerender();
      const secondCall = result.current;

      expect(firstCall.begin).toBe(secondCall.begin);
      expect(firstCall.end).toBe(secondCall.end);
    });
  });
});
