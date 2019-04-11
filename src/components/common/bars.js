import React, { Component } from "react";

class Bars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      barContainerWidth: 0
    };
  }

  componentDidMount() {
    this.setState({ barContainerWidth: this.refs.barComp.offsetWidth });
  }

  calculateBarWidth(max, bar) {
    if (bar === 0) {
      return "0%";
    } else {
      return (100 * bar) / max + "%";
    }
  }

  render() {
    return (
      <div className="o-comparison-bar">
        <div className="o-comparison-bar-label">{this.props.label}</div>
        <div
          ref="barComp"
          className="o-comparison-bars-container"
          onMouseOver={() => this.setState({ show: !this.state.show })}
          onMouseOut={() =>
            this.setState({
              show: false
            })
          }
          onClick={() => this.setState({ show: true })}
        >
          <div
            className="o-comparison-bar-average"
            style={{
              width:
                this.props.animate === "true"
                  ? this.calculateBarWidth(this.props.max, this.props.average)
                  : 0
            }}
          />

          <div className="o-comparison-bar-lead" />
          <div
            className="o-comparison-bar-you"
            style={{
              width:
                this.props.animate === "true"
                  ? this.calculateBarWidth(this.props.max, this.props.you)
                  : 0
            }}
          />
          <div
            className={
              "o-comparison-tooltip-container" +
              (!this.state.show ? " o-hide" : "")
            }
          >
            <div className="o-comparison-tooltip">
              <div className="o-comparison-tooltip-you">
                {this.props.you} <span className="o-regular">kWh</span>
              </div>
              <div className="o-comparison-tooltip-average">
                {this.props.average} <span className="o-regular">kWh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Bars;
