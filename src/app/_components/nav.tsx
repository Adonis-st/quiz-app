"use client";

import Link from "next/link";
import { NoonIcon, SunnyIcon } from "./ui";

interface Props {
  quizData?: {
    name: string | undefined;
    iconColor: string | null | undefined;
    iconUrl: string | null | undefined;
  }
}

export const Nav = ({ quizData }: Props) => {
  return (
    <nav className="flex justify-between py-4">
      {quizData ? (
        <div className="flex items-center justify-center">
          <Link
            href={"/"}
            className=" flex h-10 w-10 items-center justify-center rounded-md bg-opacity-90"
            style={{
              backgroundColor: quizData?.iconColor
                ? quizData.iconColor
                : "transparent",
            }}
          >
            {quizData?.iconUrl && (
              <img
                src={quizData.iconUrl}
                alt={quizData.name}
                className="h-7 w-7 shrink-0 grow-0 "
              />
            )}
          </Link>
          <h1 className="text-dark_navy ml-4 text-[18px] font-medium">
            {quizData.name}
          </h1>
        </div>
      ) : null}

      <div className="flex items-center justify-end">
        <SunnyIcon />
        <button className="bg-purple mx-2 flex h-5 w-8 items-center rounded-full p-1">
          <div className="h-3 w-3 rounded-full bg-white" />
        </button>
        <NoonIcon />
      </div>
    </nav>
  );
};
