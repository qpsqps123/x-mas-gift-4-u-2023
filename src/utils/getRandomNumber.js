/**
 * 무작위 숫자를 반환합니다.
 * @param {number} 무작위 숫자의 범위를 설정합니다. 값을 15로 설정하면 0~14 사이의 정수가 무작위하게 반환됩니다.
 * @returns {number}
 */
export const getRandomNumber = (max) => {
  const randomNumber = Math.floor(Math.random() * max);
  return randomNumber;
};
