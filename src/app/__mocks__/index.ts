import type { GitHubRepository } from '@/app/data';
import mockRepositoryData from './mockRepository.json';
import mockRepositoryNoLanguageData from './mockRepositoryNoLanguage.json';
import mockRepositoriesData from './mockRepositories.json';
import starredReposMocksData from './starredReposMocks.json';

export const mockRepository = mockRepositoryData as GitHubRepository;
export const mockRepositoryNoLanguage = mockRepositoryNoLanguageData as GitHubRepository;
export const mockRepositories = mockRepositoriesData as GitHubRepository[];
export const starredReposMocks = starredReposMocksData;
