import { renderHook, waitFor } from '@testing-library/react';
import { useRepoData } from './useRepoData';
import * as fetchTrendingReposModule from '@/app/data/fetchTrendingRepos';
import { type Language } from '@/app/constants';
import mockRepositories from '@/app/__mocks__/mockRepositories.json';

// Mock the fetchTrendingRepos function
jest.mock('@/app/data/fetchTrendingRepos');
const mockFetchTrendingRepos = fetchTrendingReposModule.default as jest.MockedFunction<typeof fetchTrendingReposModule.default>;

describe('useRepoData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with loading state', () => {
    mockFetchTrendingRepos.mockResolvedValue([]);
    
    const { result } = renderHook(() => useRepoData('All'));

    expect(result.current.loading).toBe(true);
    expect(result.current.repos).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  it('should fetch repos successfully and update state', async () => {
    mockFetchTrendingRepos.mockResolvedValue(mockRepositories);

    const { result } = renderHook(() => useRepoData('JavaScript'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.repos).toEqual(mockRepositories);
    expect(result.current.error).toBe(null);
  });

  it('should handle fetch errors', async () => {
    const errorMessage = 'API Error';
    mockFetchTrendingRepos.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useRepoData('Python'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.repos).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
  });

  it('should refetch data when language changes', async () => {
    mockFetchTrendingRepos.mockResolvedValue(mockRepositories);

    const { result, rerender } = renderHook(
      ({ language }: { language: Language }) => useRepoData(language),
      { initialProps: { language: 'JavaScript' as Language } }
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockFetchTrendingRepos).toHaveBeenCalledWith('JavaScript');

    rerender({ language: 'Python' as Language });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockFetchTrendingRepos).toHaveBeenCalledWith('Python');
    expect(mockFetchTrendingRepos).toHaveBeenCalledTimes(2);
  });
});
