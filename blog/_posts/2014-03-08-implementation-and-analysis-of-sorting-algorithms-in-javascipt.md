---
layout: default
title: "Implementation and Analysis of Sorting Algorithms in JavaScript"
tags:
  - javascript
---

This post describes JavaScript implementations and runtime performance of four sorting algorithms: _Insertion Sort_, _Selection Sort_, _Merge Sort_, and _Heap Sort_. Any run-time cited is to be assumed _Big-O_.

The source code can be obtained at: [Javascript Algorithms Test and Source](https://github.com/jonmbake/javascript-sorting-algorithms). Or you can run the tests directly by going to: [Run Sorting Tests](http://jonmbake.github.io/javascript-sorting-algorithms/test.html) (note: it might take awhile for the page to open as the tests are running).

## Augmenting the Array prototype

**Note:** Augmenting any built-in JavaScript type is an anti-pattern that should be avoided in production code.

Since we are going to be sorting arrays, it will be helpful to provide a few extra utility functions that work on arrays. These are the ones I added, which I will use in the implementations:

```
/**
 * Look up an element in an array based on a one-based index.
 *
 * @param  {Number} index one-base index
 * @return {Object}       element at index in array
 */
Array.prototype.elem = function (index) {
  return this[index-1];
};

/**
 * Swap an element using one-based indexes.
 *
 * @param  {Number} index1 index of first element to swap
 * @param  {Number} index2 index of second element to swap
 * @return {void}
 */
Array.prototype.elemSwap = function (index1, index2) {
  var temp = this[index1 - 1];
  this[index1 - 1] = this[index2 - 1];
  this[index2 - 1] = temp;
};

/**
 * Swap an element using zero-base indexes.
 * @param  {[type]} index1 [description]
 * @param  {[type]} index2 [description]
 * @return {[type]}        [description]
 */
Array.prototype.swap = function (index1, index2) {
  var temp = this[index1];
  this[index1] = this[index2];
  this[index2] = temp;
};

/**
 * Clone an array.
 *
 * @return {void}
 */
Array.prototype.clone = function() {
  return this.slice(0);
};
```

These functions are fairly straight-forward. Swapping elements is one of the most common operations when sorting arrays. In fact, every algorithm listed uses swapping in some fashion. There are a couple functions provided to make swapping easier. Another thing that you will notice is that there are `elem` and `elemSwap` functions, which operate on one-based indexes. These functions will come in handy in the _Heap Sort_ algorithm.

## Insertion Sort

One of the simplest sorting algorithms is _Insertion Sort_. The algorithm for _Insertion Sort_ goes something like this:

1.  Start at the second index and compare it to the first. Swap the elements if the second is less than the first.
2.  Move on to the third element in the array and compare it to second. Again, swap if the third element is less than the second. If the elements swap, compare the second and first again. If no swap occurs, move on to fourth element. Elements one through three are now sorted.
3.  Continue in this fashion until the end of the array is reached.

```
/**
* Insertion sort algorithm.
*
* @param  {Array} arr array to be sorted
* @return {Array}     sorted array
*/
function insertSort (arr) {
  for (var i = 1; i <= arr.length; i++) {
    for (var j = i-1; j >= 0; j--) {
      if (arr[j+1] < arr[j]) {
        arr.swap(j, j+1);
      }
    }
  }
  return arr;
}
```

As you can see, because of the nested for loops, the runtime of this algorithm is n^2. The main benefits of this algorithm is its simplicity and that it does not require additional space (memory) since the sorting is done in place. The main drawback is its slowness. n^2 is not very good for a runtime. As you will see later, we can do much better.

## Selection Sort

_Selection Sort_ is another simple algorithm. Starting at the first index in the array, it traverses the whole array, finding the smallest element. It then swaps the smallest element with the one in the first position. Then it moves on to the second and does the same process. The algorithm is JavaScript:

```

/**
* Selection sorting algorithm.
*
* @param  {Array} arr array to be sorted
* @return {Array}     sorted array
*/
function selectionSort (arr) {
//visit every element in array
for (var i = 0; i < arr.length; i++) {
  //find minimum in elements in i...n
  var min = arr[i];
  var minIndex = i;
  for (var j = i+1; j < arr.length; j++) {
    if (arr[j] < min) {
      min = arr[j];
      minIndex = j;
    }
  }
  //swap the current index with that of the minimum value
  arr.swap(i, minIndex);
}
return arr;
}
```

The runtime of this algorithm is also n^2. Again there are two nested for loops.

## Merge Sort

Merge sort is a bit more complicated than the preceding two algorithms. Merge sort uses recursion to “divide and conquer” the sorting task. There are two main steps to the algorithm:

1.  Recursively divide the array until there are n arrays each with a single element
2.  Recursively merge the divided arrays. The merging step sorts the two arrays being merged by doing a step-wise comparison of the first two un-merged items in each array.

After the final two sub-arrays are merged, the result is a sorted array.

The algorithm in JavaScript:

```
/**
 * Merge sort algorithm.
 *
 * @param  {Array} arr array to be sorted
 * @return {Array}     sorted array
 */
function mergeSort (arr) {
  //step 1 - recursively divide array until we are down to a single element
  if (arr.length <= 1) {
    return arr;
  }
  var middleIndex = Math.floor(arr.length/2);
  var leftSorted = mergeSort(arr.slice(0, middleIndex));
  var rightSorted = mergeSort(arr.slice(middleIndex));
  //step 2 - merge the divided arrays
  return merge(leftSorted, rightSorted);
}

/**
 * Helper function to #mergeSort-- merge the left and right array into a single sorted array.
 *
 * @param  {Array} left  left array to be merged
 * @param  {Array} right right array to be merged
 * @return {Array}       sorted array
 */
function merge (left, right) {
  var sortedArr = [];
  //current left and right index being compared
  var leftInd = 0;
  var rightInd = 0;
  while (leftInd < left.length || rightInd < right.length) {
    if (rightInd === right.length || left[leftInd] <= right[rightInd]) {
      sortedArr.push(left[leftInd]);
      ++leftInd;
    } else {
      sortedArr.push(right[rightInd]);
      ++rightInd;
    }
  }
  return sortedArr;
}
```

The runtime of merge sort in _n log(n)_. The height of the “merge tree” is _log n_ and each level in the tree takes _n_ amount of time (running the merge function on every sub-array on the level). The benefits of merge sort is its runtime (_n log(n)_ is pretty good!). The drawback is that it takes additional memory with having to create the sub-arrays.

## Heap Sort

This is the most complicated of the sorting algorithms. _Heap Sort_ relies on the heap data structure. Heaps are a binary tree data structures, where elements must satisfy a certain rule. There are two types of _heaps_: _min heaps_ and _max heaps_. With _max heaps_, every parent must be greater than both children. Conversely, with _min heaps_, every parent must be less than its children. Use a _min heap_ to sort an array from smallest to largest. On the other hand, use a _max heap_ to sort an array from largest to smallest.

The heap sorting algorithm works by first creating a min heap from the array to be sorted. An important note is that a binary tree can be represented by an array by using the following rules (i equals one-based index in array):

1.  The root of the tree is at the first index (i =1)
2.  parent(i) = i/2 (or more specifically floor(i/2))
3.  left(i) = 2i, right(i) = 2i + 1

Once the heap is constructed, the elements at index 1 and n are swapped, element n is removed and we “re-heapify” the array.

Without further ado, the algorithm in JavaScript:

```
/**
 * Heap constructor.
 *
 * Build a minimum heap.
 * @constructor
 * @param {Array} arr array to be sorted
 */
function Heap (arr) {
  this.heapArray = arr.clone();
  //a few good attributes to know...
  this.heapSize = this.heapArray.length;
  this.numberOfNonLeaveNodes = Math.ceil(this.heapSize/2);
  //build the heap
  this.buildHeap();
  //this will remain blank, until calling #sort
  this.sortedArray = [];
}

/**
 * Build the heap.
 *
 * We build the heap by working up from the n/2 node and calling #heapifyNode.
 * @return {void}
 */
Heap.prototype.buildHeap = function () {
  for(var i = this.numberOfNonLeaveNodes; i >= 1; --i) {
    this.heapifyNode(i);
  }
};

/**
 * Heapify the node.
 *
 * This function assumes that the "sub-heaps" of the children element of index are
 * valid heaps.
 * @param  {Number} index one-based index
 * @return {void}
 */
Heap.prototype.heapifyNode = function (index) {
  //find indexes of children
  var leftIndex = 2 * index;
  var rightIndex = 2 * index + 1;
  var smallest = index;
  //look to see if left child or left child is less than parent
  if (leftIndex <= this.heapSize && this.heapArray.elem(leftIndex) < this.heapArray.elem(smallest)) {
    smallest = leftIndex;
  }
  if (rightIndex <= this.heapSize && this.heapArray.elem(rightIndex) < this.heapArray.elem(smallest)) {
    smallest = rightIndex;
  }
  //if left or right child was smaller than we have to heapify that node
  if (smallest != index) {
    this.heapArray.elemSwap(index, smallest);
    this.heapifyNode(smallest);
  }
};

/**
 * Sort the array using the heap.
 *
 * @return {Array} Sorted Array
 */
Heap.prototype.sort = function () {
  //sort was already called ie the sorted array is already populated, just return that
  if (this.sortedArray.length !== 0) {
    return this.sortedArray;
  } else {
    for (var i = 1; i <= this.heapSize; ++i) {
      this.heapArray.elemSwap(1, this.heapArray.length);
      this.sortedArray[i - 1] = this.heapArray.pop();
      this.heapifyNode(1);
    }
    return this.sortedArray;
  }
};
```

This algorithm also runs in _n log(n)_. Building the heap take _n_ amount of time. Constructing the sorted array by popping off the top element and “re-heapifying” takes _n log(n)_.

## Testing and Analysis

We can test our sorting algorithms by running the following code:

```
$(document).ready(function () {
  /**
   * Returns true if the array is sorted.
   *
   * @param  {Array}  arr Array to check
   * @return {Boolean}    true if array is sorted
   */
  var isSorted = function (arr) {
    for (var i = 1; i < arr.length; ++i) {
      if (arr[i - 1] > arr[i]) {
        return false;
      }
    }
    return true;
  };

  var testArray = [];
  //populate the test array
  var TEST_ARRAY_LENGTH = 50000;
  var TEST_MAX_VALUE = 10000;
  for (var i = 0; i < TEST_ARRAY_LENGTH; ++i) {
    testArray.push(Math.random() * TEST_MAX_VALUE);
  }
  //run the tests
  var ALGORITHMS = ['INSERT', 'SELECTION', 'MERGE', 'HEAP'];
  var RUNTIMES = ['n^2', 'n^2', 'n log(n)', 'n log(n)'];
  for (var i = 0; i < ALGORITHMS.length; ++i) {
    var testArrayCopy = testArray.clone();
    var startTime = new Date().getTime();
    var sortedArr = sort(ALGORITHMS[i], testArrayCopy);
    var endTime = new Date().getTime();
    var isArraySorted = isSorted(sortedArr);
    $tr = $('<tr/>');
    $tr.append($('<td/>').html(ALGORITHMS[i]))
      .append($('<td/>').html(RUNTIMES[i]))
      .append($('<td/>').html(endTime-startTime))
      .append($('<td/>').html(isArraySorted ? "Yes" : "No").addClass(isArraySorted ? "passed" : "failed"))
    $('tbody').append($tr);
    testArrayCopy = null;
  }
});
```

This runs inside an HTML file and assumes a table is defined on the page:

```
<table>
  <thead>
    <th>Algorithm</th>
    <th>Big-O Runtime</th>
    <th>Actual Runtime (ms)</th>
    <th>Passed Sorted Test</th>
  </thead>
  <tbody>
  </tbody>
</table>
</pre>
</pre>
```

The test runs each sorting algorithm on a array of length 50,000 with values ranging from 0 to 10,000. A check is done to make sure the array is indeed sorted. Below are the results when running within Chrome:

![sorting_algs](/assets/images/blog/2014/03/08/sorting_algs.png)

As expected, _Insertion Sort_ and _Selection Sort_ have similar performance, with _Insertion_ being slightly faster. The same can be said for _Merge Sort_ and _Heap Sort_, with _Heap_ being slightly faster.

Feel free to grab the source and run the tests for yourself: [Javascript Algorithms Test and Source](https://github.com/jonmbake/javascript-sorting-algorithms). Or you can run the tests directly by going to: [Run Sorting Tests](http://jonmbake.github.io/javascript-sorting-algorithms/test.html) (note: it might take awhile for the page to open as the tests are running). It is interesting to run the results in different browsers and see how much the results vary.
