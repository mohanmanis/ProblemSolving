const grid = [
  ["w", "L", "w", "w", "L", "w"],
  ["L", "L", "w", "w", "L", "w"],
  ["w", "L", "w", "w", "w", "w"],
  ["w", "w", "w", "L", "L", "w"],
  ["w", "w", "w", "L", "L", "w"],
  ["w", "w", "w", "L", "w", "w"]
];


const minIsland = (grid) => {
  let rows = grid.length;
  let columns = grid[0].length;
  let visited = new Set();
  let min = Number.MAX_VALUE;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (grid[r][c] === "L") {
        const size = explore(grid, rows, columns, r, c, visited);
        if (size > 0) {
          min = Math.min(min, size);
        }
      }
    }
  }
  return min;
}

const explore = (grid, rows, columns, r, c, visited) => {
  const pos = `${r}:${c}`
  if (Math.min(r, c) < 0 || r >= rows || c >= columns || visited.has(pos)) return 0;
  visited.add(pos);
  let dr = 0, dc = 1, size = 1;
  for (i = 0; i < 3; i++) {
    size += explore(grid, rows, columns, r + dr, c + dc, visited);
    [dr, dc] = [dr, -dc];
  }
  return size
}

console.log(minIsland(grid));