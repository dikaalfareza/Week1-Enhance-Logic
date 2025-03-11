// Soal 1: Breadth-First Search (BFS)
function shortestPath(friends, start, target) {
  //code
  if (!friends[start] || !friends[target]) return -1;
  const visited = new Set();
  const queue = [];
  queue.push([start, 0]);

  while (queue.length > 0) {
    const [currentNode, distance] = queue.shift();
    if (currentNode === target) return distance;

    visited.add(currentNode);
    for (const friend of friends[currentNode]) {
      if (!visited.has(friend)) {
        queue.push([friend, distance + 1]);
      }
    }
  }

  return -1;
}

// Testcase 1
console.log(
  shortestPath(
    {
      Alice: ["Bob", "Charlie"],
      Bob: ["Alice", "David", "Eve"],
      Charlie: ["Alice", "Eve"],
      David: ["Bob"],
      Eve: ["Bob", "Charlie"],
    },
    "Alice",
    "David"
  )
); // Expected Output: 2

// Testcase 2
console.log(
  shortestPath(
    {
      Alice: ["Bob", "Charlie"],
      Bob: ["Alice", "David", "Eve"],
      Charlie: ["Alice", "Eve"],
      David: ["Bob"],
      Eve: ["Bob", "Charlie"],
    },
    "Alice",
    "Eve"
  )
); // Expected Output: 2

// Testcase 3
console.log(
  shortestPath(
    {
      Alice: ["Bob", "Charlie"],
      Bob: ["Alice", "David", "Eve"],
      Charlie: ["Alice", "Eve"],
      David: ["Bob"],
      Eve: ["Bob", "Charlie"],
    },
    "Alice",
    "Alice"
  )
); // Expected Output: 0

// Testcase 4
console.log(
  shortestPath(
    {
      Alice: ["Bob", "Charlie"],
      Bob: ["Alice", "David", "Eve"],
      Charlie: ["Alice", "Eve"],
      David: ["Bob"],
      Eve: ["Bob", "Charlie"],
    },
    "David",
    "Charlie"
  )
); // Expected Output: 3

// Testcase 5
console.log(
  shortestPath(
    {
      Alice: ["Bob", "Charlie"],
      Bob: ["Alice", "David", "Eve"],
      Charlie: ["Alice", "Eve"],
      David: ["Bob"],
      Eve: ["Bob", "Charlie"],
    },
    "Eve",
    "Bob"
  )
); // Expected Output: 1

// Testcase 6
console.log(
  shortestPath(
    {
      Alice: ["Bob", "Charlie"],
      Bob: ["Alice", "David", "Eve"],
      Charlie: ["Alice", "Eve"],
      David: ["Bob"],
      Eve: ["Bob", "Charlie"],
    },
    "Charlie",
    "Alice"
  )
); // Expected Output: 1

// Testcase 7
console.log(
  shortestPath(
    {
      Alice: ["Bob", "Charlie"],
      Bob: ["Alice", "David", "Eve"],
      Charlie: ["Alice", "Eve"],
      David: ["Bob"],
      Eve: ["Bob", "Charlie"],
    },
    "David",
    "Eve"
  )
); // Expected Output: 2

console.log(
  "======================================================================================"
);

// Soal 2: Depth-First Search (DFS)
class Graph {
  // Implementasi graph dan metode DFS
  constructor() {
    this.nodes = new Map();
  }

  addNode(value) {
    this.nodes.set(value, new Node(value));
  }

  addEdge(source, destination) {
    if (!this.nodes.has(source) || !this.nodes.has(destination)) {
      throw new Error("Source or destination node does not exist.");
    }

    let sourceNode = this.nodes.get(source);
    let destinationNode = this.nodes.get(destination);
    sourceNode.addEdge(destinationNode);
  }

  dfs(currentNode, visited) {
    if (!currentNode || visited.has(currentNode.value)) return;
    visited.add(currentNode.value);

    for (const neighbor of currentNode.edges) {
      this.dfs(neighbor, visited);
    }
  }

  countIslands(grid) {
    const graph = new Graph();
    const rows = grid.length;
    const cols = grid[0].length;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === 1) {
          let newNode = `${r}${c}`;
          graph.addNode(newNode);

          if (r > 0 && grid[r - 1][c] === 1) {
            graph.addEdge(newNode, `${r - 1}${c}`);
            graph.addEdge(`${r - 1}${c}`, newNode);
          }
          if (c > 0 && grid[r][c - 1] === 1) {
            graph.addEdge(newNode, `${r}${c - 1}`);
            graph.addEdge(`${r}${c - 1}`, newNode);
          }
        }
      }
    }

    let counter = 0;
    const visited = new Set();
    for (const node of graph.nodes.values()) {
      if (!visited.has(node.value)) {
        counter++;
        this.dfs(node, visited);
      }
    }

    return counter;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.edges = [];
  }

  addEdge(node) {
    this.edges.push(node);
  }
}

function islandCount(grid) {
  // Implementasi DFS untuk menghitung jumlah pulau
  const graph = new Graph();
  const totalIsland = graph.countIslands(grid);
  return totalIsland;
}

// Testcase 1
console.log(
  islandCount([
    [1, 1, 1, 1, 0],
    [1, 1, 0, 1, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ])
); // Expected Output: 1

// Testcase 2
console.log(
  islandCount([
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1],
  ])
); // Expected Output: 3

// Testcase 3
console.log(
  islandCount([
    [1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 0, 0, 1, 1],
  ])
); // Expected Output: 5

// Testcase 4
console.log(
  islandCount([
    [1, 0, 0, 0],
    [0, 1, 0, 1],
    [0, 1, 0, 0],
    [0, 0, 0, 1],
  ])
); // Expected Output: 4

// Testcase 5
console.log(
  islandCount([
    [1, 1, 0, 1, 0],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0],
    [0, 1, 0, 0, 0],
  ])
); // Expected Output: 6

// Testcase 6
console.log(
  islandCount([
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 1, 1, 0],
    [1, 1, 0, 0, 0],
  ])
); // Expected Output: 2

// Testcase 7
console.log(
  islandCount([
    [1, 1, 1],
    [0, 0, 0],
    [1, 0, 1],
  ])
); // Expected Output: 3
