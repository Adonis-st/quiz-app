"use client";

import { useState } from "react";
import { numberToLetter } from "~/utils";
import { ErrorIcon, SuccessIcon } from "./ui/icons";
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

  const userTotal = (answers: number[]) => {
    return answers.reduce((acc, current) => acc + current, 0);
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
          <h3 className="text-[40px] font-light text-dark_navy">
            Quiz completed <span className="font-medium">You Scored...</span>
          </h3>

          <div className="mt-10 rounded-xl bg-white p-8  text-center shadow-[0px_16px_40px_0px_rgba(143,_160,_193,_.14)]">
            <div className="flex items-center justify-center">
              <div
                className=" flex h-10 w-10 items-center justify-center rounded-md bg-opacity-90 "
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
              <h4 className="ml-4 text-[18px] font-medium text-dark_navy">
                {quiz.name}
              </h4>
            </div>

            <div className="text-[88px] font-medium text-dark_navy">
              {userTotal(userAnswers)}
            </div>

            <div className="text-[18px] text-grey_navy ">
              out of {questions?.length}
            </div>
          </div>

          {
            <button
              onClick={handlePlayAgain}
              className="mt-3 h-14 w-full rounded-xl bg-purple text-white  shadow-[0px_16px_40px_0px_rgba(143,_160,_193,_.14)]"
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
          <p className="mt-3 text-[14px] italic text-grey_navy">
            {questions?.[currentQuestion - 1]?.name}
          </p>
          <div className="mt-6 h-4 w-full rounded-full bg-slate-100 p-1">
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
                  <span className="text-left text-[18px] font-medium text-dark_navy">
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
              className="mt-3 h-14 w-full rounded-xl bg-purple text-white  shadow-[0px_16px_40px_0px_rgba(143,_160,_193,_.14)]"
            >
              {answerSelected ? "Next Question" : "Submit Answer"}
            </button>

            <div className="mt-2 text-center text-[18px] text-error">
              {isAnswerSelectedError && "Please select an answer"}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
