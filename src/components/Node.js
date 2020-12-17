import React, { useState, useEffect } from "react";
import "./Node.css";

const Node = ({ x, y, isStart, isEnd, isWall }) => {
  const classes = isStart
    ? "node-start"
    : isEnd
    ? "node-end"
    : isWall
    ? "node-wall"
    : "";

  return <div className={`node ${classes}`} id={`node-${y}-${x}`}></div>;
};

export default Node;
