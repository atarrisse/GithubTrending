'use client';

import { useState, useEffect } from 'react';
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

  const loadRepos = async () => {
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
  };

  useEffect(() => {
    loadRepos();
  }, [selectedLanguage]);

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
