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

  calculateYourBarWidth(you, average) {
    if (you === 0) {
      return "5%";
    } else if (you > average) {
      return "100%";
    } else {
      return (you / average) * 100 + "%";
    }
  }

  calculateAverageBarWidth(you, average) {
    if (you === 0) {
      return "5%";
    } else if (average > you) {
      return "100%";
    } else {
      return (average / you) * 100 + "%";
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
          onClick={() => this.setState({ show: !this.state.show })}
        >
          <div
            className="o-comparison-bar-average"
            style={{
              width: this.calculateAverageBarWidth(
                this.props.you,
                this.props.average
              )
            }}
          />

          <div
            className="o-comparison-bar-you"
            style={{
              width: this.calculateYourBarWidth(
                this.props.you,
                this.props.average
              )
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
