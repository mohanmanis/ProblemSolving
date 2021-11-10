/* 
Given a string A, we may represent it as a binary tree by partitioning it to two non-empty substrings recursively.

Below is one possible representation of A = “great”:

Below is one possible representation of A = “great”:


    great
   /    \
  gr    eat
 / \    /  \
g   r  e   at
           / \
          a   t

To scramble the string, we may choose any non-leaf node and swap its two children.

For example, if we choose the node “gr” and swap its two children, it produces a scrambled string “rgeat”.

    rgeat
   /    \
  rg    eat
 / \    /  \
r   g  e   at
           / \
          a   t
We say that “rgeat” is a scrambled string of “great”.

Similarly, if we continue to swap the children of nodes “eat” and “at”, it produces a scrambled string “rgtae”.

    rgtae
   /    \
  rg    tae
 / \    /  \
r   g  ta  e
       / \
      t   a
We say that “rgtae” is a scrambled string of “great”.



Given two strings A and B of the same length, determine if B is a scrambled string of S.



Input Format:

The first argument of input contains a string A.
The second argument of input contains a string B.
Output Format:

Return an integer, 0 or 1:
    => 0 : False
    => 1 : True
Constraints:

1 <= len(A), len(B) <= 50
Examples:

Input 1:
    A = "we"
    B = "we"

Output 1:
    1

Input 2:
    A = "phqtrnilf"
    B = "ilthnqrpf"

Output 2:
    0

*/

var isScramble = (s1, s2, memo = {}) => {
 const key = `${s1}_${s2}`;
 if (memo[key] != undefined) {
  return memo[key];
 }
 if (s1 === s2) return 1;
 if (s1.length == 0) return 1;
 if (s1.length != s2.length) {
  return 0;
 }
 let result = 0;
 const n = s1.length;
 for (let k = 1; k < n; k++) {
  let isScrambledOnSwapping = isScramble(s1.substr(0, k), s2.substr(n - k, k), memo) &&
   isScramble(s1.substr(k, n - k), s2.substr(0, n - k), memo)
  let isScrambledWithoutSwapping = isScramble(s1.substr(0, k), s2.substr(0, k), memo) &&
   isScramble(s1.substr(k, n - k), s2.substr(k, n - k), memo)
  if (!!isScrambledOnSwapping || !!isScrambledWithoutSwapping) {
   result = 1;
   break;
  }
 }
 memo[key] = result
 return result;
};

const str1 = "we";
const str2 = "we";
const str3 = "phqtrnilf";
const str4 = "ilthnqrpf";
const str5 = "great";
const str6 = "rgtae";
console.log(`Are ${str1} and ${str2} are scrambled string :: ${isScramble(str1, str2)}`);
console.log(`Are ${str3} and ${str4} are scrambled string :: ${isScramble(str3, str4)}`);
console.log(`Are ${str5} and ${str6} are scrambled string :: ${isScramble(str5, str6)}`);