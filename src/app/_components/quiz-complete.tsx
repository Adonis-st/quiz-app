import type { Option } from "~/types";

interface Props {
  quiz: {
    name: string | undefined;
    iconColor: string | null | undefined;
    iconUrl: string | null | undefined;
  };
  questions:
    | {
        id: number;
        name: string;
        token: string;
        createdAt: Date;
        updatedAt: Date | null;
        quizId: number;
        correctOption: string;
        options: Option[];
      }[]
    | undefined;
}

export const QuizComplete = ({ quiz, questions }: Props) => {
  const userTotal = (answers: number[]) => {
    return answers.reduce((acc, current) => acc + current, 0);
  };
  return (
    <>
      <h3 className="text-[40px] font-light text-dark_navy">
        Quiz completed <span className="font-medium">You Scored...</span>
      </h3>

      <div className="mt-10 rounded-xl bg-white p-8  text-center shadow-[0px_16px_40px_0px_rgba(143,_160,_193,_.14)]">
        <div className="flex items-center justify-center">
          <div
            className=" flex h-10 w-10 items-center justify-center rounded-md bg-opacity-90 "
            style={{
              backgroundColor: quiz?.iconColor ? quiz.iconColor : "transparent",
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
          <h4 className="ml-4 text-[18px] font-medium text-dark_navy">
            {quiz.name}
          </h4>
        </div>

        
      </div>
    </>
  );
};
