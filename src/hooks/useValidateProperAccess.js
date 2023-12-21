import { useCallback } from "react";
import { useSelector } from "react-redux";

const useValidateProperAccess = () => {
  const questionPassed = useSelector((state) => state.question.questionPassed);

  /**
   * 올바른 정답 확인 절차를 거쳐서 현재 질문까지 왔는지 확인합니다.
   * @param {number} currentQuestionNum 현재 질문이 몇 번째 질문인지 기입해주세요.
   * @returns {boolean} 올바른 접속이라고 판단되면 true를, 그렇지 않으면 false를 반환합니다.
   */
  const validateProperAccess = useCallback(
    (currentQuestionNum) => {
      const result = questionPassed.slice(0, currentQuestionNum).every((el) => {
        if (el[1] === false) {
          return false;
        } else {
          return true;
        }
      });

      return result;
    },
    [questionPassed]
  );

  return {
    validateProperAccess,
  };
};

export default useValidateProperAccess;
