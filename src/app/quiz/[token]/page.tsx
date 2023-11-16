import { Nav } from "~/app/_components/nav";
import { Questions } from "~/app/_components/questions";
import { api } from "~/trpc/server";
import type { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: { token: string };
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const quiz = await api.quiz.getQuiz.query(params.token);
  return { title: quiz?.name };
}

export default async function QuizPage({ params }: Props) {
  const quiz = await api.quiz.getQuiz.query(params.token);

  const quizData = {
    name: quiz?.name,
    iconColor: quiz?.iconColor,
    iconUrl: quiz?.iconUrl,
  };

  return (
    <main className="px-6">
      <Nav quizData={quizData} />

      <Questions questions={quiz?.questions} quiz={quizData} />
    </main>
  );
}
