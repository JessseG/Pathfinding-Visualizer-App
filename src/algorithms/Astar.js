import React from "react";

function Astar(startNode, endNode, Grid, Y, X) {
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

  //________________________________________________________________________________

  function probeRight2(node) {
    // console.log(node);
    if (
      node.x <= X - 2 &&
      !Grid[node.y][node.x + 1].isWall &&
      !visitedNodes.includes(Grid[node.y][node.x + 1])
    ) {
      return true;
    }
  }
  function probeDown2(node) {
    if (
      node.y <= Y - 2 &&
      !Grid[node.y + 1][node.x].isWall &&
      !visitedNodes.includes(Grid[node.y + 1][node.x])
    ) {
      return true;
    }
  }
  function probeLeft2(node) {
    if (
      node.x >= 1 &&
      !Grid[node.y][node.x - 1].isWall &&
      !visitedNodes.includes(Grid[node.y][node.x - 1])
    ) {
      return true;
    }
  }
  function probeUp2(node) {
    if (
      node.y >= 1 &&
      !Grid[node.y - 1][node.x].isWall &&
      !visitedNodes.includes(Grid[node.y - 1][node.x])
    ) {
      return true;
    }
  }

  // ______________________________________________________________

  const frontier = [];
  const frontier2 = [];
  const visitedNodes = [];
  const shortestPath = [];

  startNode.d = 0;
  // startNode.h = distance(startNode, endNode);  // already calculated

  visitedNodes.push(startNode);

  let currentNode;

  let heuristic = startNode.h;

  let tempDist = 0;

  // ______________________________________________________________

  // probeRight
  if (probeRight(startNode)) {
    frontier2.push(Grid[startNode.y][startNode.x + 1]);
    if (Grid[startNode.y][startNode.x + 1].h < heuristic) {
      tempDist = startNode.d;
      frontier.push(Grid[startNode.y][startNode.x + 1]);
      heuristic = Grid[startNode.y][startNode.x + 1].h;
      // console.log(Grid[startNode.y][startNode.x + 1]);
      // console.log("probeRight");
    }
  }
  // probeDown
  if (probeDown(startNode)) {
    frontier2.push(Grid[startNode.y + 1][startNode.x]);
    if (Grid[startNode.y + 1][startNode.x].h < heuristic) {
      tempDist = startNode.d;
      frontier.push(Grid[startNode.y + 1][startNode.x]);
      heuristic = Grid[startNode.y + 1][startNode.x].h;
      // console.log(Grid[startNode.y + 1][startNode.x]);
      // console.log("probeDown");
    }
  }
  // probeLeft
  if (probeLeft(startNode)) {
    frontier2.push(Grid[startNode.y][startNode.x - 1]);
    if (Grid[startNode.y][startNode.x - 1].h < heuristic) {
      tempDist = startNode.d;
      frontier.push(Grid[startNode.y][startNode.x - 1]);
      heuristic = Grid[startNode.y][startNode.x - 1].h;
      // console.log(Grid[startNode.y][startNode.x - 1]);
      // console.log("probeLeft");
    }
  }
  // probeUp
  if (probeUp(startNode)) {
    frontier2.push(Grid[startNode.y - 1][startNode.x]);
    if (Grid[startNode.y - 1][startNode.x].h < heuristic) {
      tempDist = startNode.d;
      frontier.push(Grid[startNode.y - 1][startNode.x]);
      heuristic = Grid[startNode.y - 1][startNode.x].h;
      // console.log(Grid[startNode.y - 1][startNode.x]);
      // console.log("probeUp");
    }
  }

  if (frontier2[0] === undefined) {
    return { visitedNodes, shortestPath, error: "No path" };
  }

  let min = frontier2[0].h;
  let minNode = frontier2[0];

  for (let i = 1; i < frontier2.length; i++) {
    let h = frontier2[i].h;
    if (h < min) {
      min = h;
      minNode = frontier2[i];
    }
  }

  frontier.push(minNode);

  if (frontier[frontier.length - 1] === undefined) {
    console.log("broke");
    // console.log(frontier[frontier.length - 1]);

    return { visitedNodes, shortestPath, error: "No path" };
  }

  // console.log(frontier[frontier.length - 1]);
  frontier[frontier.length - 1].d = tempDist + 1;
  visitedNodes.push(frontier[frontier.length - 1]);

  let i = 1;
  let node = visitedNodes[visitedNodes.length - 1];

  // Astar
  while (node !== null && node !== endNode) {
    if (node === endNode) {
      break;
    }

    node = visitedNodes[visitedNodes.length - 1];

    // break;
    heuristic = node.h;

    // console.log(node);

    if (probeRight(node)) {
      if (Grid[node.y][node.x + 1].h < heuristic) {
        tempDist = node.d;
        frontier.push(Grid[node.y][node.x + 1]);
        heuristic = Grid[node.y][node.x + 1].h;
        // console.log(Grid[node.y][node.x + 1]);
      }
    }

    if (probeDown(node)) {
      if (Grid[node.y + 1][node.x].h < heuristic) {
        tempDist = node.d;
        frontier.push(Grid[node.y + 1][node.x]);
        heuristic = Grid[node.y + 1][node.x].h;
        // console.log(Grid[node.y + 1][node.x]);
      }
    }

    if (probeLeft(node)) {
      if (Grid[node.y][node.x - 1].h < heuristic) {
        tempDist = node.d;
        frontier.push(Grid[node.y][node.x - 1]);
        heuristic = Grid[node.y][node.x - 1].h;
      }
    }

    if (probeUp(node)) {
      if (Grid[node.y - 1][node.x].h < heuristic) {
        tempDist = node.d;
        frontier.push(Grid[node.y - 1][node.x]);
        heuristic = Grid[node.y - 1][node.x].h;
      }
    }

    if (
      !frontier[frontier.length - 1].isWall &&
      !visitedNodes.includes(frontier[frontier.length - 1])
    ) {
      frontier[frontier.length - 1].d = tempDist + 1;
      visitedNodes.push(frontier[frontier.length - 1]);
      // console.log("astar");

      if (frontier[frontier.length - 1] === endNode) {
        console.log("END");
        break;
      }

      i++;
    } else {
      let j = 0;

      // alternate to dijkstras
      while (node !== null && node !== undefined && node !== endNode) {
        node = visitedNodes[j];

        if (node === undefined) {
          return { visitedNodes, shortestPath, error: "No path" };
        }

        if (probeRight2(node)) {
          Grid[node.y][node.x + 1].d = node.d + 1;
          visitedNodes.push(Grid[node.y][node.x + 1]);
          // console.log("dijks");
          if (Grid[node.y][node.x + 1] === endNode) {
            break;
          }
          if (Grid[node.y][node.x + 1].h < heuristic) {
            node = Grid[node.y][node.x + 1];
            break;
          }
        }
        if (probeDown2(node)) {
          Grid[node.y + 1][node.x].d = node.d + 1;
          visitedNodes.push(Grid[node.y + 1][node.x]);
          // console.log("dijks");
          if (Grid[node.y + 1][node.x] === endNode) {
            break;
          }
          if (Grid[node.y + 1][node.x].h < heuristic) {
            node = Grid[node.y + 1][node.x];
            break;
          }
        }
        if (probeLeft2(node)) {
          Grid[node.y][node.x - 1].d = node.d + 1;
          visitedNodes.push(Grid[node.y][node.x - 1]);
          // console.log("dijks");
          if (Grid[node.y][node.x - 1] === endNode) {
            break;
          }
          if (Grid[node.y][node.x - 1].h < heuristic) {
            node = Grid[node.y][node.x - 1];
            break;
          }
        }
        if (probeUp2(node)) {
          Grid[node.y - 1][node.x].d = node.d + 1;
          visitedNodes.push(Grid[node.y - 1][node.x]);
          // console.log("dijks");
          if (Grid[node.y - 1][node.x] === endNode) {
            break;
          }
          if (Grid[node.y - 1][node.x].h < heuristic) {
            node = Grid[node.y - 1][node.x];
            break;
          }
        }
        j++;
      }

      if (node === endNode) {
        break;
      }
    }
    if (node === endNode) {
      break;
    }
  }

  if (visitedNodes[i] === null) {
    console.log("visitedNodes[i] is null");
  }

  // retrace

  if (visitedNodes.includes(endNode)) {
    let j = visitedNodes.length - 1;
    let k = j - 1;

    shortestPath.push(visitedNodes[j]);

    let nodeA = visitedNodes[j];

    let nodeB = visitedNodes[k];

    let dist = nodeA.d;

    while (true) {
      // break; // check Left
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

export default Astar;
