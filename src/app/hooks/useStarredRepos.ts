'use client';

import { useState, useEffect } from 'react';
import type { GitHubRepository } from '@/app/data';

const STARRED_REPOS_KEY = process.env.NEXT_PUBLIC_STARRED_REPOS_KEY || 'starredRepositories';

// Starring-related types
export type StarringActions = {
  toggleStar: (repository: GitHubRepository) => void;
  isRepoStarred: (repoId: number) => boolean;
};

export type StarredReposHookReturn = StarringActions & {
  starredRepos: GitHubRepository[];
};

export type StarringProps = {
  isStarred: boolean;
  onStarRepository: (repository: GitHubRepository) => void;
};

const useStarredRepos = (): StarredReposHookReturn => {
  const [starredRepos, setStarredRepos] = useState<GitHubRepository[]>([]);

  const getStarredFromStorage = (): GitHubRepository[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      const starred = localStorage.getItem(STARRED_REPOS_KEY);
      return starred ? JSON.parse(starred) : [];
    } catch (error) {
      console.error('Error reading starred repos from localStorage:', error);
      return [];
    }
  };

  const saveStarredToStorage = (repos: GitHubRepository[]): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STARRED_REPOS_KEY, JSON.stringify(repos));
    } catch (error) {
      console.error('Error saving starred repos to localStorage:', error);
    }
  };

  useEffect(() => {
    // Load starred repos from localStorage on mount
    setStarredRepos(getStarredFromStorage());
  }, []);

  const toggleStar = (repository: GitHubRepository) => {
    setStarredRepos(prev => {
      const isStarred = prev.some(repo => repo.id === repository.id);
      const newStarredRepos = isStarred 
        ? prev.filter(repo => repo.id !== repository.id)
        : [...prev, repository];
      
      saveStarredToStorage(newStarredRepos);
      
      return newStarredRepos;
    });
  };

  const isRepoStarred = (repoId: number): boolean => {
    return starredRepos.some(repo => repo.id === repoId);
  };

  return {
    starredRepos,
    toggleStar,
    isRepoStarred
  };
};

export default useStarredRepos;