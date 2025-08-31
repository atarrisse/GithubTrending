import { renderHook, act } from '@testing-library/react';
import { useLanguageFilter } from './useLanguageFilter';
import { type Language } from '@/app/constants';

describe('useLanguageFilter', () => {
  it('should initialize with default language "All"', () => {
    const { result } = renderHook(() => useLanguageFilter());

    expect(result.current.selectedLanguage).toBe('All');
  });

  it('should update selectedLanguage when setSelectedLanguage is called', () => {
    const { result } = renderHook(() => useLanguageFilter());

    act(() => {
      result.current.setSelectedLanguage('TypeScript' as Language);
    });

    expect(result.current.selectedLanguage).toBe('TypeScript');
  });

  it('should update selectedLanguage with different languages', () => {
    const { result } = renderHook(() => useLanguageFilter());

    act(() => {
      result.current.setSelectedLanguage('Python' as Language);
    });

    expect(result.current.selectedLanguage).toBe('Python');
  });

  it('should return the expected interface', () => {
    const { result } = renderHook(() => useLanguageFilter());

    expect(result.current).toHaveProperty('selectedLanguage');
    expect(result.current).toHaveProperty('setSelectedLanguage');
    expect(typeof result.current.setSelectedLanguage).toBe('function');
  });
});
