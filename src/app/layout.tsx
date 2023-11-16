import "~/styles/globals.css";
import { Rubik } from "next/font/google";
import { headers } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";

const rubik = Rubik({
  subsets: ["latin"],
});

export const metadata = {
  title: "Quiz App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={` ${rubik.className} bg-[url(/images/pattern-background-mobile-light.svg)] bg-ligh_grey dark:bg-[url(/images/pattern-background-mobile-dark.svg)] dark:bg-dark_navy`}>
        <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
