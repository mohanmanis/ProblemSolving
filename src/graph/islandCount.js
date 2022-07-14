const grid = [
  ["w", "L", "w", "w", "w"],
  ["w", "L", "w", "w", "w"],
  ["w", "w", "w", "L", "w"],
  ["w", "w", "L", "L", "w"],
  ["L", "w", "w", "L", "L"],
  ["L", "L", "w", "w", "w"]
];

const explore = (grid, r, c, visited) => {
  const pos = `${r}:${c}`;
  if (Math.min(r, c) < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] === "w" || visited.has(pos)) return false;
  visited.add(pos);
  explore(grid, r + 1, c, visited); //down
  explore(grid, r - 1, c, visited); //top
  explore(grid, r, c + 1, visited); //right
  explore(grid, r, c - 1, visited); //left
  return true;
}
const islandCount = (grid) => {
  const visited = new Set();
  let count = 0;
  for (let r = 0; r < grid.length; r++) {
     for (let c = 0; c < grid[0].length; c++) {
       if (explore(grid, r, c, visited)) {
         count += 1;
       };
     }
  }
  return count;
}

console.log(islandCount(grid));
