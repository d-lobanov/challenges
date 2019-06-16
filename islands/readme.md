The task is to find the largest island on the map.

# input
The map looks like a two-dimensional array. 1 is land, 0 is sea.
```
[
  [0, 0, 1, 0],
  [1, 0, 1, 1],
  [0, 0, 0, 1],
  [1, 0, 0, 0],
  [1, 1, 0, 0]
]
```

# output
Print length of the largest island and coordinates of all cells that it contains.
```
4
{ y: '0', x: '2' }
{ y: '1', x: '2' }
{ y: '1', x: '3' }
{ y: '2', x: '3' }
```