export const LoadingUi = () => {
  const placeHolder = [1, 2, 3, 4];
  return (
    <div>
      {placeHolder.map((_, index) => {
        return (
          <div
            key={index}
            className="mt-3 first:mt-0 flex items-center rounded-xl bg-white p-3 shadow-[0px_16px_40px_0px_rgba(143,_160,_193,_.14)]"
          >
            <div className="mr-6 flex h-10 w-10 animate-pulse items-center justify-center rounded-md bg-slate-200 bg-opacity-90" />
            <div className="h-2 w-48 animate-pulse rounded bg-slate-200" />
          </div>
        );
      })}
    </div>
  );
};
