import mockData from '@/app/__mocks__/githubApiMocks.json';

import fetchTrendingRepos from '@/app/data/fetchTrendingRepos';

jest.mock('@/app/config', () => ({ 
    GITHUB_API_URL: "https://api.github.com/search/repositories",
    FETCH_COUNT: 30,
    FETCH_PERIOD: 7 * 24 * 60 * 60 * 1000 // 7 days
}));

// Mock the useDateRange hook
jest.mock('@/app/hooks/useDateRange', () => ({
    useDateRange: () => ({
        begin: '2024-12-13',
        end: '2024-12-20'
    })
}));

// Mock fetch globally
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('fetchTrendingRepos', () => {
    describe('Successful API responses', () => {
        it('should fetch multiple trending repositories successfully', async () => {
            const mockResponse = mockData.multipleRepositories;
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            } as Response);

            const result = await fetchTrendingRepos();

            expect(result).toEqual(mockResponse.items);
            expect(result).toHaveLength(3);
            expect(result[0].stargazers_count).toBe(5000);
            expect(result[1].description).toBeNull();
            expect(result[1].language).toBeNull();
            expect(result[2].language).toBe('Python');
        });

        it('should handle empty search results', async () => {
            const mockResponse = mockData.emptyResults;
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            } as Response);

            const result = await fetchTrendingRepos();

            expect(result).toEqual([]);
            expect(result).toHaveLength(0);
        });

        it('should call GitHub API with correct search parameters for last week', async () => {
            const mockResponse = mockData.multipleRepositories;
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            } as Response);

            await fetchTrendingRepos();

            // Verify the API was called with the correct URL structure
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringMatching(/^https:\/\/api\.github\.com\/search\/repositories\?/)
            );

            // Get the actual URL that was called
            const calledUrl = mockFetch.mock.calls[0][0] as string;
            const url = new URL(calledUrl);
            
            // Verify query parameters
            expect(url.searchParams.get('sort')).toBe('stars');
            expect(url.searchParams.get('order')).toBe('desc');
            expect(url.searchParams.get('per_page')).toBe('30');
            
            // Verify the query contains date filtering and stars filtering
            const queryParam = url.searchParams.get('q');
            expect(queryParam).toMatch(/pushed:>=/);
            expect(queryParam).toMatch(/pushed:<=/);
            expect(queryParam).toMatch(/stars:>0/);
        });
    });
});