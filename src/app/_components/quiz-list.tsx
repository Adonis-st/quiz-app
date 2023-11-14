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
            className="mt-3 flex  items-center rounded-xl bg-white p-3 shadow-[0px_16px_40px_0px_rgba(143,_160,_193,_.14)] first:mt-0"
          >
            <div
              className="mr-4 flex h-10 w-10 items-center justify-center rounded-md bg-opacity-90"
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
                  className="h-7 w-7 shrink-0 grow-0 "
                />
              )}
            </div>
            <span className="text-dark_navy text-[18px] font-medium">
              {quiz.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};
