import { render, screen } from '@testing-library/react';
import type { GitHubRepository } from '@/app/data';
import RepoCard from './RepoCard';
import { mockRepository, mockRepositoryNoLanguage } from '@/app/__mocks__';

jest.mock('@/app/assets/star-icon.svg', () => () => <svg data-testid="star-icon" />);

describe('RepoCard', () => {
    it('renders repository information correctly', () => {
        render(
            <RepoCard repository={mockRepository} isStarred={false} onStarRepository={jest.fn()} />
        );

        expect(screen.getByText('test-repo')).toBeInTheDocument();
        expect(screen.getByText('testuser/test-repo')).toBeInTheDocument();
        expect(screen.getByText('A test repository for unit testing')).toBeInTheDocument();
        expect(screen.getByText('TypeScript')).toBeInTheDocument();
        expect(screen.getByText('1,234')).toBeInTheDocument();
    });

    it('renders repository link with correct attributes', () => {
        render(
            <RepoCard repository={mockRepository} isStarred={false} onStarRepository={jest.fn()} />
        );

        const link = screen.getByRole('link', { name: 'test-repo' });
        expect(link).toHaveAttribute('href', 'https://github.com/testuser/test-repo');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('handles null language correctly', () => {
        render(
            <RepoCard repository={mockRepositoryNoLanguage} isStarred={false} onStarRepository={jest.fn()} />
        );

        expect(screen.getByText('No language')).toBeInTheDocument();
    });

    it('handles null description correctly', () => {
        render(
            <RepoCard repository={mockRepositoryNoLanguage} isStarred={false} onStarRepository={jest.fn()} />
        );

        expect(screen.getByText('No description available')).toBeInTheDocument();
    });

    it('formats star count with locale string', () => {
        const repoWithManyStars: GitHubRepository = {
            ...mockRepository,
            stargazers_count: 123456
        };

        render(
            <RepoCard repository={repoWithManyStars} isStarred={false} onStarRepository={jest.fn()} />
        );

        expect(screen.getByText('123,456')).toBeInTheDocument();
    });

    it('formats creation date correctly', () => {
        render(
            <RepoCard repository={mockRepository} isStarred={false} onStarRepository={jest.fn()} />
        );

        // Test for formatted date - should contain "Jan" and "2023"
        expect(screen.getByText(/Created.*Jan.*15.*2023/)).toBeInTheDocument();
    });

    it('renders star button correctly', () => {
        render(
            <RepoCard repository={mockRepository} isStarred={true} onStarRepository={jest.fn()} />
        );

        const starButton = screen.getByRole('button');
        expect(starButton).toBeInTheDocument();
    });

    it('applies correct styling classes', () => {
        const { container } = render(
            <RepoCard repository={mockRepository} isStarred={false} onStarRepository={jest.fn()} />
        );

        const cardElement = container.firstChild as HTMLElement;
        expect(cardElement).toHaveClass('bg-white', 'rounded-lg', 'shadow-md', 'border', 'border-gray-200');
    });
});
