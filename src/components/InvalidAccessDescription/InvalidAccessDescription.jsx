import React from "react";
import classes from "./InvalidAccessDescription.module.scss";

const InvalidAccessDescription = () => {
  return (
    <React.Fragment>
      <div className={classes.invalidAccessContainer}>
        <p className={classes.invalidAccess}>잘못된 접근입니다!</p>
        <a href="/" className={classes.homeLink}>
          처음으로 돌아가기
        </a>
      </div>
    </React.Fragment>
  );
};

export default InvalidAccessDescription;
