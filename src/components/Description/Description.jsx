"use client";
import React from "react";
import classes from "./Description.module.scss";
import { usePathname } from "next/navigation";

const Description = ({ text }) => {
  const pathName = usePathname();
  return (
    <div
      className={`${classes.textContainer} ${
        pathName === "/question/mc/9" ? classes.smallFont : null
      }`}
    >
      {text}
    </div>
  );
};

export default Description;
