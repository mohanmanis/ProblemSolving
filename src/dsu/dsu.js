/* 
https://jojozhuang.github.io/algorithm/algorithm-union-find/

*/


class UnionFind {
 constructor(size) {
  this.parent = Array(size).fill().map((_, i) => i);  // Initially, all elements are in their own set.
  this.rank = Array(size).fill(0);
  this.numComponents = size;
 }
 // Path Compression
 find(x) {
  if (this.parent[x] !== x) {
   this.parent[x] = this.find(this.parent[x]);
  }
  return this.parent[x];
 }
 // Union by rank
 union(x, y) {
  let xr = this.find(x);
  let yr = this.find(y);
  if (xr === yr) {
   return false; // already have the same parent
  } else if (this.rank[xr] < this.rank[yr]) {
   // If root1’s rank is less than root2’s rank 
   // Then move root1 under root2
   this.parent[xr] = yr;
  } else if (this.rank[xr] > this.rank[yr]) {
   // If root1’s rank is larger than root2’s rank
   // Then move root2 under root1
   this.parent[yr] = xr;
  } else {
   // if ranks are the same
   // Then move root1 under root2 (doesn't matter which one goes where)
   // same height
   this.parent[yr] = xr;
   this.rank[xr]++;
  }
  this.numComponents -= 1;
  return true;
 }
}