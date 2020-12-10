import React, { useState, useEffect } from "react";
import "./Node.css";

const Node = ({ x, y, isStart, isEnd, isWall }) => {
  const [wall, setWall] = useState(isWall);
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseEnter, setMouseEnter] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  // node = document.getElementById(`node-${y}-${x}`);

  // useEffect(() => {
  //   changeWall();
  // }, [mouseDown, mouseEnter]);

  // document.getElementById("grid").onmousedown = () => {
  //   setIsDrawing(true);
  //   console.log("down");
  // };

  // document.getElementById("grid").onmouseup = () => {
  //   setIsDrawing(false);
  //   console.log("up");
  // };

  const startDrawing = () => {
    setIsDrawing(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    let id = nativeEvent.target.id;
    console.log(id);

    if (id === null) {
      return;
    }
    console.log(id.substring(5, 7));
    console.log(id.substring(8, 10));

    let Y = id.substring(5, 7);
    let X = id.substring(8, 10);

    document.getElementById("grid").onmousedown = () => {
      // console.log(nativeEvent.target.id);
      document.getElementById(`node-${Y}-${X}`).className = "node node-wall";
    };
  };

  const changeWall = () => {
    setWall(!wall);
    console.log("paint");
  };

  //______________________________________________________________

  // const mouseEntering = () => {
  //   setMouseEnter(true);
  //   // changeWall();
  // };

  //____________________________________________________________

  const classes = isStart
    ? "node-start"
    : isEnd
    ? "node-end"
    : wall
    ? "node-wall"
    : "";

  return (
    <div
      className={`node ${classes}`}
      id={`node-${y}-${x}`}
      // onMouseEnter={draw}
    ></div>
  );
};

export default Node;
