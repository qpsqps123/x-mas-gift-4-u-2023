"use client";
import React from "react";
import classes from "./PageTransition.module.scss";
import { Mountains_of_Christmas } from "next/font/google";
import { usePathname } from "next/navigation";

const mountainsOfChristmas = Mountains_of_Christmas({
  weight: ["400"],
  subsets: ["latin"],
  fallback: ["serif"],
  variable: "--mountains-of-christmas",
});

const PageTransition = () => {
  const pathname = usePathname();

  return (
    <React.Fragment>
      <div id="backCurtain" className={classes.backCurtain}></div>
      <div id="midCurtain" className={classes.midCurtain}></div>
      <div id="frontCurtain" className={classes.frontCurtain}></div>
      {pathname === "/" && (
        <div id="homePageCurtain" className={classes.homePageCurtain}>
          <p
            className={`${mountainsOfChristmas.className} ${classes.homePageTitle}`}
          >
            X-Mas Gift 4 U.
          </p>
        </div>
      )}
    </React.Fragment>
  );
};

export default PageTransition;
