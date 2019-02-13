import React, { Component } from "react";
import { Subscribe } from "unstated";
import QuestionsContainer from "../../unstated/questionsContainer";
import NavigationContainer from "../../unstated/navigationContainer";
import "./../../scss/index.scss";

class Home extends Component {
  render() {
    return (
      <Subscribe to={[QuestionsContainer, NavigationContainer]}>
        {(questionsContainer, navigationContainer) => (
          <div id="o-home" className="o-bg-shadow">
            {questionsContainer.resetCalculator()}
            <div className="o-eltjek">
              <div className="o-eltjek-circle">
                <img
                  src="https://orsted.dk/-/media/WWW/Assets/DCS/projects/el-tjek/static/media/checkf4464260"
                  alt=""
                />
              </div>
              Tjek dit elforbrug
            </div>

            <h1>
              <p className="o-headline1">Bor du i hus eller lejlighed?</p>
            </h1>
            <div className="o-house-options">
              <div className="o-house-option">
                <div
                  className="o-house-container"
                  onClick={() => {
                    questionsContainer.updateHousingType("hus");
                    let p = navigationContainer.getNextPage("hus");
                    this.props.history.push(p);
                  }}
                >
                  <img
                    src="https://orsted.dk/-/media/WWW/Assets/DCS/projects/el-tjek/static/media/sun"
                    alt=""
                    className="o-sun"
                  />
                  <img
                    src="https://orsted.dk/-/media/WWW/Assets/DCS/projects/el-tjek/static/media/sun"
                    alt=""
                    className="o-sun"
                  />
                  <img
                    src="https://orsted.dk/-/media/WWW/Assets/DCS/projects/el-tjek/static/media/house8dcf1316"
                    alt=""
                    className="o-house"
                  />
                </div>
                <br />
                <div
                  className="o-btn o-blue"
                  onClick={() => {
                    questionsContainer.updateHousingType("hus");
                    let p = navigationContainer.getNextPage("hus");
                    this.props.history.push(p);
                  }}
                >
                  Hus
                </div>
              </div>
              <div className="o-house-option">
                <div
                  className="o-house-container"
                  onClick={() => {
                    questionsContainer.updateHousingType("lejlighed");
                    let p = navigationContainer.getNextPage("lejlighed");
                    this.props.history.push(p);
                  }}
                >
                  <img
                    src="https://orsted.dk/-/media/WWW/Assets/DCS/projects/el-tjek/static/media/cloud1"
                    alt=""
                    className="cloud1"
                  />
                  <img
                    src="https://orsted.dk/-/media/WWW/Assets/DCS/projects/el-tjek/static/media/cloud2"
                    alt=""
                    className="cloud2"
                  />
                  <img
                    src="https://orsted.dk/-/media/WWW/Assets/DCS/projects/el-tjek/static/media/appartmente9db8efb"
                    alt=""
                    className="o-building"
                  />
                </div>
                <br />
                <div
                  className="o-btn o-blue"
                  onClick={() => {
                    questionsContainer.updateHousingType("lejlighed");
                    let p = navigationContainer.getNextPage("lejlighed");
                    this.props.history.push(p);
                  }}
                >
                  Lejlighed
                </div>
              </div>
            </div>
          </div>
        )}
      </Subscribe>
    );
  }
}

export default Home;
