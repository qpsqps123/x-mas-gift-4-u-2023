import { useCallback } from "react";
import { useSelector } from "react-redux";

/**
 * 사용자가 정답 확인 절차를 올바르게 거쳤는지 확인하는 함수를 반환하는 커스텀 훅.
 * @returns {object} 함수가 든 객체를 반환.
 */
const useValidateProperAccess = () => {
  const questionPassed = useSelector((state) => state.question.questionPassed);

  /**
   * 올바른 정답 확인 절차를 거쳐서 현재 질문까지 왔는지 확인합니다.
   * @param {number} currentQuestionNum 본인 확인 절차 질문을 포함해, 현재까지 거친 질문의 개수를 넣어주세요.
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
