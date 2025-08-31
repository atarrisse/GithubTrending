'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchTrendingRepos, type GitHubRepository } from '@/app/data';
import { type Language } from '@/app/constants';

export interface RepoDataState {
  repos: GitHubRepository[];
  loading: boolean;
  error: string | null;
}

export interface RepoDataActions {
  refetch: () => Promise<void>;
}

export type UseRepoDataReturn = RepoDataState & RepoDataActions;

export const useRepoData = (selectedLanguage: Language = 'All'): UseRepoDataReturn => {
  const [repos, setRepos] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRepos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const trendingRepos = await fetchTrendingRepos(selectedLanguage);
      setRepos(trendingRepos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
    } finally {
      setLoading(false);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    loadRepos();
  }, [selectedLanguage, loadRepos]);

  const refetch = async () => {
    await loadRepos();
  };

  return {
    repos,
    loading,
    error,
    refetch,
  };
};

export default useRepoData;
