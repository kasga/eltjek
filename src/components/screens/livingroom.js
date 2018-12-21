import React, { Component } from "react";
import ProcessBar from "./../common/processbar";
import { Subscribe } from "unstated";
import QuestionsContainer from "../../unstated/questionsContainer";
import NavigationContainer from "../../unstated/navigationContainer";

class Livingroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allFields: true
    };
  }

  validateFields = fields => {
    let valid = true;
    Object.keys(fields).map((key, index) => {
      if (fields[key] === undefined || fields[key] === "") {
        return (valid = false);
      }
      return true;
    });
    return valid;
  };

  render() {
    return (
      <Subscribe to={[QuestionsContainer, NavigationContainer]}>
        {(questionsContainer, navigationContainer) => (
          <div id="o-livingroom" className="o-bg-shadow">
            <div className="o-leftside-img" />
            <div className="o-rightside-content">
              <ProcessBar currentPage="livingroom" />
              <div className="o-content-container">
                {/* QUESTION */}
                <div
                  className={
                    "o-question-row" +
                    (questionsContainer.state.livingroom.tv === "" &&
                    this.state.allFields === false
                      ? " o-invalid"
                      : "")
                  }
                >
                  <div className="o-question-label">
                    Hvor mange fjernsyn har du?
                  </div>
                  <div className="o-input-container">
                    <input
                      className="o-input"
                      type="text"
                      placeholder="Antal fjernsyn"
                      value={questionsContainer.state.livingroom.tv}
                      onChange={e => {
                        questionsContainer.updateNumber(
                          "livingroom",
                          "tv",
                          e.target.value
                        );
                      }}
                    />
                  </div>
                </div>

                {/* QUESTION */}
                <div
                  className={
                    "o-question-row" +
                    (questionsContainer.state.livingroom.tvBoxes === "" &&
                    this.state.allFields === false
                      ? " o-invalid"
                      : "")
                  }
                >
                  <div className="o-question-label">
                    Hvor mange TV-bokse har du?
                    <br />
                    <span className="o-question-label-info">
                      (Eksempelvis fra Yousee, TDC eller lignende)
                    </span>
                  </div>
                  <div className="o-input-container">
                    <input
                      className="o-input"
                      type="text"
                      placeholder="Antal TV-bokse"
                      value={questionsContainer.state.livingroom.tvBoxes}
                      onChange={e => {
                        questionsContainer.updateNumber(
                          "livingroom",
                          "tvBoxes",
                          e.target.value
                        );
                      }}
                    />
                  </div>
                </div>

                {/* QUESTION */}
                <div
                  className={
                    "o-question-row" +
                    (questionsContainer.state.livingroom.computers === "" &&
                    this.state.allFields === false
                      ? " o-invalid"
                      : "")
                  }
                >
                  <div className="o-question-label">
                    Hvor mange stationære computere har du?
                  </div>
                  <div className="o-input-container">
                    <input
                      className="o-input"
                      type="text"
                      placeholder="Antal computere"
                      value={questionsContainer.state.livingroom.computers}
                      onChange={e => {
                        questionsContainer.updateNumber(
                          "livingroom",
                          "computers",
                          e.target.value
                        );
                      }}
                    />
                  </div>
                </div>

                {/* QUESTION */}
                <div
                  className={
                    "o-question-row" +
                    (questionsContainer.state.livingroom.consols === "" &&
                    this.state.allFields === false
                      ? " o-invalid"
                      : "")
                  }
                >
                  <div className="o-question-label">
                    Hvor mange spillekonsoller har du?
                  </div>
                  <div className="o-input-container">
                    <input
                      className="o-input"
                      type="text"
                      placeholder="Antal spillekonsoller"
                      value={questionsContainer.state.livingroom.consols}
                      onChange={e => {
                        questionsContainer.updateNumber(
                          "livingroom",
                          "consols",
                          e.target.value
                        );
                      }}
                    />
                  </div>
                </div>

                {/* QUESTION */}
                <div
                  className={
                    "o-question-row" +
                    (questionsContainer.state.livingroom.lamps === "" &&
                    this.state.allFields === false
                      ? " o-invalid"
                      : "")
                  }
                >
                  <div className="o-question-label">
                    Hvor mange lamper har du i hele dit hjem
                  </div>
                  <div className="o-input-container">
                    <input
                      className="o-input"
                      type="text"
                      placeholder="Antal spillekonsoller"
                      value={questionsContainer.state.livingroom.lamps}
                      onChange={e => {
                        questionsContainer.updateNumber(
                          "livingroom",
                          "lamps",
                          e.target.value
                        );
                      }}
                    />
                  </div>
                </div>

                {/* Bottom navigation */}
                <div className="o-bottom-nav">
                  <div
                    className="o-btn o-mt40 o-back"
                    onClick={() => {
                      let prevPage = navigationContainer.getPrevPage();
                      this.props.history.push(prevPage);
                    }}
                  >
                    Tilbage
                  </div>
                  <div
                    className="o-btn o-blue o-mt40"
                    onClick={() => {
                      let isValid = this.validateFields(
                        questionsContainer.state.livingroom
                      );
                      if (isValid !== false) {
                        let nextPage = navigationContainer.getNextPage();
                        this.props.history.push(nextPage);
                      } else {
                        return this.setState({ allFields: false });
                      }
                    }}
                  >
                    Fortsæt
                  </div>
                </div>

                <div
                  className={
                    "o-validation-error" +
                    (this.state.allFields === false ? " fade-in" : "")
                  }
                >
                  Husk at svare på alle spørgsmål.
                </div>
              </div>
            </div>
          </div>
        )}
      </Subscribe>
    );
  }
}

export default Livingroom;
