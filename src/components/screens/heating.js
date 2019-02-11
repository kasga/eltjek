import React, { Component } from "react";
import ProcessBar from "./../common/processbar";
import { Subscribe } from "unstated";
import QuestionsContainer from "../../unstated/questionsContainer";
import NavigationContainer from "../../unstated/navigationContainer";
import { isMobileOnly } from "react-device-detect";

class Heating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allFields: true
    };
  }

  validateFields = fields => {
    let valid = true;

    if (fields["floor"] === undefined || fields["electric"] === undefined) {
      valid = false;
    }

    if (fields["floor"] === 1 && fields["floorUsageFrequence"] === "") {
      valid = false;
    }

    if (fields["electric"] === 1 && fields["electricUsageFrequence"] === "") {
      valid = false;
    }

    return valid;
  };

  render() {
    return (
      <Subscribe to={[QuestionsContainer, NavigationContainer]}>
        {(questionsContainer, navigationContainer) => (
          <div id="o-heating" className="o-bg-shadow">
            {questionsContainer.resetCalculator()}
            <div className="o-leftside-img" />
            <div className="o-rightside-content">
              <ProcessBar currentPage="heating" />
              <div className="o-content-container">
                {/* QUESTION */}
                <div
                  className={
                    "o-question-row" +
                    (questionsContainer.state.heating.floor === undefined &&
                    this.state.allFields === false
                      ? " o-invalid"
                      : "")
                  }
                >
                  <div className="o-question-label">
                    Har du gulvvarme i et eller flere rum i dit hjem?
                  </div>
                  <div className="o-radio-container">
                    <label className="o-radio">
                      Ja
                      <input
                        type="radio"
                        name="radio"
                        checked={questionsContainer.state.heating.floor === 1}
                        onChange={() =>
                          questionsContainer.updateRadio("heating", "floor", 1)
                        }
                      />
                      <span className="checkmark" />
                    </label>
                    <label className="o-radio">
                      Nej
                      <input
                        type="radio"
                        name="radio"
                        checked={questionsContainer.state.heating.floor === 0}
                        onChange={() =>
                          questionsContainer.updateRadio("heating", "floor", 0)
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
                    (questionsContainer.state.heating.floorSize === "" &&
                    this.state.allFields === false
                      ? " o-invalid"
                      : "") +
                    (questionsContainer.state.heating.floor === 1
                      ? ""
                      : " o-contracted")
                  }
                >
                  <div className="o-question-label">
                    Hvor mange m<sup>2</sup> gulvvarme har du i dit hjem?
                  </div>
                  <div className="o-input-container">
                    <input
                      className="o-input"
                      type="text"
                      placeholder=""
                      value={questionsContainer.state.heating.floorSize}
                      onChange={e => {
                        questionsContainer.updateNumber(
                          "heating",
                          "floorSize",
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
                    (questionsContainer.state.heating.floorUsageFrequence ===
                      "" && this.state.allFields === false
                      ? " o-invalid"
                      : "") +
                    (questionsContainer.state.heating.floor === 1
                      ? ""
                      : " o-contracted")
                  }
                >
                  <div className="o-question-label">
                    Hvor mange måneder om året er din gulvvarme tændt?
                  </div>
                  <div className="o-input-container">
                    <input
                      className="o-input"
                      type="text"
                      placeholder=""
                      value={
                        questionsContainer.state.heating.floorUsageFrequence
                      }
                      onChange={e => {
                        questionsContainer.updateNumber(
                          "heating",
                          "floorUsageFrequence",
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
                    (questionsContainer.state.heating.electric === undefined &&
                    this.state.allFields === false
                      ? " o-invalid"
                      : "")
                  }
                >
                  <div className="o-question-label">Har du elvarme?</div>
                  <div className="o-radio-container">
                    <label className="o-radio">
                      Ja
                      <input
                        type="radio"
                        name="radio2"
                        checked={
                          questionsContainer.state.heating.electric === 1
                        }
                        onChange={() =>
                          questionsContainer.updateRadio(
                            "heating",
                            "electric",
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
                        name="radio2"
                        checked={
                          questionsContainer.state.heating.electric === 0
                        }
                        onChange={() =>
                          questionsContainer.updateRadio(
                            "heating",
                            "electric",
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
                    (questionsContainer.state.heating.electricUsageFrequence ===
                      "" && this.state.allFields === false
                      ? " o-invalid"
                      : "") +
                    (questionsContainer.state.heating.electric === 1
                      ? ""
                      : " o-contracted")
                  }
                >
                  <div className="o-question-label">
                    Hvor mange måneder om året har du tændt for din elvarme?
                  </div>
                  <div className="o-input-container">
                    <input
                      className="o-input"
                      type="text"
                      placeholder=""
                      value={
                        questionsContainer.state.heating.electricUsageFrequence
                      }
                      onChange={e => {
                        questionsContainer.updateNumber(
                          "heating",
                          "electricUsageFrequence",
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
                        questionsContainer.state.heating
                      );
                      if (isValid !== false) {
                        let nextPage = navigationContainer.getNextPage();
                        this.props.history.push(nextPage);
                      } else {
                        return this.setState({ allFields: false });
                      }
                    }}
                  >
                    {isMobileOnly ? "Fortsæt" : "Så er dit resultat klar"}
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

export default Heating;
