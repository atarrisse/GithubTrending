import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

const mockOnClick = jest.fn();

describe('Button', () => {
    beforeEach(() => {
        mockOnClick.mockClear();
    });

    it('renders button with children', () => {
        render(
            <Button onClick={mockOnClick}>
                Test Button
            </Button>
        );

        expect(screen.getByText('Test Button')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        render(
            <Button onClick={mockOnClick}>
                Click me
            </Button>
        );

        fireEvent.click(screen.getByText('Click me'));
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('applies custom className', () => {
        render(
            <Button onClick={mockOnClick} className="custom-class">
                Custom Button
            </Button>
        );

        const button = screen.getByRole('button');
        expect(button).toHaveClass('custom-class');
    });
});
