export const LANGUAGES = [
  'All',
  'Angular',
  'C#',
  'C++',
  'CSS',
  'Dart',
  'Go',
  'HTML',
  'Java',
  'JavaScript',
  'Kotlin',
  'PHP',
  'Python',
  'R',
  'React',
  'Ruby',
  'Rust',
  'Scala',
  'Shell',
  'Swift',
  'TypeScript',
  'Vue'
] as const;

export type Language = typeof LANGUAGES[number];
