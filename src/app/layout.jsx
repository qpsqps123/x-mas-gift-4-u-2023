import "../styles/globals.scss";
import classes from "../containers/RootLayout/RootLayout.module.scss";
import { Noto_Sans_KR, Mountains_of_Christmas } from "next/font/google";
import StoreProvider from "@/lib/redux/StoreProvider";
import PageTransition from "@/components/PageTransition/PageTransition";

const notoSansKr = Noto_Sans_KR({
  subsets: [],
  fallback: ["sans-serif"],
  variable: "--noto-sans-kr",
});

const mountainsOfChristmas = Mountains_of_Christmas({
  weight: ["400"],
  subsets: ["latin"],
  fallback: ["serif"],
  variable: "--mountains-of-christmas",
});

export const metadata = {
  title: "X-Mas Gift 4 U 2023",
  description: "Answer to questions and GET a gift!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko-KR">
      <body className={notoSansKr.className}>
        <StoreProvider>
          <main className={classes.mainWrapper}>
            <h1 className="a11yHidden">X-Mas Gift 4 U</h1>
            <PageTransition />
            <a
              href="/"
              className={`${mountainsOfChristmas.className} ${classes.homeLink}`}
            >
              X-Mas Gift 4 U.
            </a>
            <div className={classes.mainContainer}>
              <div className={classes.main}>{children}</div>
            </div>
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
