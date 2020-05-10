import React from "react";
import Token from "./Token";
import styled from "styled-components";
import { generateId } from "./utils";

const MapImg = styled.img`
  width: 100vw;
  height: 100vh;
  z-index: 1;
  position: absolute;
`;

const Map = () => {
  const users = [
    { displayName: "lumberjack", color: "blue" },
    { displayName: "lumberjack", color: "blue" },
    { displayName: "lumberjack", color: "blue" },
    { displayName: "bear", color: "brown" },
  ];
  return (
    <div>
      <MapImg src="/woodsCabin.png" />
      {users.map((userData, i) => {
        return <Token userData={userData} id={i} />;
      })}
    </div>
  );
};

export default Map;
