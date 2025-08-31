import config from '@/app/config';
import { type Language } from '@/app/constants';

export type GitHubRepository = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

export type GitHubSearchResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubRepository[];
}

async function fetchTrendingRepos(language?: Language): Promise<GitHubRepository[]> {
  const baseUrl = config.GITHUB_API_URL;
  
  // Get date range for last week
  const now = new Date();
  const lastWeek = new Date(now.getTime() - config.FETCH_PERIOD);
  const begin = lastWeek.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  const end = now.toISOString().split('T')[0];

  // Build search query for repositories created in the last week, sorted by stars
  let query = `pushed:>=${begin} pushed:<=${end} stars:>0`;
  
  // Add language filter if specified and not 'All'
  if (language && language !== 'All') {
    query += ` language:${language}`;
  }

  const searchParams = new URLSearchParams({
    q: query,
    sort: 'stars',
    order: 'desc',
    per_page: config.FETCH_COUNT.toString()
  });
  
  const url = `${baseUrl}?${searchParams.toString()}`;
  
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`);
    }

    const data: GitHubSearchResponse = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching trending repositories:', error);
    throw error;
  }
}

export default fetchTrendingRepos;