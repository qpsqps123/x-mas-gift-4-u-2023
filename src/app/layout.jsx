import "../styles/globals.scss";
import { Noto_Sans_KR } from "next/font/google";
import StoreProvider from "./lib/storeProvider";

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
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
