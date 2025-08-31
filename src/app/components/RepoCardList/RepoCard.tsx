import type { GitHubRepository } from '@/app/data';
import type { StarringProps } from '@/app/hooks/useStarredRepos';
import { StarButton } from '@/app/components';
import { formatDate } from '@/app/utils/dateUtils';
import StarIcon from '@/app/assets/star-icon.svg';

type RepoCardProps = {
  repository: GitHubRepository;
} & StarringProps;

const RepoCard = ({ repository: repo, isStarred, onStarRepository }: RepoCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 mr-4">
          <a 
            href={repo.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xl font-semibold text-blue-600 hover:underline cursor-pointer block"
          >
            {repo.name}
          </a>
          <span className="text-sm text-gray-500 mt-1 block">{repo.full_name}</span>
        </div>
        <StarButton
          isStarred={isStarred}
          onStarRepository={() => onStarRepository(repo)}
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="text-gray-700 text-sm leading-relaxed">
          {repo.description || 'No description available'}
        </p>
      </div>

      {/* Language and stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Language badge */}
          {repo.language ? (
            <span className="inline-flex px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
              {repo.language}
            </span>
          ) : (
            <span className="text-xs text-gray-400">No language</span>
          )}
          
          {/* Stars count */}
          <div className="flex items-center text-yellow-500">
            <StarIcon className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium text-gray-700">
              {repo.stargazers_count.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Created date */}
        <div className="text-xs text-gray-500">
          Created {formatDate(repo.created_at)}
        </div>
      </div>
    </div>
  );
};

export default RepoCard;
