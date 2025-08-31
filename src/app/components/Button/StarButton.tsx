import StarIcon from '@/app/assets/star-icon.svg';

export interface StarButtonProps {
  isStarred: boolean;
  onStarRepository: () => void;
}

const StarButton = ({ isStarred, onStarRepository }: StarButtonProps) => {
  return (
    <button
      onClick={onStarRepository}
      className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-gray-100 cursor-pointer ${
        isStarred ? 'text-yellow-500' : 'text-gray-400'
      }`}
      aria-label={isStarred ? 'Unstar repository' : 'Star repository'}
      type="button"
    >
      <StarIcon className={`w-5 h-5 ${isStarred ? 'fill-current' : ''}`} />
    </button>
  );
};

export default StarButton;
