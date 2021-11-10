/* 
You are given k identical eggs and you have access to a building with n floors labeled from 1 to n.

You know that there exists a floor f where 0 <= f <= n such that any egg dropped at a floor higher than f will break, and any egg dropped at or below floor f will not break.

Each move, you may take an unbroken egg and drop it from any floor x (where 1 <= x <= n). If the egg breaks, you can no longer use it. However, if the egg does not break, you may reuse it in future moves.

Return the minimum number of moves that you need to determine with certainty what the value of f is.

Input: k = 1, n = 2
Output: 2
Explanation:
Drop the egg from floor 1. If it breaks, we know that f = 0.
Otherwise, drop the egg from floor 2. If it breaks, we know that f = 1.
If it does not break, then we know f = 2.
Hence, we need at minimum 2 moves to determine with certainty what the value of f is.
*/

const eggBreak = (K, N, memo) => {
  if (!memo) {
    memo = Array(K + 1).fill(null).map(() => Array(N + 1).fill(-1))
  }
  if (N <= 1) return 1;
  if (K === 1) return N;
  if (memo[K][N] > 0) return memo[K][N];
  let res = Number.MAX_VALUE;
  for (let i = 1; i <= N; i++) {
    let breakMove = memo[K - 1][i - 1] !== -1 ? memo[K - 1][i - 1] : eggBreak(K - 1, i - 1, memo);
    let safeMove = memo[K][N - i] !== -1 ? memo[K][N - i] : eggBreak(K, N - i, memo);
    res = Math.min(res, Math.max(breakMove, safeMove) + 1);
  }
  memo[K][N] = res;
  return res;

}

//time complexity O(Kn^2)

const eggBreakBinarySearch = (K, N) => {
  const dp = Array.from({ length: K + 1 }, () => Array.from(Array(N + 1), (x, i) => i));
  dp[0] = Array(N + 1).fill(0);

  for (let egg = 2; egg <= K; egg++) {
    for (let flr = 2; flr <= N; flr++) {
      let low = 1, high = flr, result = flr;
      let breakMove, safeMove, mid;

      while (low < high) {
        mid = low + Math.floor((high - low) / 2)
        breakMove = dp[egg - 1][mid - 1]; // egg break
        safeMove = dp[egg][flr - mid]; // egg doesn't break
        result = Math.min(result, 1 + Math.max(breakMove, safeMove));

        if (breakMove === safeMove) break;
        else if (breakMove < safeMove) low = mid + 1;
        else high = mid;
      }
      dp[egg][flr] = result;
    }
  }
  return dp[K][N];
};


const eggDropMostOptimized = (K, N)=>{
  let dp =  Array(N + 1).fill().map(_ => Array(K + 1).fill(0));
  let  m = 0;
  while (dp[m][K] < N) {
    m++;
    for (let k = 1; k <= K; k++) {
      dp[m][k] = dp[m - 1][k - 1] + dp[m - 1][k] + 1;
    }
  }
  return m;
}

//Binary Search Optimization[O(KN LogN)]

console.log(`The minimum number of moves required to find the egg drop is ${eggBreak(1, 2)}`);
console.log(`The minimum number of moves required to find the egg drop is ${eggBreakBinarySearch(1, 2)}`);
console.log(`The minimum number of moves required to find the egg drop is ${eggDropMostOptimized(1, 2)}`);