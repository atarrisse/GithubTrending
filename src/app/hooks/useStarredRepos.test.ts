import { renderHook, act } from '@testing-library/react';

import { starredReposMocks } from '@/app/__mocks__';

import useStarredRepos from './useStarredRepos';

const STARRED_REPOS_KEY = 'starredRepositories';

const {mockRepo123, mockRepo456, mockRepo789} = starredReposMocks;

const createMockLocalStorage = () => {
  let storage: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => storage[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      storage[key] = value;
    }),
    clear: jest.fn(() => {
      storage = {};
    }),
  };
};

const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

describe('useStarredRepos', () => {
  let mockLocalStorage: ReturnType<typeof createMockLocalStorage>;

  beforeEach(() => {
    mockLocalStorage = createMockLocalStorage();
    mockConsoleError.mockClear();

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      configurable: true,
    });
    
    // Clear storage before each test
    mockLocalStorage.clear();
  });

  it('initializes with empty array', () => {
    const { result } = renderHook(() => useStarredRepos());
    expect(result.current.starredRepos).toEqual([]);
  });

  it('loads existing starred repos from localStorage', () => {
    const testRepos = [mockRepo123, mockRepo456, mockRepo789];
    mockLocalStorage.setItem(STARRED_REPOS_KEY, JSON.stringify(testRepos));
    const { result } = renderHook(() => useStarredRepos());
    expect(result.current.starredRepos).toEqual(testRepos);
  });

  it('checks if repository is starred', () => {
    mockLocalStorage.setItem(STARRED_REPOS_KEY, JSON.stringify([mockRepo123]));
    const { result } = renderHook(() => useStarredRepos());
    
    expect(result.current.isRepoStarred(123)).toBe(true);
    expect(result.current.isRepoStarred(456)).toBe(false);
  });

  it('adds repository to starred list', () => {
    const { result } = renderHook(() => useStarredRepos());

    act(() => {
      result.current.toggleStar(mockRepo123);
    });

    expect(result.current.starredRepos).toEqual([mockRepo123]);
    expect(result.current.isRepoStarred(123)).toBe(true);
  });

  it('removes repository from starred list', () => {
    mockLocalStorage.setItem(STARRED_REPOS_KEY, JSON.stringify([mockRepo123, mockRepo456]));
    const { result } = renderHook(() => useStarredRepos());

    act(() => {
      result.current.toggleStar(mockRepo123);
    });

    expect(result.current.starredRepos).toEqual([mockRepo456]);
    expect(result.current.isRepoStarred(123)).toBe(false);
  });

  it('handles multiple toggle operations', () => {
    const { result } = renderHook(() => useStarredRepos());

    act(() => {
      result.current.toggleStar(mockRepo123);
      result.current.toggleStar(mockRepo456);
      result.current.toggleStar(mockRepo123); // unstar
    });

    expect(result.current.starredRepos).toEqual([mockRepo456]);
  });

  it('persists across hook instances', () => {
    const { result: result1 } = renderHook(() => useStarredRepos());

    act(() => {
      result1.current.toggleStar(mockRepo123);
    });

    const { result: result2 } = renderHook(() => useStarredRepos());
    expect(result2.current.starredRepos).toEqual([mockRepo123]);
  });
});