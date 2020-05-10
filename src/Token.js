import React, { Component } from "react";
import styled from "styled-components";
import { proxy } from "./utils";

const Chip = styled.div`
  height: 10vh;
  width: 10vh;
  border: 2px solid black;
  text-align: center;
  padding-top: 3vh;
  padding-bottom: 3vh;
  border-radius: 5vh;
  position: absolute;
  box-sizing: border-box;
  z-index: 10;
`;

class Token extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: { x: 50, y: 50 },
      winX: 1920,
      winY: 1080,
      isFetchPaused: false,
    };
  }
  componentDidMount = () => {
    this.updateRemoteLocation();
    setInterval(this.fetchRemoteLocation, 1000);
    this.setState({ winX: window.innerWidth, winY: window.innerHeight });
  };

  dragToken = (e) => {
    const { winX, winY } = this.state;
    const newX = (e.clientX * 100) / winX;
    const newY = (e.clientY * 100) / winY;
    if (newY !== 0 && newX !== 0)
      this.setState({ pos: { x: newX, y: newY - 5 } });
  };
  fetchRemoteLocation = async () => {
    if (this.state.isFetchPaused) return null;
    const res = await fetch(proxy + `/location?id=${this.props.id}`);
    let bod = await res.text();
    bod = JSON.parse(bod);
    this.setState({ pos: bod });
  };
  updateRemoteLocation = async () => {
    let data = new FormData();
    data.append("position", JSON.stringify(this.state.pos));
    console.log(this.state.pos);
    data.append("id", this.props.id);
    const res = await fetch(proxy + "/set-location", {
      method: "POST",
      body: data,
    });
    let bod = await res.text();
  };
  render = () => {
    const { displayName, color, id } = this.props.userData;
    const { pos } = this.state;
    return (
      <Chip
        style={{
          backgroundColor: color,
          top: `${pos.y}vh`,
          left: `${pos.x}vw`,
        }}
        onDrag={(e) => {
          let count = 0;

          this.dragToken(e);
        }}
        onDragStart={(e) => {
          console.log("start drag");
          this.setState({ isFetchPaused: true });
        }}
        onDragEnd={() => {
          this.updateRemoteLocation();
        }}
      >
        {displayName}
      </Chip>
    );
  };
}

export default Token;
