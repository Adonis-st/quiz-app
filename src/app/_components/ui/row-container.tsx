import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

const rowStyles = cva(
  "shrink-0 grow-0",
  {
    variants: {
      intent: {
        primary: "h-14 w-full rounded-xl bg-purple text-[18px] text-white shadow-[0px_16px_40px_0px_rgba(143,_160,_193,_.14)] md:mt-8 md:h-[92px] md:rounded-3xl md:text-[28px] ",
        secondary:"",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  },
);
type ButtonProps = VariantProps<typeof rowStyles> & ComponentProps<"button" | "a">;

interface Props extends ButtonProps {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
}

export const Button = ({
  intent,
  children,
  className,
  isLoading = false,
  ...props
}: Props) => {
  return (
    <button
      disabled={isLoading}
      className={buttonStyles({ intent, className })}
      {...props}
    >
      {children}
    </button>
  );
};
