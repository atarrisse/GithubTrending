import { useDateRange } from '@/app/hooks';
import { formatDate } from '@/app/utils/dateUtils';

const Title = () => {
  const { begin, end } = useDateRange();
  
  return (
    <h1 className="text-4xl font-bold mb-8">
      Trending Repos from {formatDate(begin)} to {formatDate(end)}
    </h1>
  );
}

export default Title;