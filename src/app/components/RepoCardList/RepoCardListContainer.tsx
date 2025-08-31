'use client';

import { useState } from 'react';

import { Loading, Button } from '@/app/components';
import { Filter } from '@/app/components';
import { useStarredRepos, useLanguageFilter, useRepoData } from '@/app/hooks';

import RepoCardList from './RepoCardList';

const RepoCardListContainer = () => {
  const [isStarredFilterEnabled, setIsStarredFilterEnabled] = useState(false);
  const { selectedLanguage, setSelectedLanguage } = useLanguageFilter();
  const { repos, loading, error } = useRepoData(selectedLanguage);
  const { toggleStar, isRepoStarred, starredRepos } = useStarredRepos();

  // Filter repositories based on active tab and selected language
  const filteredStarredRepos = selectedLanguage === 'All'
    ? starredRepos
    : starredRepos.filter(repo => repo.language === selectedLanguage);

  const repositories = isStarredFilterEnabled ? filteredStarredRepos : repos;

  return (
    <div>
      <div className='flex flex-col sm:flex-row gap-4 sm:justify-between'>
        <Button
          className='w-full sm:w-52'
          onClick={() => setIsStarredFilterEnabled(prev => !prev)}
          variant={isStarredFilterEnabled ? 'primary' : 'secondary'}
        >
          Starred Repositories
        </Button>

        <div className='w-full sm:w-auto'>
          <Filter
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </div>
      </div>
      <div className="mt-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loading />
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error}
          </div>
        ) : isStarredFilterEnabled && repositories.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">
              {starredRepos.length === 0
                ? "No starred repositories yet"
                : `No starred ${selectedLanguage === 'All' ? '' : selectedLanguage + ' '}repositories found`
              }
            </p>
            <p className="text-sm mt-2">
              {starredRepos.length === 0
                ? "Star some repositories to see them here!"
                : selectedLanguage === 'All'
                  ? "Try selecting a different language filter."
                  : `Try selecting "All" or a different language filter.`
              }
            </p>
          </div>
        ) : (
          <div>
            <RepoCardList
              repositories={repositories}
              toggleStar={toggleStar}
              isRepoStarred={isRepoStarred}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RepoCardListContainer;
