import React, { Component } from "react";
import ProcessBar from "./../common/processbar";
import { Subscribe } from "unstated";
import QuestionsContainer from "../../unstated/questionsContainer";
import NavigationContainer from "../../unstated/navigationContainer";
import { isMobileOnly } from "react-device-detect";

class Livingroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allFields: true
    };
  }

  // validateFields = fields => {
  //   let valid = true;
  //   Object.keys(fields).map((key, index) => {
  //     if (fields[key] === undefined || fields[key] === "") {
  //       return (valid = false);
  //     }
  //     return true;
  //   });
  //   return valid;
  // };

  validateFields = fields => {
    let valid = true;
    Object.keys(fields).map((key, index) => {
      if (
        (fields[key] === undefined && fields["consols"] !== 0) ||
        (fields[key] === "" && fields["consols"] !== 0)
      ) {
        return (valid = false);
      }
      return (valid = true);
    });
    return valid;
  };

  render() {
    return (
      <Subscribe to={[QuestionsContainer, NavigationContainer]}>
        {(questionsContainer, navigationContainer) => (
          <div id="o-livingroom" className="o-bg-shadow">
            {questionsContainer.resetCalculator()}
            <div className="o-leftside-img" />
            <div className="o-rightside-content">
              <ProcessBar currentPage="livingroom" />
              <div className="o-content-container">
                {/* QUESTION */}
                <div
                  className={
                    "o-question-row" +
                    (questionsContainer.state.livingroom.tv === undefined &&
                    this.state.allFields === false
                      ? " o-invalid"
                      : "")
                  }
                >
                  <div className="o-question-label">
                    Hvor mange fjernsyn har du?
                  </div>
                  <div className="o-select-container">
                    <select
                      className="o-select"
                      value={
                        questionsContainer.state.livingroom.tv
                          ? questionsContainer.state.livingroom.tv
                          : "Vælg"
                      }
                      onChange={e => {
                        questionsContainer.updateSelecMenu(
                          "livingroom",
                          "tv",
                          e.target.value
                        );
                      }}
                    >
                      <option value="Vælg" disabled hidden>
                        Vælg
                      </option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                </div>

                {/* QUESTION */}
                <div
                  className={
                    "o-question-row" +
                    (questionsContainer.state.livingroom.tvBoxes ===
                      undefined && this.state.allFields === false
                      ? " o-invalid"
                      : "")
                  }
                >
                  <div className="o-question-label">
                    Hvor mange TV-bokse har du?
                    <br />
                    <span className="o-question-label-info">
                      (Apple TV og Google Chromecast tæller ikke som TV-bokse)
                    </span>
                  </div>
                  <div className="o-select-container">
                    <select
                      className="o-select"
                      value={
                        questionsContainer.state.livingroom.tvBoxes
                          ? questionsContainer.state.livingroom.tvBoxes
                          : "Vælg"
                      }
                      onChange={e => {
                        questionsContainer.updateSelecMenu(
                          "livingroom",
                          "tvBoxes",
                          e.target.value
                        );
                      }}
                    >
                      <option value="Vælg" disabled hidden>
                        Vælg
                      </option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                </div>

                {/* QUESTION */}
                <div
                  className={
                    "o-question-row" +
                    (questionsContainer.state.livingroom.computers ===
                      undefined && this.state.allFields === false
                      ? " o-invalid"
                      : "")
                  }
                >
                  <div className="o-question-label">
                    Hvor mange timer om dagen bruger du en computer?
                    <br />
                    <span className="o-question-label-info">
                      (Både stationære og bærbare computere tæller med)
                    </span>
                  </div>
                  <div className="o-select-container">
                    <select
                      className="o-select"
                      value={
                        questionsContainer.state.livingroom.computers
                          ? questionsContainer.state.livingroom.computers
                          : "Vælg"
                      }
                      onChange={e => {
                        questionsContainer.updateSelecMenu(
                          "livingroom",
                          "computers",
                          e.target.value
                        );
                      }}
                    >
                      <option value="Vælg" disabled hidden>
                        Vælg
                      </option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
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
                    Har du en spillekonsol?
                  </div>

                  <div className="o-radio-container">
                    <label className="o-radio">
                      Ja
                      <input
                        type="radio"
                        name="radio"
                        checked={
                          questionsContainer.state.livingroom.consols === 1
                        }
                        onChange={() =>
                          questionsContainer.updateRadio(
                            "livingroom",
                            "consols",
                            1
                          )
                        }
                      />
                      <span className="checkmark" />
                    </label>
                    <label className="o-radio">
                      Nej
                      <input
                        type="radio"
                        name="radio"
                        checked={
                          questionsContainer.state.livingroom.consols === 0
                        }
                        onChange={() =>
                          questionsContainer.updateRadio(
                            "livingroom",
                            "consols",
                            0
                          )
                        }
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                </div>

                {/* QUESTION */}
                <div
                  className={
                    "o-question-row" +
                    (questionsContainer.state.livingroom.consolsFrequence ===
                      "" && this.state.allFields === false
                      ? " o-invalid"
                      : "") +
                    (questionsContainer.state.livingroom.consols === 1
                      ? ""
                      : " o-contracted")
                  }
                >
                  <div className="o-question-label">
                    Hvor mange timer om dagen spiller du?
                  </div>
                  <div className="o-input-container">
                    <input
                      className="o-input"
                      type="text"
                      placeholder="Timer om dagen"
                      value={
                        questionsContainer.state.livingroom.consolsFrequence
                      }
                      onChange={e => {
                        questionsContainer.updateNumber(
                          "livingroom",
                          "consolsFrequence",
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
                    Hvor mange pærer og spots har du i dit hjem – både inde og
                    ude?
                    <br />
                    <span className="o-question-label-info">
                      (En gennemsnitsfamilie har ca. 27 pærer/spots)
                    </span>
                  </div>
                  <div className="o-input-container">
                    <input
                      className="o-input"
                      type="text"
                      placeholder="Antal lamper"
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
                    {isMobileOnly ? "Fortsæt" : "Nu skal der vaskes"}
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
