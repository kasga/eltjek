import React, { Component } from "react";
import { ReactComponent as ImgKitchen } from "./../../images/kitchen.svg";
import { ReactComponent as ImgLivingroom } from "./../../images/livingroom.svg";
import { ReactComponent as ImgWashing } from "./../../images/washing.svg";
import { ReactComponent as ImgFloor } from "./../../images/floor.svg";

class Tip extends Component {
  constructor(props) {
    super();

    this.state = {
      //title: props.title,
      body: props.body,
      icon: props.icon
    };
  }

  render() {
    return (
      <div className="o-tip">
        {this.props.icon === "imgKitchen" ? (
          <ImgKitchen className="o-tip-img" height="80" />
        ) : (
          ""
        )}

        {this.props.icon === "imgLivingroom" ? (
          <ImgLivingroom className="o-tip-img o-xtra-margin" height="60" />
        ) : (
          ""
        )}

        {this.props.icon === "imgWashing" ? (
          <ImgWashing className="o-tip-img o-xtra-margin" height="60" />
        ) : (
          ""
        )}

        {this.props.icon === "imgFloor" ? (
          <ImgFloor className="o-tip-img o-xtra-margin" height="60" />
        ) : (
          ""
        )}

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
