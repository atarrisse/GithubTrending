import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LANGUAGES } from '@/app/constants';
import filterMocks from '@/app/__mocks__/filterMocks.json';
import Filter from './Filter';

describe('Filter Component', () => {
  const mockOnLanguageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the filter component with label and select', () => {
    render(<Filter selectedLanguage="All" onLanguageChange={mockOnLanguageChange} />);
    
    expect(screen.getByText('Filter by language:')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Filter by language:' })).toBeInTheDocument();
  });

  it('displays all language options in the select', () => {
    render(<Filter selectedLanguage="All" onLanguageChange={mockOnLanguageChange} />);
    
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(LANGUAGES.length);
  });

  it('shows the correct selected language', () => {
    render(<Filter selectedLanguage="JavaScript" onLanguageChange={mockOnLanguageChange} />);
    
    const select = screen.getByRole('combobox', { name: 'Filter by language:' }) as HTMLSelectElement;
    expect(select.value).toBe('JavaScript');
  });

  it('calls onLanguageChange when a different language is selected', () => {
    render(<Filter selectedLanguage="All" onLanguageChange={mockOnLanguageChange} />);
    
    const select = screen.getByRole('combobox', { name: 'Filter by language:' });
    
    fireEvent.change(select, filterMocks.languageChangeEvents.javascript);
    
    expect(mockOnLanguageChange).toHaveBeenCalledWith('JavaScript');
    expect(mockOnLanguageChange).toHaveBeenCalledTimes(1);
  });
});
