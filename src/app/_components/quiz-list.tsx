import Link from "next/link";
import { api } from "~/trpc/server";

export const QuizList = async () => {
  const quizzes = await api.quiz.getQuizzes.query();

  return (
    <div>
      {quizzes.map((quiz) => {
        return (
          <Link
            key={quiz.token}
            href={`/quiz/${quiz.token}`}
            className="mt-3 flex items-center rounded-xl bg-white p-3 shadow-[0px_16px_40px_0px_rgba(143,_160,_193,_.14)] first:mt-0 md:mt-6 md:h-20 md:rounded-3xl xl:h-24 xl:w-[564px] xl:p-5 dark:bg-navy"
          >
            <div
              className="mr-4 flex h-10 w-10 items-center justify-center rounded-md bg-opacity-90 md:mr-8 md:h-14 md:w-14 md:rounded-xl"
              style={{
                backgroundColor: quiz?.iconColor
                  ? quiz.iconColor
                  : "transparent",
              }}
            >
              {quiz?.iconUrl && (
                <img
                  src={quiz.iconUrl}
                  alt={quiz.name}
                  className="h-7 w-7 shrink-0 grow-0 md:h-10 md:w-10"
                />
              )}
            </div>
            <span className="text-[18px] font-medium text-dark_navy md:text-[28px] dark:text-white">
              {quiz.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};
