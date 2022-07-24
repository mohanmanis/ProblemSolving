/* 
Binary Indexed Tree or Fenwick Tree

Fenwick tree is a data structure which:
  * calculates the value of function  in the given range  [l,r] (i.e. f(Al + Al + 1, ...,Ar)) in O(logN) time;
  * updates the value of an element of  in O(logN) time;
  * requires O(N)  memory, or in other words, exactly the same memory required for ;
  * is easy to use and code, especially, in the case of multidimensional arrays
  * Fenwick tree is also called Binary Indexed Tree, or just BIT abbreviated.
   
  
   getSum(x): Returns the sum of the sub-array arr[0,…,x] 
   **Returns the sum of the sub-array arr[0,…,x] using BITree[0..n], which is constructed from arr[0..n-1]*
  
  1) Initialize the output sum as 0, the current index as x + 1. 
  2) Do following while the current index is greater than 0. 
    …a) Add BITree[index] to sum 
    …b) Go to the parent of BITree[index]. The parent can be obtained by removing 
    the last set bit from the current index, i.e., index = index – (index & (-index)) ;
  3) Return sum.

  update(x, val): Updates the Binary Indexed Tree (BIT) by performing arr[index] += val 
  ** Note that the update(x, val) operation will not change arr[]. It only makes changes to BITree[] *
  1) Initialize the current index as x + 1 . 
  2) Do the following while the current index is smaller than or equal to n. 
    …a) Add the val to BITree[index] 
   …b) Go to next element of BITree[index]. The next element can be obtained by incrementing the last set bit of the current index, i.e., index = index + (index & (-index))

   *** BIT array should be 1 based indexing, otherwise it will lead to infinite loop ***
*/

class BinaryIndexedTree {
  constructor(size) {
    this.bit = Array(size).fill(0);
  }
  sum(index) {
    let count = 0;
    while (index > 0) {
      count += this.bit[index];
      index -= (index & -index); // this is to get parent node in binary indexed tree
    }
    return count;
  }
  update(index, delta) {
    while (index < this.bit.length) {
      this.bit[index] +=  delta;
      index += (index & -index); // this is to get next node in binary indexed tree
    }
  }

  rangeSum(left, right) {
    return this.sum(right) - this.sum(left);
  }
}



let bitArray = new BinaryIndexedTree(2e4 + 2);

// Example
// for (let i = nums.length - 1; i >= 0; i--) {
//   counts[i] = bitArray.sum(nums[i] + delta - 1);  // as it is 1 based indexing
//   bitArray.update(nums[i] + delta, 1);
// }
// return counts;


