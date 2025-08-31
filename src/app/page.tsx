
import { Title, RepoCardListContainer } from '@/app/components';

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="mx-auto max-w-7xl">
        <Title />
        <RepoCardListContainer />
      </main>
    </div>
  );
}
