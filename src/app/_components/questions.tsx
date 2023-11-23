"use client";

import { useState } from "react";
import { numberToLetter } from "~/utils";
import { ErrorIcon, SuccessIcon } from "./ui/icons";
import type { Option } from "~/types";
import { Button } from "./ui";

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

export const Questions = ({ questions, quiz }: Props) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [seletedOption, setSeletedOption] = useState<Option | null>(null);
  const [isAnswerSelectedError, setIsAnswerSelectedError] = useState(false);
  const [answerSelected, setAnswerSelected] = useState<
    "" | "wrong" | "correct"
  >("");
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isQuizDone, setIsQuizDone] = useState(false);

  const handleSelectOption = (option: {
    id: number;
    name: string;
    questionId: number;
  }) => {
    setSeletedOption(option);
    setIsAnswerSelectedError(false);
  };

  const userTotal = (answers: number[]) => {
    return answers.reduce((acc, current) => acc + current, 0);
  };

  const handleDisplayIcons = (option: Option) => {
    if (
      answerSelected &&
      option.name === questions?.[currentQuestion - 1]?.correctOption
    ) {
      return <SuccessIcon className="h-10 w-10" />;
    }
    if (seletedOption?.id === option.id && answerSelected === "wrong") {
      return <ErrorIcon className="h-10 w-10" />;
    }
  };

  const handleOptionsStates = (optionsId: number, type: "border" | "label") => {
    if (seletedOption?.id === optionsId && answerSelected === "correct") {
      return type === "border" ? "border-success" : "bg-success text-white";
    }
    if (seletedOption?.id === optionsId && answerSelected === "wrong") {
      return type === "border" ? "border-error" : "bg-error text-white";
    }

    if (seletedOption?.id === optionsId) {
      return type === "border" ? "border-purple" : "bg-purple text-white";
    }
    return type === "border"
      ? "border-transparent"
      : "bg-ligh_grey text-grey_navy xl:group-hover:bg-[#F6E7FF] xl:group-hover:text-purple";
  };

  const handleSubmit = () => {
    if (!seletedOption) {
      return setIsAnswerSelectedError(true);
    }
    if (
      seletedOption?.name !== questions?.[currentQuestion - 1]?.correctOption
    ) {
      setUserAnswers((prevState) => [...prevState, 0]);
      return setAnswerSelected("wrong");
    }

    setUserAnswers((prevState) => [...prevState, 1]);
    return setAnswerSelected("correct");
  };

  const handleNextQuestion = () => {
    setSeletedOption(null);
    setIsAnswerSelectedError(false);
    setAnswerSelected("");

    if (currentQuestion === questions?.length) {
      setIsQuizDone(true);
    } else {
      setCurrentQuestion((prevState) => (prevState += 1));
    }
  };

  const handlePlayAgain = () => {
    setIsQuizDone(false);
    setCurrentQuestion(1);
  };

  return (
    <div className="mt-6 xl:mx-auto xl:mt-[85px] xl:flex xl:w-[1160px] xl:justify-between">
      {isQuizDone && (
        <>
          <h3 className="text-[40px] font-light text-dark_navy md:text-[64px]">
            Quiz completed{" "}
            <span className="font-medium md:block">You Scored...</span>
          </h3>

          <div>
            <div className="mt-10 rounded-xl bg-white p-8 text-center shadow-[0px_16px_40px_0px_rgba(143,_160,_193,_.14)] md:mt-16 md:h-[388px] md:rounded-3xl md:p-12 xl:w-[564px]">
              <div className="flex items-center justify-center">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-md bg-opacity-90 md:h-14 md:w-14 "
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
                <h4 className="ml-4 text-[18px] font-medium text-dark_navy md:ml-6 md:text-[28px] ">
                  {quiz.name}
                </h4>
              </div>

              <div className="text-[88px] font-medium text-dark_navy md:text-[144px]">
                {userTotal(userAnswers)}
              </div>

              <div className="text-[18px] text-grey_navy md:text-[24px]">
                out of {questions?.length}
              </div>
            </div>

            {
              <Button onClick={handlePlayAgain} className="mt-3 md:mt-8">
                Play Again
              </Button>
            }
          </div>
        </>
      )}
      {!isQuizDone && (
        <>
          <div className="xl:flex xl:h-[452px] xl:w-[465px] xl:flex-col">
            <h2 className="text-[14px] italic text-grey_navy md:text-[20px] dark:text-light_bluish">
              Question {currentQuestion} of {questions?.length}
            </h2>

            <p className="mt-3 text-[20px] font-medium text-dark_navy md:text-[36px] xl:mt-4 dark:text-white">
              {questions?.[currentQuestion - 1]?.name}
            </p>

            <div className="mt-6 h-4 w-full rounded-full bg-white p-1 md:mt-10 xl:mt-auto dark:bg-navy">
              <div
                className="h-2 rounded-full bg-purple"
                style={{
                  width: `${
                    (currentQuestion /
                      (questions?.length ? questions.length : 1)) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>

          <div className="mt-10 md:mt-16">
            {questions?.[currentQuestion - 1]?.options?.map((option, index) => {
              return (
                <button
                  key={option.id}
                  disabled={answerSelected ? true : false}
                  onClick={() => handleSelectOption(option)}
                  className={`${handleOptionsStates(
                    option.id,
                    "border",
                  )} group mt-3 flex w-full items-center rounded-xl border-[3px] bg-white p-3 shadow-[0px_16px_40px_0px_rgba(143,_160,_193,_.14)] first:mt-0 md:mt-6 md:h-[80px] md:rounded-3xl xl:h-24 xl:w-[564px] dark:bg-navy`}
                >
                  <div
                    className={`${handleOptionsStates(
                      option.id,
                      "label",
                    )} mr-4 flex h-10 w-10 shrink-0 grow-0 items-center justify-center rounded-[10px] font-medium md:mr-8 md:h-14 md:w-14 md:rounded-xl md:text-[28px]`}
                  >
                    {numberToLetter(index)}
                  </div>
                  <span className="text-left text-[18px] font-medium text-dark_navy md:text-[28px] dark:text-white">
                    {option.name}
                  </span>
                  <div className="ml-auto">{handleDisplayIcons(option)}</div>
                </button>
              );
            })}
            <Button
              onClick={
                answerSelected
                  ? () => handleNextQuestion()
                  : () => handleSubmit()
              }
              className="mt-3 md:mt-8"
            >
              {answerSelected ? "Next Question" : "Submit Answer"}
            </Button>

            {isAnswerSelectedError && (
              <div className="mt-2 flex items-center justify-center md:mt-8">
                <ErrorIcon className="mr-1 md:h-10 md:w-10" />
                <div className=" text-center text-[18px] text-error md:text-[24px]">
                  Please select an answer
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
