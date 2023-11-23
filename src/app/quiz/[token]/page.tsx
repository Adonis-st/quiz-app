import { Nav } from "~/app/_components/nav";
import { Questions } from "~/app/_components/questions";
import { api } from "~/trpc/server";
import type { Metadata } from "next";

interface Props {
  params: { token: string };
}

export const dynamic = "force-dynamic";

const getQuiz = async (token: string) => {
  const quiz = await api.quiz.getQuiz.query(token);

  if (!quiz) {
    throw new Error("No data");
  }

  return quiz;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const quiz = await getQuiz(params.token);
  const iconUrl = quiz.iconUrl as unknown as string;
  return { title: quiz?.name, icons: [{ rel: "icon", url: iconUrl }] };
}

export default async function QuizPage({ params }: Props) {
  const quiz = await getQuiz(params.token);

  const quizData = {
    name: quiz?.name,
    iconColor: quiz?.iconColor,
    iconUrl: quiz?.iconUrl,
  };

  return (
    <>
      <Nav quizData={quizData} />
      <Questions questions={quiz?.questions} quiz={quizData} />
    </>
  );
}
