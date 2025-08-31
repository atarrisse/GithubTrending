import { render, screen } from '@testing-library/react';
import RepoCardList from './RepoCardList';
import { mockRepositories } from '@/app/__mocks__';

jest.mock('@/app/assets/star-icon.svg', () => () => <svg data-testid="star-icon" />);

const mockToggleStar = jest.fn();
const mockIsRepoStarred = jest.fn(() => false);

describe('RepoCardList', () => {
  beforeEach(() => {
    mockToggleStar.mockClear();
    mockIsRepoStarred.mockClear();
  });

  it('renders cards with repositories', () => {
    render(
      <RepoCardList 
        repositories={mockRepositories} 
        toggleStar={mockToggleStar}
        isRepoStarred={mockIsRepoStarred}
      />
    );

    // Check if repository data is present
    expect(screen.getByText('first-repo')).toBeInTheDocument();
    expect(screen.getByText('second-repo')).toBeInTheDocument();
    expect(screen.getByText('First test repository')).toBeInTheDocument();
    expect(screen.getByText('Second test repository')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders empty state when no repositories provided', () => {
    render(
      <RepoCardList 
        repositories={[]} 
        toggleStar={mockToggleStar}
        isRepoStarred={mockIsRepoStarred}
      />
    );

    expect(screen.getByText('No repositories found for the specified criteria.')).toBeInTheDocument();
  });

  it('renders correct number of repository cards', () => {
    const { container } = render(
      <RepoCardList 
        repositories={mockRepositories} 
        toggleStar={mockToggleStar}
        isRepoStarred={mockIsRepoStarred}
      />
    );

    const cards = container.querySelectorAll('.bg-white');
    expect(cards).toHaveLength(2);
  });

  it('has proper grid structure', () => {
    const { container } = render(
      <RepoCardList 
        repositories={mockRepositories} 
        toggleStar={mockToggleStar}
        isRepoStarred={mockIsRepoStarred}
      />
    );

    const gridContainer = container.firstChild as HTMLElement;
    expect(gridContainer).toHaveClass('grid', 'gap-6', 'md:grid-cols-2', 'lg:grid-cols-3');
  });

  it('handles single repository', () => {
    const singleRepo = [mockRepositories[0]];
    render(
      <RepoCardList 
        repositories={singleRepo} 
        toggleStar={mockToggleStar}
        isRepoStarred={mockIsRepoStarred}
      />
    );

    expect(screen.getByText('first-repo')).toBeInTheDocument();
    expect(screen.queryByText('second-repo')).not.toBeInTheDocument();
  });

  it('renders repository links correctly', () => {
    render(
      <RepoCardList 
        repositories={mockRepositories} 
        toggleStar={mockToggleStar}
        isRepoStarred={mockIsRepoStarred}
      />
    );

    const firstRepoLink = screen.getByRole('link', { name: 'first-repo' });
    const secondRepoLink = screen.getByRole('link', { name: 'second-repo' });
    
    expect(firstRepoLink).toHaveAttribute('href', 'https://github.com/user1/first-repo');
    expect(secondRepoLink).toHaveAttribute('href', 'https://github.com/user2/second-repo');
  });
});
