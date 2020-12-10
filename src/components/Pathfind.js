import React, { useState, useEffect } from "react";
import DepthFirst from "../algorithms/DepthFirst";
import Dijkstra from "../algorithms/Dijkstra";
import Astar from "../algorithms/Astar";
import Node from "./Node";
import "./Pathfind.css";

// const X = 160;
// const Y = 100;

// const X = 80;
// const Y = 50;

const X = 40; // columns
const Y = 25; // rows

const startX = 3;
const startY = Math.floor(Math.floor(Y) / 2);
const endX = Math.floor(X) - 3;
const endY = Math.floor(Y) - 2;

// const startX = Math.floor(X / 5);
// const startY = Math.floor(Y / 2);
// const endX = Math.floor((X * 4) / 5);
// const endY = Math.floor(Y / 2);

const Pathfind = () => {
  const [Grid, setGrid] = useState([]);
  var [grid, setG] = useState([]);

  const [dijkstra, setDijkstra] = useState([]);
  const [astar, setAstar] = useState([]);

  const [DijkstraNodes, setDijkstraNodes] = useState([]);
  const [DijkstraPath, setDijkstraPath] = useState([]);

  const [AstarNodes, setAstarNodes] = useState([]);
  const [AstarPath, setAstarPath] = useState([]);

  // const [mouseDown, setMouseDown] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [isDrawing, setDrawing] = useState(false);

  // var grid;

  var startNode;
  var endNode;

  useEffect(() => {
    initializeGrid();
  }, []);

  const initializeGrid = () => {
    grid = new Array(X);

    for (let i = 0; i < Y; i++) {
      grid[i] = new Array(Y);
    }

    createSpots(grid);
    setHeuristics(grid);

    startNode = grid[startY][startX];
    endNode = grid[endY][endX];

    startNode.isWall = false;
    endNode.isWall = false;

    setG(grid);

    setGrid(grid);

    // setListeners(Grid);

    const dijkstra1 = Dijkstra(startNode, endNode, grid, Y, X);
    const astar1 = Astar(startNode, endNode, grid, Y, X);

    setDijkstraNodes(dijkstra1.visitedNodes);
    setDijkstraPath(dijkstra1.shortestPath);

    setAstarNodes(astar1.visitedNodes);
    setAstarPath(astar1.shortestPath);

    setDijkstra(dijkstra1);
    setAstar(astar1);
  };

  function reloadAlgorithms() {
    const dijkstraX = Dijkstra(startNode, endNode, grid, Y, X);
    const astarX = Astar(startNode, endNode, grid, Y, X);

    setDijkstraNodes(dijkstraX.visitedNodes);
    setDijkstraPath(dijkstraX.shortestPath);

    setAstarNodes(astarX.visitedNodes);
    setAstarPath(astarX.shortestPath);
  }

  function distance(nodeA, nodeB) {
    let distance = Math.sqrt(
      Math.pow(nodeB.x - nodeA.x, 2) + Math.pow(nodeB.y - nodeA.y, 2)
    );
    distance = Math.round((distance + Number.EPSILON) * 100) / 100;
    return distance;
  }

  function Spot(y, x) {
    this.x = x;
    this.y = y;
    this.d = 0;
    this.h = 0;
    this.isStart = this.x === startX && this.y === startY;
    this.isEnd = this.x === endX && this.y === endY;
    this.isWall = false;
    // if (Math.random(1) < 0.21) {
    //   this.isWall = true;
    // }
  }

  const createSpots = (grid) => {
    for (let x = 0; x < X; x++) {
      for (let y = 0; y < Y; y++) {
        grid[y][x] = new Spot(y, x);
      }
    }
  };

  const setHeuristics = (grid) => {
    for (let x = 0; x < X; x++) {
      for (let y = 0; y < Y; y++) {
        grid[y][x].h = distance(grid[y][x], grid[endY][endX]);
      }
    }
  };

  function printTarget(e) {
    let id = e.target.id;
    if (e === undefined || e === null || e === "" || id === null || id === "")
      return;
    let validate = id.substring(0, 4);
    if (validate !== "node") return;
    // console.log(e.target.id);
    draw(e);
  }

  let mouseDown = false;

  function down(e) {
    console.log("down");
    mouseDown = true;
    printTarget(e);

    if (mouseDown) {
      document.addEventListener("mouseover", printTarget);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", down);

    document.onmouseup = () => {
      console.log("up");
      mouseDown = false;
      reloadAlgorithms();
      document.removeEventListener("mouseover", printTarget);
    };

    // return () => {
    //   document.removeEventListener("mouseover", printTarget);
    // };
  }, []);

  // __________________________________________________________

  // const [mouseDown, setMouseDown] = useState(true);

  // const handleDraw = useCallback(
  //   (event) => {
  //     if (event.key === "Escape") {
  //       setMouseDown(true);
  //     }
  //   },
  //   [setMouseDown]
  // );

  // useEffect(() => {
  //   if (!mouseDown) {
  //     window.removeEventListener("keyup", handleDraw);
  //   } else {
  //     window.addEventListener("keyup", handleDraw);
  //   }

  //   return () => window.removeEventListener("keyup", handleDraw);
  // }, [mouseDown, handleDraw]);

  // _________________________________________________________________

  let wallToggle = 0;

  const draw = (e) => {
    let id = e.target.id;

    let check1 = id.substring(6, 7);

    let x;
    let y;

    if (check1 === "-") {
      x = id.substring(5, 6);
      y = id.substring(7);
    } else if (/^\d+$/.test(check1)) {
      x = id.substring(5, 7);
      y = id.substring(8);
    }
    // console.log(x + "-" + y);
    // let X = id.substring(8, 10);

    if ((x == startX && y == startY) || (x == endX && y == endY)) {
      return;
    }

    // grid[y][x].isWall = true;
    grid[y][x].isWall = !grid[y][x].isWall;

    // setBoard(true);
    // console.log(document.getElementById(id).className);

    if (document.getElementById(id).className === "node ") {
      document.getElementById(id).className = "node node-wall";
    } else if (document.getElementById(id).className === "node node-wall") {
      document.getElementById(id).className = "node ";
    }

    // document.getElementById(id).style = "border: 1px solid rgb(53, 53, 53)";
  };

  const outputGrid = (
    <div>
      {Grid.map((column, columnIndex) => {
        return (
          <div key={columnIndex} className="rowWrap">
            {column.map((row, rowIndex) => {
              const { isStart, isEnd, isWall } = row;

              return (
                <Node
                  x={columnIndex}
                  y={rowIndex}
                  isStart={isStart}
                  isEnd={isEnd}
                  isWall={isWall}
                  key={rowIndex}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );

  const clearSearchSpace = () => {
    if (DijkstraNodes.length > 1) {
      let dijkstraSpace = document.getElementById(
        `node-${DijkstraNodes[1].x}-${DijkstraNodes[1].y}`
      ).className;
      if (
        dijkstraSpace === "node node-visited" ||
        dijkstraSpace === "node node-shortPath"
      ) {
        for (let k = 0; k < DijkstraNodes.length; k++) {
          if (!DijkstraNodes[k].isStart && !DijkstraNodes[k].isEnd) {
            document.getElementById(
              `node-${DijkstraNodes[k].x}-${DijkstraNodes[k].y}`
            ).className = "node ";
          }
        }
      }
    }

    let astarSpace = document.getElementById(
      `node-${AstarNodes[1].x}-${AstarNodes[1].y}`
    ).className;
    if (
      astarSpace === "node node-visited" ||
      astarSpace === "node node-shortPath"
    ) {
      for (let k = 0; k < AstarNodes.length; k++) {
        if (!AstarNodes[k].isStart && !AstarNodes[k].isEnd) {
          document.getElementById(
            `node-${AstarNodes[k].x}-${AstarNodes[k].y}`
          ).className = "node ";
        }
      }
    }
  };

  function drawDijkstraNodes() {
    // iterates through all visited nodes
    // let x = 0;

    clearSearchSpace();

    let i;
    for (i = 0; i < DijkstraNodes.length; i++) {
      const node = DijkstraNodes[i];
      setTimeout(() => {
        if (!node.isStart && !node.isEnd) {
          document.getElementById(`node-${node.x}-${node.y}`).className =
            "node node-visited";
          // document.getElementById(`node-${node.x}-${node.y}`).style =
          //   "border: 1px solid white";
          // console.log(node);
        }
      }, i * 2);
      // x++;
    }
    setTimeout(() => drawDijkstraPath(), i * 2);
  }

  function drawDijkstraPath() {
    for (let i = 0; i < DijkstraPath.length; i++) {
      const node = DijkstraPath[i];
      setTimeout(() => {
        if (!node.isStart && !node.isEnd) {
          document.getElementById(`node-${node.x}-${node.y}`).className =
            "node node-shortPath";
          // document.getElementById(`node-${node.x}-${node.y}`).style =
          //   "border: 1px solid rgb(255, 208, 0)";
        }
      }, i * 18);
    }
  }

  function drawAstarNodes() {
    // iterates through all visited nodes
    // let x = 0;

    clearSearchSpace();

    let i;
    for (i = 0; i < AstarNodes.length; i++) {
      const node = AstarNodes[i];
      setTimeout(() => {
        if (!node.isStart && !node.isEnd) {
          document.getElementById(`node-${node.x}-${node.y}`).className =
            "node node-visited";
          // console.log(node);
        }
      }, i * 5);
      // x++;
    }
    setTimeout(() => drawAstarPath(), i * 5);
  }

  function drawAstarPath() {
    for (let i = 0; i < AstarPath.length; i++) {
      const node = AstarPath[i];
      setTimeout(() => {
        if (!node.isStart && !node.isEnd) {
          document.getElementById(`node-${node.x}-${node.y}`).className =
            "node node-shortPath";
        }
      }, i * 18);
    }
  }

  // function resetBoard() {

  // }

  return (
    <div className="pathfinder">
      <div className="centerGrid">
        <button id="visualize-Btn" onClick={drawDijkstraNodes}>
          Dijkstra
        </button>
        <button id="visualize-Btn" onClick={drawAstarNodes}>
          Astar
        </button>
        <button id="visualize-Btn" onClick={drawAstarNodes}>
          Depth
        </button>
        <button id="reset-Btn" onClick={() => window.location.reload(false)}>
          Reset
        </button>
        <div id="grid">{outputGrid}</div>
      </div>
    </div>
  );
};

export default Pathfind;
