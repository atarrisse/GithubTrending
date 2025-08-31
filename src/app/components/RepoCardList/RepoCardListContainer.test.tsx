import { render, screen, waitFor, act } from '@testing-library/react';
import RepoCardListContainer from './RepoCardListContainer';
import { fetchTrendingRepos } from '@/app/data';

jest.mock('@/app/data', () => ({
    fetchTrendingRepos: jest.fn(),
}));

const mockFetchTrendingRepos = fetchTrendingRepos as jest.MockedFunction<typeof fetchTrendingRepos>;

describe('RepoCardListContainer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('calls fetchTrendingRepos on mount', () => {
        mockFetchTrendingRepos.mockImplementation(() => new Promise(() => { }));

        render(<RepoCardListContainer />);

        expect(mockFetchTrendingRepos).toHaveBeenCalledTimes(1);
        expect(mockFetchTrendingRepos).toHaveBeenCalledWith('All');
    });

    it('shows loading state initially', () => {
        mockFetchTrendingRepos.mockImplementation(() => new Promise(() => { }));

        render(<RepoCardListContainer />);

        expect(screen.getByText('Loading trending repositories...')).toBeInTheDocument();
        expect(screen.queryByText('Error:')).not.toBeInTheDocument();
    });

    it('renders empty state when no repositories are returned', async () => {
        mockFetchTrendingRepos.mockResolvedValue([]);

        render(<RepoCardListContainer />);

        await waitFor(() => {
            expect(screen.getByText('No repositories found for the specified criteria.')).toBeInTheDocument();
        });

        expect(screen.queryByText('Loading trending repositories...')).not.toBeInTheDocument();
    });

    it('shows error message when fetch fails', async () => {
        const errorMessage = 'Failed to fetch repositories';
        mockFetchTrendingRepos.mockRejectedValue(new Error(errorMessage));

        render(<RepoCardListContainer />);

        expect(screen.getByText('Loading trending repositories...')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Error:')).toBeInTheDocument();
        });

        expect(screen.queryByText('Loading trending repositories...')).not.toBeInTheDocument();
        expect(screen.getByText(errorMessage)).toBeInTheDocument();

        const errorElement = screen.getByText('Error:').parentElement;
        expect(errorElement).toHaveClass('bg-red-100', 'border-red-400', 'text-red-700');
    });

    it('shows generic error message for non-Error objects', async () => {
        mockFetchTrendingRepos.mockRejectedValue('String error');

        render(<RepoCardListContainer />);

        await waitFor(() => {
            expect(screen.getByText('Error:')).toBeInTheDocument();
        });

        expect(screen.getByText('Failed to fetch repositories')).toBeInTheDocument();
    });

    it('renders starred repositories button', () => {
        mockFetchTrendingRepos.mockImplementation(() => new Promise(() => { }));

        render(<RepoCardListContainer />);

        const starredButton = screen.getByRole('button', { name: 'Starred Repositories' });
        expect(starredButton).toBeInTheDocument();
    });

    it('renders language filter', () => {
        mockFetchTrendingRepos.mockImplementation(() => new Promise(() => { }));

        render(<RepoCardListContainer />);

        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('shows empty starred repositories message when no starred repos exist', async () => {
        mockFetchTrendingRepos.mockResolvedValue([]);

        render(<RepoCardListContainer />);

        // Wait for initial load to complete
        await waitFor(() => {
            expect(screen.queryByText('Loading trending repositories...')).not.toBeInTheDocument();
        });

        // Click starred repositories button
        const starredButton = screen.getByRole('button', { name: 'Starred Repositories' });
        await act(async () => {
            starredButton.click();
        });

        expect(screen.getByText('No starred repositories yet')).toBeInTheDocument();
        expect(screen.getByText('Star some repositories to see them here!')).toBeInTheDocument();
    });

    it('renders filter component with correct props', async () => {
        mockFetchTrendingRepos.mockResolvedValue([]);

        render(<RepoCardListContainer />);

        // Wait for load to complete
        await waitFor(() => {
            expect(screen.queryByText('Loading trending repositories...')).not.toBeInTheDocument();
        });

        // Verify the Filter component is rendered
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
});
