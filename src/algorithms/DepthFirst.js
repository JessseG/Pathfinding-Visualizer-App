import React from "react";

const DepthFirst = (startNode, endNode, Grid, Y, X) => {
  const visitedNodes = [];

  let node = startNode;
  visitedNodes.push(node);

  let i = 0;
  while (node !== endNode) {
    // probe up
    if (
      node.y >= 1 &&
      !visitedNodes.includes(Grid[node.y - 1][node.x]) &&
      !Grid[node.y - 1][node.x].isWall
    ) {
      visitedNodes.push(Grid[node.y - 1][node.x]);
      node = Grid[node.y - 1][node.x];
    }

    // probe right
    else if (
      node.x <= X - 2 &&
      !visitedNodes.includes(Grid[node.y][node.x + 1]) &&
      !Grid[node.y][node.x + 1].isWall
    ) {
      visitedNodes.push(Grid[node.y][node.x + 1]);
      node = Grid[node.y][node.x + 1];
    }

    // probe down
    else if (
      node.y <= Y - 2 &&
      !visitedNodes.includes(Grid[node.y + 1][node.x]) &&
      !Grid[node.y + 1][node.x].isWall
    ) {
      visitedNodes.push(Grid[node.y + 1][node.x]);
      node = Grid[node.y + 1][node.x];
    }

    // probe left
    else if (
      node.x >= 1 &&
      !visitedNodes.includes(Grid[node.y][node.x - 1]) &&
      !Grid[node.y][node.x - 1].isWall
    ) {
      visitedNodes.push(Grid[node.y][node.x - 1]);
      node = Grid[node.y][node.x - 1];
    }

    // backrtrack
    else {
      let k = visitedNodes.length - 1;
      while (true) {
        node = visitedNodes[k];

        // probe up
        if (
          node.y >= 1 &&
          !visitedNodes.includes(Grid[node.y - 1][node.x]) &&
          !Grid[node.y - 1][node.x].isWall
        ) {
          visitedNodes.push(Grid[node.y - 1][node.x]);
          node = Grid[node.y - 1][node.x];
          break;
        }

        // probe right
        else if (
          node.x <= X - 2 &&
          !visitedNodes.includes(Grid[node.y][node.x + 1]) &&
          !Grid[node.y][node.x + 1].isWall
        ) {
          visitedNodes.push(Grid[node.y][node.x + 1]);
          node = Grid[node.y][node.x + 1];
          break;
        }

        // probe down
        else if (
          node.y <= Y - 2 &&
          !visitedNodes.includes(Grid[node.y + 1][node.x]) &&
          !Grid[node.y + 1][node.x].isWall
        ) {
          visitedNodes.push(Grid[node.y + 1][node.x]);
          node = Grid[node.y + 1][node.x];
          break;
        }

        // probe left
        else if (
          node.x >= 1 &&
          !visitedNodes.includes(Grid[node.y][node.x - 1]) &&
          !Grid[node.y][node.x - 1].isWall
        ) {
          visitedNodes.push(Grid[node.y][node.x - 1]);
          node = Grid[node.y][node.x - 1];
          break;
        }

        // terminate
        else if (k === 0) {
          return {
            visitedNodes,
            error: "No path",
          };
        }
        k--;
      }
    }

    i++;
    // console.log(none);
    // console.log(node);
    // break;
  }
  // console.log(visitedNodes);
  return { visitedNodes };
};

export default DepthFirst;
