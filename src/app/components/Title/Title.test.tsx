import { render, screen } from '@testing-library/react';
import Title from './Title';

jest.mock('@/app/hooks/useDateRange', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/app/utils/dateUtils', () => ({
  formatDate: jest.fn(),
}));

import useDateRange from '@/app/hooks/useDateRange';
import { formatDate } from '@/app/utils/dateUtils';

const mockUseDateRange = useDateRange as jest.MockedFunction<typeof useDateRange>;
const mockFormatDate = formatDate as jest.MockedFunction<typeof formatDate>;

describe('Title', () => {
  beforeEach(() => {
    mockUseDateRange.mockClear();
    mockFormatDate.mockClear();
  });

  it('renders the title with formatted date range', () => {
    mockUseDateRange.mockReturnValue({ 
      begin: '2024-12-13', 
      end: '2024-12-20' 
    });
    mockFormatDate.mockImplementation((date: string) => {
      if (date === '2024-12-13') return 'Dec 13, 2024';
      if (date === '2024-12-20') return 'Dec 20, 2024';
      return date;
    });

    render(<Title />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Trending Repos from Dec 13, 2024 to Dec 20, 2024')).toBeInTheDocument();
  });

  it('calls useDateRange hook', () => {
    mockUseDateRange.mockReturnValue({ 
      begin: '2024-01-01', 
      end: '2024-01-08' 
    });
    mockFormatDate.mockReturnValue('Jan 1, 2024');

    render(<Title />);

    expect(mockUseDateRange).toHaveBeenCalledTimes(1);
  });
});
