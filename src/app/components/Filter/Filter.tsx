import React from 'react';
import { LANGUAGES, type Language } from '@/app/constants';

interface FilterProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const Filter: React.FC<FilterProps> = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
      <label htmlFor="language-filter" className="text-sm font-medium text-gray-700">
        Filter by language:
      </label>
      <select
        id="language-filter"
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className="px-3 py-2 border border-gray-300 grow rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer"
      >
        {LANGUAGES.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
