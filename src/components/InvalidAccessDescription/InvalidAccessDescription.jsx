import React from "react";
import classes from "./InvalidAccessDescription.module.scss";
import Link from "next/link";

const InvalidAccessDescription = () => {
  return (
    <React.Fragment>
      <p className={classes.invalidAccess}>잘못된 접근입니다!</p>
      <Link href="/">처음으로 돌아가기</Link>
    </React.Fragment>
  );
};

export default InvalidAccessDescription;
