import { Nav } from "./_components/nav";
import { QuizList } from "./_components/quiz-list";
import { Suspense } from "react";
import { LoadingUi } from "./_components/ui/icons/list-loading-ui";

export default function HomePage() {
  return (
    <>
      <Nav />

      <div className="xl:w-[1160px] xl:flex xl:justify-between xl:mt-[85px] xl:mx-auto">
        <div className="mb-10 mt-8 md:my-16 xl:my-0">
          <h1 className="text-[40px] font-light leading-[100%] text-dark_navy md:text-[64px] dark:text-white">
            Welcome to the
            <span className="block font-medium">Frontend Quiz!</span>
          </h1>
          <div className="mt-4 text-[14px] italic text-grey_navy md:text-[20px] xl:mt-12 dark:text-light_bluish ">
            Pick a subject to get started.
          </div>
        </div>

        <Suspense fallback={<LoadingUi />}>
          <QuizList />
        </Suspense>
      </div>
    </>
  );
}
