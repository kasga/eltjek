import React, { Component } from "react";
import imgKitchen from "./../../images/kitchen.svg";
import imgLivingroom from "./../../images/livingroom.svg";
import imgWashing from "./../../images/washing.svg";
import imgFloor from "./../../images/floor.svg";

class Tip extends Component {
  constructor(props) {
    super();

    this.state = {
      //title: props.title,
      body: props.body,
      icon: props.icon
    };
  }

  handleImage(img) {
    let image;
    if (img === "imgKitchen") image = imgKitchen;
    else if (img === "imgLivingroom") image = imgLivingroom;
    else if (img === "imgWashing") image = imgWashing;
    else if (img === "imgFloor") image = imgFloor;

    return image;
  }

  render() {
    return (
      <div className="o-tip">
        <img
          src={this.handleImage(this.state.icon)}
          alt="Ikon"
          className="o-tip-img"
          height="60"
        />
        <div className="o-tip-title" />
        {/* <div className="o-tip-title">{this.state.title}</div> */}
        <div className="o-tip-body">{this.state.body}</div>
      </div>
    );
  }
}

export default Tip;
