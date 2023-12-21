import React from "react";
import classes from "./PageTransition.module.scss";

const PageTransition = () => {
  return (
    <React.Fragment>
      <div className={classes.pageTransitionBackground}></div>
      <div className={classes.pageTransitionForeground}></div>
    </React.Fragment>
  );
};

export default PageTransition;
