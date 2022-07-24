/* 

A segment tree is a binary tree where each node represents an interval. Generally a node would store one or more properties of an interval which can be queried later

Why do we require it?

Many problems require that we give results based on query over a range or segment of available data. This can be a tedious and slow process, especially if the number of queries is large and repetitive. A segment tree let's us process such queries efficiently in logarithmic order of time.

Let our data be in an array arr[] of size nn.

1.The root of our segment tree typically represents the entire interval of data we are interested in.     This  would be arr[0:n-1].

2.Each leaf of the tree represents a range comprising of just a single element. Thus the leaves represent arr1.[0], arr[1] and so on till arr[n-1].

3.The internal nodes of the tree would represent the merged or union result of their children nodes.

4.Each of the children nodes could represent approximately half of the range represented by their parent.

Recursive methods for Segment Trees

* The node of the tree is at index 00. Thus tree[0] is the root of our tree.
* The children of tree[i] are stored at tree[2*i+1] and tree[2*i+2].
* We will pad our arr[] with extra 0 or null values so that n = 2^k 
  (where nn is the final length of arr[] and kk is a non negative integer.)

  A segment tree for an nn element range can be comfortably represented using an array of size approx ≈4∗n.

  Both the read and update queries now take logarithmic O(log2(n)) time, which is what we desired.

*/

const buildSegTree = (arr, tree, treeIndex, lo, hi) => {
  if (lo === high) {
    tree[treeIndex] = arr[lo];
    return;
  }
  let mid = lo + (hi - lo) / 2;   // recurse deeper for children.
  buildSegTree(arr, 2 * treeIndex + 1, lo, mid);
  buildSegTree(arr, 2 * treeIndex + 2, mid + 1, hi);
  // merge build results
  tree[treeIndex] = merge(tree[2 * treeIndex + 1], tree[2 * treeIndex + 2]);
  return tree;
}

// call this method as buildSegTree(arr, 0, 0, n-1);
// Here arr[] is input array and n is its size.

/* 
The method builds the entire `tree` in a bottom up fashion. When the condition lo = hi lo = hi is satisfied, we are left with a range comprising of just a single element (which happens to be `arr[lo]`). This constitutes a leaf of the tree. The rest of the nodes are built by merging the results of their two children. `treeIndex` is the index of the current node of the segment tree which is being processed.

*/

const querySegTree = (treeIndex, lo, hi, i, j) => {
  // query for arr[i..j]

  if (lo > j || hi < i)               // segment completely outside range
    return 0;                       // represents a null node

  if (i <= lo && j >= hi)             // segment completely inside range
    return tree[treeIndex];

    let mid = lo + (hi - lo) / 2;       // partial overlap of current segment and queried range. Recurse deeper.

  if (i > mid)
    return querySegTree(2 * treeIndex + 2, mid + 1, hi, i, j);
  else if (j <= mid)
    return querySegTree(2 * treeIndex + 1, lo, mid, i, j);

    let leftQuery = querySegTree(2 * treeIndex + 1, lo, mid, i, mid);
    let rightQuery = querySegTree(2 * treeIndex + 2, mid + 1, hi, mid + 1, j);

  // merge query results
  return merge(leftQuery, rightQuery);
}

/* 

 call this method as querySegTree(0, 0, n - 1, i, j);

 Here [i,j] is the range/interval you are querying.

 This method relies on "null" nodes being equivalent to storing zero.

*/


const updateValSegTree = (treeIndex, lo, hi, arrIndex, val) => {
  if (lo == hi) {                 // leaf node. update element.
    tree[treeIndex] = val;
    return;
  }

    let mid = lo + (hi - lo) / 2;   // recurse deeper for appropriate child

  if (arrIndex > mid)
    updateValSegTree(2 * treeIndex + 2, mid + 1, hi, arrIndex, val);
  else if (arrIndex <= mid)
    updateValSegTree(2 * treeIndex + 1, lo, mid, arrIndex, val);

  // merge updates
  tree[treeIndex] = merge(tree[2 * treeIndex + 1], tree[2 * treeIndex + 2]);
}

/* 
  call this method as updateValSegTree(0, 0, n-1, i, val);
  Here you want to update the value at index i with value val.

*/
