import classes from "./InvalidAnswerDescription.module.scss";

const InvalidAnswerDescription = () => {
  return (
    <div className={classes.container}>
      <p className={classes.text}>입력하신 값이 올바르지 않습니다!</p>
    </div>
  );
};

export default InvalidAnswerDescription;
