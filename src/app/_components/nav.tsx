import Link from "next/link";
import { NoonIcon, SunnyIcon } from "./ui/icons";
import { ThemeSwitcher } from "./theme-switcher";

interface Props {
  quizData?: {
    name: string | undefined;
    iconColor: string | null | undefined;
    iconUrl: string | null | undefined;
  };
}

export const Nav = ({ quizData }: Props) => {
  return (
    <nav className="flex justify-between py-4 md:py-6 xl:mx-auto xl:mt-[50px] xl:w-[1160px]">
      {quizData ? (
        <div className="flex items-center justify-center">
          <Link
            href={"/"}
            className="flex h-10 w-10 items-center justify-center rounded-md bg-opacity-90 md:h-14 md:w-14 md:rounded-xl"
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
                className="h-7 w-7 shrink-0 grow-0  md:h-10 md:w-10"
              />
            )}
          </Link>
          <h1 className="ml-4 text-[18px] font-medium text-dark_navy md:text-[28px] dark:text-white">
            {quizData.name}
          </h1>
        </div>
      ) : null}

      <div className="ml-auto flex h-10 items-center justify-end">
        <SunnyIcon className="fill-[#626C7F] dark:fill-white md:h-6 md:w-6" />
        <ThemeSwitcher />
        <NoonIcon className="fill-[#626C7F] dark:fill-white md:h-6 md:w-6" />
      </div>
    </nav>
  );
};
