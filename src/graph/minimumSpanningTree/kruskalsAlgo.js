 /* 
An alternative greedy algorithm to Prim’s is called Kruskal’s Algorithm, which just doesn’t have a starting vertex. It instead builds up connections via components of vertices and, for sparse graphs, can run faster than Prim’s, provided it uses the right data structure.

N0te:: Are you trying to find an MST in a sparse graph? Use Kruskal’s Algorithm.

It uses disjoint set data structure in order to find the minimum spanning tree.
1. don't store the graph in the adjacency list rather store it in linear data structure
2. Sort all of the edges wrt to weight and store it in linear data structure.
3. Greedily find shortest edge and find if the corresponding edges are connected using the disjoint union find.
4. if they don't belong to same set then combine them in the same set.
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

  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}

const KruskalsAlgo = (edgeList) => {
  let len = edgeList.length;
  edgeList.sort((a, b)=> a[2] - b[2])
  let dsu = new UnionFind(len);
  let minCost = 0;
console.log("following are the edges in the constructed MST");
  for (let [x, y, w] of edgeList) {
    if (dsu.find(x) != dsu.find(y)) {
      dsu.union(x, y);
      minCost += w;
      console.log(`${x} -- ${y} == ${w}`);
    }
  }
  return minCost;
}

const graph = [
  [0, 1, 10],
  [1, 3, 15],
  [2, 3, 4],
  [2, 0, 6],
  [0, 3, 5]
]
console.log(KruskalsAlgo(graph, 0));