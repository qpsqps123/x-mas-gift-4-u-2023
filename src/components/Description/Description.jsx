import React from "react";
import classes from "./Description.module.scss";

const Description = ({ text }) => {
  return <div className={classes.textContainer}>{text}</div>;
};

export default Description;
