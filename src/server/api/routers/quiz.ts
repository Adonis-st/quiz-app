import { sql } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const quizRouter = createTRPCRouter({
  getQuizzes: publicProcedure.query(async ({ ctx }) => {
    // await new Promise((resolve) => setTimeout(resolve, 10000));

    const getQuizzes = ctx.db.query.quizzes
      .findMany({
        columns: { name: true, token: true, iconUrl: true, iconColor: true },
        limit: 4,
      })
      .prepare();

    return getQuizzes.execute();
  }),

  getQuiz: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const quiz = ctx.db.query.quizzes
      .findFirst({
        where: (quizzes, { eq }) => eq(quizzes.token, sql.placeholder("token")),
        columns: { name: true, token: true, iconUrl: true, iconColor: true },
        with: {
          questions: {
            with: {
              options: true,
            },
          },
        },
      })
      .prepare();

    return quiz.execute({ token: input });
  }),
});
