export const LoadingUi = () => {
  const placeHolder = [1, 2, 3, 4];
  return (
    <div>
      {placeHolder.map((_, index) => {
        return (
          <div
            key={index}
            className="mt-3 flex items-center rounded-xl bg-white p-3 shadow-[0px_16px_40px_0px_rgba(143,_160,_193,_.14)] first:mt-0 md:mt-6 md:h-20 md:rounded-3xl xl:h-24 xl:w-[564px] xl:p-5 dark:bg-navy"
          >
            <div className="mr-6 flex h-10 w-10 animate-pulse items-center justify-center rounded-md bg-slate-200 bg-opacity-90 md:mr-8 md:h-14 md:w-14 md:rounded-xl" />
            <div className="h-2 w-48 animate-pulse rounded bg-slate-200 md:h-3 md:w-64" />
          </div>
        );
      })}
    </div>
  );
};
