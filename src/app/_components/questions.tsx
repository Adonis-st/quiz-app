"use client";

import { useState } from "react";
import { numberToLetter } from "~/utils";
import { ErrorIcon, SuccessIcon } from "./ui";
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

  const handleDisplayIcons = (option: Option) => {
    if (
      answerSelected &&
      option.name === questions?.[currentQuestion - 1]?.correctOption
    ) {
      return <SuccessIcon />;
    }
    if (seletedOption?.id === option.id && answerSelected === "wrong") {
      return <ErrorIcon />;
    }
  };

  const userTotal = (answers: number[]) =>
    answers.reduce((acc, current) => acc + current, 0);

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
      : "bg-ligh_grey text-grey_navy";
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
    <div>
      {isQuizDone && (
        <>
          <h3 className="text-dark_navy text-[40px] font-light">
            Quiz completed <span className="font-medium">You Scored...</span>
          </h3>

          <div className="bg-white p-8  text-center shadow-[0px_16px_40px_0px_rgba(143,_160,_193,_.14)]">
            <div className="flex items-center justify-center">
              <div
                className=" flex h-10 w-10 items-center justify-center rounded-md bg-opacity-90"
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
              <h4 className="text-dark_navy ml-4 text-[18px] font-medium">
                {quiz.name}
              </h4>
            </div>

            <div className="text-dark_navy text-[88px] font-medium">
              {userTotal(userAnswers)}
            </div>

            <div className="text-grey_navy text-[18px] ">
              out of {questions?.length}
            </div>
          </div>

          {
            <button
              onClick={handlePlayAgain}
              className="bg-purple mt-3 h-14 w-full rounded-xl text-white  shadow-[0px_16px_40px_0px_rgba(143,_160,_193,_.14)]"
            >
              Play Again
            </button>
          }
        </>
      )}
      {!isQuizDone && (
        <>
          <h3 className="text-gray_navy text-[14px] italic">
            Question {currentQuestion} of {questions?.length}
          </h3>
          <p className="text-grey_navy mt-3 text-[14px] italic">
            {questions?.[currentQuestion - 1]?.name}
          </p>
          <div className="mt-6 h-4 w-full rounded-full bg-slate-100 p-1">
            <div
              className="bg-purple h-2 rounded-full"
              style={{
                width: `${
                  (currentQuestion /
                    (questions?.length ? questions.length : 1)) *
                  100
                }%`,
              }}
            />
          </div>
          <div className="mt-10">
            {questions?.[currentQuestion - 1]?.options?.map((option, index) => {
              return (
                <button
                  key={option.id}
                  disabled={answerSelected ? true : false}
                  onClick={() => handleSelectOption(option)}
                  className={`${handleOptionsStates(
                    option.id,
                    "border",
                  )}  mt-3 flex w-full items-center rounded-xl border-[3px] bg-white p-3 shadow-[0px_16px_40px_0px_rgba(143,_160,_193,_.14)] first:mt-0`}
                >
                  <div
                    className={`${handleOptionsStates(
                      option.id,
                      "label",
                    )} mr-4 flex h-10 w-10 shrink-0 grow-0  items-center justify-center rounded-[10px]`}
                  >
                    {numberToLetter(index)}
                  </div>
                  <span className="text-dark_navy text-left text-[18px] font-medium">
                    {option.name}
                  </span>
                  <div className="ml-auto">{handleDisplayIcons(option)}</div>
                </button>
              );
            })}
            <button
              onClick={
                answerSelected
                  ? () => handleNextQuestion()
                  : () => handleSubmit()
              }
              className="bg-purple mt-3 h-14 w-full rounded-xl text-white  shadow-[0px_16px_40px_0px_rgba(143,_160,_193,_.14)]"
            >
              {answerSelected ? "Next Question" : "Submit Answer"}
            </button>

            <div className="text-error mt-2 text-center text-[18px]">
              {isAnswerSelectedError && "Please select an answer"}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
