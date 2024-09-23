class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // Add a single node to the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // Add multiple nodes to the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // Add an edge between two nodes
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // Remove the edge between two nodes
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // Remove a node from the graph
  removeVertex(vertex) {
    // Remove the vertex from all adjacent nodes
    for (let adj of vertex.adjacent) {
      adj.adjacent.delete(vertex);
    }
    // Remove the vertex from the graph
    this.nodes.delete(vertex);
  }

  // Depth-First Search (DFS)
  depthFirstSearch(start) {
    let visited = new Set();
    let result = [];

    function dfs(node) {
      if (!node || visited.has(node)) return;
      visited.add(node);
      result.push(node.value);
      node.adjacent.forEach((neighbor) => dfs(neighbor));
    }

    dfs(start);
    return result;
  }

  // Breadth-First Search (BFS)
  breadthFirstSearch(start) {
    let visited = new Set();
    let result = [];
    let queue = [start];
    visited.add(start);

    while (queue.length) {
      let node = queue.shift();
      result.push(node.value);

      for (let neighbor of node.adjacent) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }
}

module.exports = { Graph, Node };
