import React from "react";

function Dijkstra(startNode, endNode, Grid, Y, X) {
  const visitedNodes = [];
  const shortestPath = [];

  startNode.d = 0;
  visitedNodes.push(startNode);

  let currentNode = startNode;

  // ______________________________________________________________

  function probeRight(node) {
    // console.log(node);
    if (
      node.x <= X - 2 &&
      !Grid[node.y][node.x + 1].isWall &&
      !visitedNodes.includes(Grid[node.y][node.x + 1])
    ) {
      return true;
    }
  }
  function probeDown(node) {
    if (
      node.y <= Y - 2 &&
      !Grid[node.y + 1][node.x].isWall &&
      !visitedNodes.includes(Grid[node.y + 1][node.x])
    ) {
      return true;
    }
  }
  function probeLeft(node) {
    if (
      node.x >= 1 &&
      !Grid[node.y][node.x - 1].isWall &&
      !visitedNodes.includes(Grid[node.y][node.x - 1])
    ) {
      return true;
    }
  }
  function probeUp(node) {
    if (
      node.y >= 1 &&
      !Grid[node.y - 1][node.x].isWall &&
      !visitedNodes.includes(Grid[node.y - 1][node.x])
    ) {
      return true;
    }
  }

  // ______________________________________________________________

  // probeRight
  if (!Grid[startNode.y][startNode.x + 1].isWall) {
    currentNode = Grid[startNode.y][startNode.x + 1];
    currentNode.d = startNode.d + 1;
    visitedNodes.push(currentNode);
  }
  // probeDown
  if (!Grid[startNode.y + 1][startNode.x].isWall) {
    currentNode = Grid[startNode.y + 1][startNode.x];
    currentNode.d = startNode.d + 1;
    visitedNodes.push(currentNode);
  }
  // probeLeft
  if (!Grid[startNode.y][startNode.x - 1].isWall) {
    currentNode = Grid[startNode.y][startNode.x - 1];
    currentNode.d = startNode.d + 1;
    visitedNodes.push(currentNode);
  }
  // probeUp
  if (!Grid[startNode.y - 1][startNode.x].isWall) {
    currentNode = Grid[startNode.y - 1][startNode.x];
    currentNode.d = startNode.d + 1;
    visitedNodes.push(currentNode);
  }

  let i = 1;
  let node;

  while (i < visitedNodes.length) {
    node = visitedNodes[i];

    // console.log(node);
    if (probeRight(node)) {
      Grid[node.y][node.x + 1].d = node.d + 1;
      visitedNodes.push(Grid[node.y][node.x + 1]);
      if (Grid[node.y][node.x + 1] === endNode) {
        break;
      }
    }
    if (probeDown(node)) {
      Grid[node.y + 1][node.x].d = node.d + 1;
      visitedNodes.push(Grid[node.y + 1][node.x]);
      if (Grid[node.y + 1][node.x] === endNode) {
        break;
      }
    }
    if (probeLeft(node)) {
      Grid[node.y][node.x - 1].d = node.d + 1;
      visitedNodes.push(Grid[node.y][node.x - 1]);
      if (Grid[node.y][node.x - 1] === endNode) {
        break;
      }
    }
    if (probeUp(node)) {
      Grid[node.y - 1][node.x].d = node.d + 1;
      visitedNodes.push(Grid[node.y - 1][node.x]);
      if (Grid[node.y - 1][node.x] === endNode) {
        break;
      }
    }

    i++;
  }

  if (visitedNodes.includes(endNode)) {
    let j = visitedNodes.length - 1;
    let k = j - 1;

    shortestPath.push(visitedNodes[j]);

    let nodeA = visitedNodes[j];

    let nodeB = visitedNodes[k];

    let dist = nodeA.d;

    while (true) {
      // check Left
      if (nodeA.x >= 1 && visitedNodes.includes(Grid[nodeA.y][nodeA.x - 1])) {
        if (Grid[nodeA.y][nodeA.x - 1].d < dist) {
          dist = Grid[nodeA.y][nodeA.x - 1].d;
          nodeB = Grid[nodeA.y][nodeA.x - 1];
        }
      }
      // check Down
      if (
        nodeA.y <= Y - 2 &&
        visitedNodes.includes(Grid[nodeA.y + 1][nodeA.x])
      ) {
        if (Grid[nodeA.y + 1][nodeA.x].d < dist) {
          dist = Grid[nodeA.y + 1][nodeA.x].d;
          nodeB = Grid[nodeA.y + 1][nodeA.x];
        }
      }
      // check Up
      if (nodeA.y >= 1 && visitedNodes.includes(Grid[nodeA.y - 1][nodeA.x])) {
        if (Grid[nodeA.y - 1][nodeA.x].d < dist) {
          dist = Grid[nodeA.y - 1][nodeA.x].d;
          nodeB = Grid[nodeA.y - 1][nodeA.x];
        }
      }
      // check Right
      if (
        nodeA.x <= X - 2 &&
        visitedNodes.includes(Grid[nodeA.y][nodeA.x + 1])
      ) {
        if (Grid[nodeA.y][nodeA.x + 1].d < dist) {
          dist = Grid[nodeA.y][nodeA.x + 1].d;
          nodeB = Grid[nodeA.y][nodeA.x + 1];
        }
      }

      shortestPath.push(nodeB);
      // console.log(nodeA);
      // console.log(nodeB);

      if (nodeB === undefined) {
        break;
      }

      if (nodeB.isStart) {
        break;
      }

      nodeA = nodeB;
    }
  }

  return { visitedNodes, shortestPath, error: "No path" };
}

function distance(nodeA, nodeB) {
  let distance = Math.sqrt(
    Math.pow(nodeB.x - nodeA.x, 2) + Math.pow(nodeB.y - nodeA.y, 2)
  );
  distance = Math.round((distance + Number.EPSILON) * 100) / 100;
  return distance;
}

export default Dijkstra;
