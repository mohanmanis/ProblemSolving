# Overview

* When we are scheduling jobs or tasks, they may have dependencies. For example, before we finish task a, we have to finish b first. In this case, given a set of tasks and their dependencies, how shall we arrange our schedules? There comes an interesting graph algorithm: Topological Sort.

## Given a directed acyclic graph (DAG), a **topological sort** is a linear ordering of all vertices such that for any edge (u, v), u comes before v. Another way to describe it is that when you put all vertices horizontally on a line, all of the edges are pointing from left to right.

## Implementations
There are two ways to implement it.
  - **Breadth-First-Search (BFS)**
  - **Depth-First-Search (DFS)**

## BFS(Kahn's Algorithm)
 
 > Steps
 > - We need an array **indegree** to keep the track of the indegrees
 > - Then we will try to output all of the nodes with 0 indegree, and remove the edges coming out of them at the same time.
 > - Besides, remember to put those nodes that become 0 indegree in the queue.
 > - Then, we keep doing this until all nodes are visited.
 > - To implement it, we can store the graph in an **adjacent list** and a **queue** to loop.

```js
  indegree = an array indicating indegrees for each node
  neighbours = a HashMap recording neighbours of each node
  queue = []
  for i in indegree:
    if indegree[i] == 0:
      queue.append(i)
		
  while !queue.empty():
    node = queue.dequeue()
    for neighbour in neighbours[node]:
      indegree[neighbour] -= 1
      if indegree[neighbour] == 0:
        queue.append(neighbour)
```

 ## DFS
 > **Intuition**
  ### Leaf nodes should always come after their parents and ancestors.That is why we will use **DFS** and output nodes from leaves to the root

 > Steps
 > - We need a Set or boolean array `visited` so that `visited[i]` indicates if we have visited vertex `i`.
 > - For each unvisited node, we would first mark it as `visited` and call DFS() to start searching its `neighbours`.
 > - After finishing this, we can insert it to the front of a list
 > - After visiting all nodes, we can return that list.


```js

def topological_sort():
  for each node:
    if visited[node] is False:
      dfs(node)

def dfs(node):
  visited[node] = True
  for nei in neighbours[node]:
    dfs(node)
if visited(node) = false:
  ret.insert_at_the _front(node)

```
