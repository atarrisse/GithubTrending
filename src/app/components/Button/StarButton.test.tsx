import { render, screen, fireEvent } from '@testing-library/react';
import StarButton from './StarButton';

jest.mock('@/app/assets/star-icon.svg', () => ({ className }: { className?: string }) =>
    <svg data-testid="star-icon" className={className} />
);

describe('StarButton', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        it('renders a button with star icon', () => {
            render(<StarButton isStarred={false} onStarRepository={jest.fn()} />);

            const button = screen.getByRole('button');
            const icon = screen.getByTestId('star-icon');

            expect(button).toBeInTheDocument();
            expect(icon).toBeInTheDocument();
        });

        it('renders with correct aria-label when not starred', () => {
            render(<StarButton isStarred={false} onStarRepository={jest.fn()} />);

            const button = screen.getByRole('button');
            expect(button).toHaveAttribute('aria-label', 'Star repository');
        });

        it('renders with correct aria-label when starred', () => {
            render(<StarButton isStarred={true} onStarRepository={jest.fn()} />);

            const button = screen.getByRole('button');
            expect(button).toHaveAttribute('aria-label', 'Unstar repository');
        });

        it('has correct type attribute', () => {
            render(<StarButton isStarred={false} onStarRepository={jest.fn()} />);

            const button = screen.getByRole('button');
            expect(button).toHaveAttribute('type', 'button');
        });
    });

    describe('Styling', () => {
        it('applies starred styles when isStarred is true', () => {
            render(<StarButton isStarred={true} onStarRepository={jest.fn()} />);

            const button = screen.getByRole('button');
            const icon = screen.getByTestId('star-icon');

            expect(button).toHaveClass('text-yellow-500');
            expect(icon).toHaveClass('fill-current');
        });

        it('applies unstarred styles when isStarred is false', () => {
            render(<StarButton isStarred={false} onStarRepository={jest.fn()} />);

            const button = screen.getByRole('button');
            const icon = screen.getByTestId('star-icon');

            expect(button).toHaveClass('text-gray-400');
            expect(icon).not.toHaveClass('fill-current');
        });
    });

    describe('Interactions', () => {
        it('calls onStarRepository when clicked', () => {
            const mockOnToggle = jest.fn();
            render(<StarButton isStarred={false} onStarRepository={mockOnToggle} />);

            const button = screen.getByRole('button');
            fireEvent.click(button);

            expect(mockOnToggle).toHaveBeenCalledTimes(1);
        });
    });
});
