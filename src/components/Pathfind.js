import React, { useState, useEffect } from "react";
import DepthFirst from "../algorithms/DepthFirst";
import Dijkstra from "../algorithms/Dijkstra";
import Astar from "../algorithms/Astar";
import Node from "./Node";
import "./Pathfind.css";
import { render } from "react-dom";
import Knobster from "./Knobster";
// import { Knob } from "react-rotary-knob";
// import * as skins from "react-rotary-knob-skin-pack";
// import { Knob, Arc, Pointer, Value } from "rc-knob";

// const X = 160;
// const Y = 100;

// const X = 100;
// const Y = 50;

const X = 70; // columns
const Y = 37; // rows

const startX = 3;
const startY = Math.floor(Math.floor(Y) / 2);
const endX = Math.floor(X) - 8;
const endY = Math.floor(Y / 2);

// const startX = Math.floor(X / 5);
// const startY = Math.floor(Y / 2);
// const endX = Math.floor((X * 4) / 5);
// const endY = Math.floor(Y / 2);

const Pathfind = () => {
  const [Grid, setGrid] = useState([]);
  var [grid, setG] = useState([]);

  const [dijkstra, setDijkstra] = useState([]);
  const [astar, setAstar] = useState([]);
  const [depthFirst, setDepthFirst] = useState([]);

  const [DijkstraNodes, setDijkstraNodes] = useState([]);
  const [DijkstraPath, setDijkstraPath] = useState([]);

  const [AstarNodes, setAstarNodes] = useState([]);
  const [AstarPath, setAstarPath] = useState([]);

  const [DepthNodes, setDepthNodes] = useState([]);

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
    const depthFirst1 = DepthFirst(startNode, endNode, grid, Y, X);

    setDijkstraNodes(dijkstra1.visitedNodes);
    setDijkstraPath(dijkstra1.shortestPath);

    setAstarNodes(astar1.visitedNodes);
    setAstarPath(astar1.shortestPath);

    setDepthNodes(depthFirst1.visitedNodes);

    setDijkstra(dijkstra1);
    setAstar(astar1);
    setDepthFirst(depthFirst1);
  };

  function reloadAlgorithms(start, end) {
    if (startNode === undefined) {
      startNode = start;
      endNode = end;
    }
    const dijkstraX = Dijkstra(startNode, endNode, grid, Y, X);
    const astarX = Astar(startNode, endNode, grid, Y, X);
    const depthSearchX = DepthFirst(startNode, endNode, grid, Y, X);

    setDijkstraNodes(dijkstraX.visitedNodes);
    setDijkstraPath(dijkstraX.shortestPath);

    setAstarNodes(astarX.visitedNodes);
    setAstarPath(astarX.shortestPath);

    setDepthNodes(depthSearchX.visitedNodes);
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
    if (Math.random(1) < 0.3) {
      this.isWall = true;
    }
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
    // console.log("down");
    mouseDown = true;
    printTarget(e);

    console.log(val);
    if (mouseDown) {
      document.addEventListener("mouseover", printTarget);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", down);

    document.onmouseup = (e) => {
      // console.log("up");
      mouseDown = false;
      console.log(val);
      if (e.target.id.substring(0, 4) === "node") {
        reloadAlgorithms();
      }
      document.removeEventListener("mouseover", printTarget);
    };

    // return () => {
    //   document.removeEventListener("mouseover", printTarget);
    // };
  }, []);

  // _________________________________________________________________

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

    if ((x == startX && y == startY) || (x == endX && y == endY)) {
      return;
    }

    grid[y][x].isWall = !grid[y][x].isWall;

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

  const clearObstacles = (manual) => {
    for (let x = 0; x < X; x++) {
      for (let y = 0; y < Y; y++) {
        if (!grid[y][x].isStart && !grid[y][x].isEnd) {
          grid[y][x].isWall = false;
          document.getElementById(`node-${x}-${y}`).className = "node ";
        }
      }
    }
    if (manual === true) {
      reloadAlgorithms(grid[startY][startX], grid[endY][endX]);
    }
  };

  const randomization = () => {
    for (let x = 0; x < X; x++) {
      for (let y = 0; y < Y; y++) {
        if (!grid[y][x].isStart && !grid[y][x].isEnd) {
          if (Math.random(1) < 0.3) {
            grid[y][x].isWall = true;
            document.getElementById(`node-${x}-${y}`).className =
              "node node-wall";
          }
        }
      }
    }
  };

  const randomizeObstacles = () => {
    clearObstacles();
    randomization();
    reloadAlgorithms(grid[startY][startX], grid[endY][endX]);
  };

  const clearSearchSpace = () => {
    for (let x = 0; x < X; x++) {
      for (let y = 0; y < Y; y++) {
        if (!Grid[y][x].isStart && !Grid[y][x].isEnd && !Grid[y][x].isWall) {
          document.getElementById(`node-${x}-${y}`).className = "node ";
        }
      }
    }
  };

  const drawDijkstraNodes = () => {
    // iterates through all visited nodes
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
        }
      }, i * 1.5);
    }
    setTimeout(() => drawDijkstraPath(), i * 1.5);
  };

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
      }, i * 10);
    }
  }

  function drawAstarNodes() {
    // iterates through all visited nodes
    clearSearchSpace();

    let i;
    for (i = 0; i < AstarNodes.length; i++) {
      const node = AstarNodes[i];
      setTimeout(() => {
        if (!node.isStart && !node.isEnd) {
          document.getElementById(`node-${node.x}-${node.y}`).className =
            "node node-visited";
        }
      }, i * 1.5);
    }
    setTimeout(() => drawAstarPath(), i * 1.5);
  }

  function drawAstarPath() {
    for (let i = 0; i < AstarPath.length; i++) {
      const node = AstarPath[i];
      setTimeout(() => {
        if (!node.isStart && !node.isEnd) {
          document.getElementById(`node-${node.x}-${node.y}`).className =
            "node node-shortPath";
        }
      }, i * 10);
    }
  }

  function drawDepthNodes() {
    // iterates through all visited nodes

    clearSearchSpace();

    let i;
    for (i = 0; i < DepthNodes.length; i++) {
      const node = DepthNodes[i];
      setTimeout(() => {
        if (!node.isStart && !node.isEnd) {
          document.getElementById(`node-${node.x}-${node.y}`).className =
            "node node-visited";
          // document.getElementById(`node-${node.x}-${node.y}`).style =
          //   "border: 1px solid white";
        }
      }, i * 5);
    }
    setTimeout(() => drawDepthPath(), i * 5);
  }

  function drawDepthPath() {
    for (let i = 0; i < DepthNodes.length; i++) {
      const node = DepthNodes[i];
      setTimeout(() => {
        if (!node.isStart && !node.isEnd) {
          document.getElementById(`node-${node.x}-${node.y}`).className =
            "node node-shortPath";
        }
      }, i * 5);
    }
  }

  // function resetBoard() {

  // }

  const [val, setVal] = useState(60);

  const handleSpeed = (e) => {
    setVal(e.target.value);
    // console.log(value / 10);
  };

  return (
    <div className="pathfinder">
      <div className="centerGrid">
        <div className="app-body">
          {/* <h1>Pathfinder</h1> */}
          {/* <select name="" id="select-Preset">
          <option value="random">Random</option>
        </select> */}
          <button id="randomize-Btn" onClick={randomizeObstacles}>
            Randomize
          </button>
          <button id="visualize-Btn" onClick={drawDijkstraNodes}>
            Dijkstra
          </button>
          <button id="visualize-Btn" onClick={drawAstarNodes}>
            Astar
          </button>
          <button id="visualize-Btn" onClick={drawDepthNodes}>
            Depth-First
          </button>
          <button id="clear-Btn" onClick={() => clearObstacles(true)}>
            Clear
          </button>
          <button id="reset-Btn" onClick={clearSearchSpace}>
            Reset
          </button>
        </div>
        {/* <Knobster /> */}
        {/* <Knobster /> */}
        <div id="grid">{outputGrid}</div>
        {/* <DepthFirst /> */}
      </div>
    </div>
  );
};

export default Pathfind;
