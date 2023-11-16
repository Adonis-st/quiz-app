import { Nav } from "./_components/nav";
import { QuizList } from "./_components/quiz-list";
import { Suspense } from "react";
import { LoadingUi } from "./_components/ui/icons/list-loading-ui";

export default  function HomePage() {
  return (
    <main className="px-6">
      <Nav />

      <div className="mb-10 mt-8">
        <h1 className="text-dark_navy text-[40px] font-light leading-[50px]">
          Welcome to the
          <span className="block font-medium ">Frontend Quiz!</span>
        </h1>
        <div className="text-grey_navy mt-4 text-[14px] italic">
          Pick a subject to get started.
        </div>
      </div>

      <Suspense fallback={<LoadingUi />}>
        <QuizList />
      </Suspense>
    </main>
  );
}
