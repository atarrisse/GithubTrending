import type { GitHubRepository } from '@/app/data';
import type { StarringActions } from '@/app/hooks/useStarredRepos';
import RepoCard from './RepoCard';

type RepoCardListProps = {
  repositories: GitHubRepository[];
} & StarringActions;

const RepoCardList = ({ repositories, toggleStar, isRepoStarred }: RepoCardListProps) => {
  if (repositories.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No repositories found for the specified criteria.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {repositories.map((repo) => (
        <RepoCard 
          key={repo.id} 
          repository={repo} 
          isStarred={isRepoStarred(repo.id)}
          onStarRepository={toggleStar}
        />
      ))}
    </div>
  );
};

export default RepoCardList;
