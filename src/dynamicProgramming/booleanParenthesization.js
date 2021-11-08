/* 
Boolean Parenthesization Problem
Given a boolean expression with following symbols.
Symbols
    'T' ---> true
    'F' ---> false
Operators
    &   ---> boolean AND
    |   ---> boolean OR
    ^   ---> boolean XOR

Count the number of ways we can parenthesize the expression so that the value of expression evaluates to true.
Let the input be in form of two arrays one contains the symbols (T and F) in order and the other contains operators (&, | and ^}
*/

const countParenthesization = (s, i = 0, j = s.length - 1, isTrue = true, memo = {}) => {
  const key = `${i}:${j}:${isTrue}`;
  if (memo[key] != undefined) {
    return memo[key];
  }
  if (i > j) return 0;
  if (i === j) {
    if (isTrue) {
      return s[i] == "T" ? 1 : 0;
    } else {
      return s[i] == "F" ? 1 : 0;
    }
  }
  let count = 0;
  for (let k = i + 1; k <= j - 1; k = k + 2) {
    let lt = countParenthesization(s, i, k - 1, true, memo);
    let lf = countParenthesization(s, i, k - 1, false, memo);
    let rt = countParenthesization(s, k + 1, j, true, memo);
    let rf = countParenthesization(s, k + 1, j, false, memo);
    if (s[k] === "&") {
      if (isTrue) {
        count = count + (lt * rt);
      } else {
        count = count + (lf * rt) + (lt * rf) + (lf * rf);
      }
    } else if (s[k] === "^") {
      if (isTrue) {
        count = count + (lt * rf) + (lf * rt);
      } else {
        count = count + (lf * rf) + (rt * lt);
      }
    } else if (s[k] === "|") {
      if (isTrue) {
        count = count + (lt * rt) + (lf * rt) + (lt * rf);
      } else {
        count = count + (lf * rf);
      }
    }
  }
  return memo[key] = count;
}



const str = "T|T&F^T";
console.log(`Number of ways to return true is  ${countParenthesization(str)}`);