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
          src={this.handleImage(this.props.icon)}
          alt="Ikon"
          className="o-tip-img"
          height="60"
        />
        <div
          className="o-tip-title"
          dangerouslySetInnerHTML={{ __html: this.props.body.title }}
        />
        <div
          className="o-tip-body"
          dangerouslySetInnerHTML={{ __html: this.props.body.body }}
        />
      </div>
    );
  }
}

export default Tip;
