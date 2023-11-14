import { Nav } from "~/app/_components/nav";
import { Questions } from "~/app/_components/questions";
import { api } from "~/trpc/server";

export default async function QuizPage({
  params,
}: {
  params: { token: string };
}) {
  const quiz = await api.quiz.getQuiz.query(params.token);

  const quizData = {name: quiz?.name, iconColor: quiz?.iconColor, iconUrl: quiz?.iconUrl}

  return (
    <main className="px-6">
      <Nav quizData={quizData} />

      <Questions questions={quiz?.questions} quiz={quizData} />
    </main>
  );
}
