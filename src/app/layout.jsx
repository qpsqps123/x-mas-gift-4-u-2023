import "../styles/globals.scss";
import classes from "../containers/RootLayout/RootLayout.module.scss";
import { Noto_Sans_KR } from "next/font/google";
import StoreProvider from "@/lib/redux/StoreProvider";
import PageTransition from "@/components/PageTransition/PageTransition";
import Link from "next/link";
import Image from "next/image";

const notoSansKr = Noto_Sans_KR({
  subsets: [],
  fallback: ["sans-serif"],
  variable: "--noto-sans-kr",
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
            <Link href={"/"}>
              <Image
                src="/images/icons/test.png"
                alt="test"
                className={classes.homeImg}
                width={100}
                height={100}
              />
            </Link>
            <div className={classes.mainContainer}>
              <div className={classes.main}>{children}</div>
            </div>
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
