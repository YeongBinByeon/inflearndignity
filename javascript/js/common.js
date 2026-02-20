/**
 * 이 함수는 제품 가격에 대한 부가세를 계산해서 반환하는 함수입니다.
 * @param {*} productAmount 제품가격을 숫자형 전달
 * @returns 부가세가 숫자형
 */
function taxAmount(productAmount) {
  // 부가세 10% 가정
  const tax = 0.1;
  return productAmount * tax;
}

function getTop5() {
  return [];
}
