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

    if (fields["radiators"] === undefined || fields["pumps"] === undefined) {
      valid = false;
    }

    if (fields["radiators"] === 1 && fields["radiatorsSize"] === "") {
      valid = false;
    }

    if (fields["pumps"] === 1 && fields["pumpsSize"] === "") {
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
                    (questionsContainer.state.heating.radiators === undefined &&
                    this.state.allFields === false
                      ? " o-invalid"
                      : "")
                  }
                >
                  <div className="o-question-label">
                    Har du en eller flere elradiatorer i dit hjem?
                  </div>
                  <div className="o-radio-container">
                    <label className="o-radio">
                      Ja
                      <input
                        type="radio"
                        name="radio"
                        checked={
                          questionsContainer.state.heating.radiators === 1
                        }
                        onChange={() =>
                          questionsContainer.updateRadio(
                            "heating",
                            "radiators",
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
                          questionsContainer.state.heating.radiators === 0
                        }
                        onChange={() =>
                          questionsContainer.updateRadio(
                            "heating",
                            "radiators",
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
                    (questionsContainer.state.heating.radiatorsSize === "" &&
                    this.state.allFields === false
                      ? " o-invalid"
                      : "") +
                    (questionsContainer.state.heating.radiators === 1
                      ? ""
                      : " o-contracted")
                  }
                >
                  <div className="o-question-label">
                    Hvor mange m<sup>2</sup> opvarmer de?
                  </div>
                  <div className="o-input-container">
                    <input
                      className="o-input"
                      type="text"
                      placeholder=""
                      value={questionsContainer.state.heating.radiatorsSize}
                      onChange={e => {
                        questionsContainer.updateNumber(
                          "heating",
                          "radiatorsSize",
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
                    (questionsContainer.state.heating.pumps === undefined &&
                    this.state.allFields === false
                      ? " o-invalid"
                      : "")
                  }
                >
                  <div className="o-question-label">
                    Har du en eller flere varmepumper i dit hjem?
                  </div>
                  <div className="o-radio-container">
                    <label className="o-radio">
                      Ja
                      <input
                        type="radio"
                        name="radio2"
                        checked={questionsContainer.state.heating.pumps === 1}
                        onChange={() =>
                          questionsContainer.updateRadio("heating", "pumps", 1)
                        }
                      />
                      <span className="checkmark" />
                    </label>
                    <label className="o-radio">
                      Nej
                      <input
                        type="radio"
                        name="radio2"
                        checked={questionsContainer.state.heating.pumps === 0}
                        onChange={() =>
                          questionsContainer.updateRadio("heating", "pumps", 0)
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
                    (questionsContainer.state.heating.pumpsSize === "" &&
                    this.state.allFields === false
                      ? " o-invalid"
                      : "") +
                    (questionsContainer.state.heating.pumps === 1
                      ? ""
                      : " o-contracted")
                  }
                >
                  <div className="o-question-label">
                    Hvor mange m<sup>2</sup> opvarmer de?
                  </div>
                  <div className="o-input-container">
                    <input
                      className="o-input"
                      type="text"
                      placeholder=""
                      value={questionsContainer.state.heating.pumpsSize}
                      onChange={e => {
                        questionsContainer.updateNumber(
                          "heating",
                          "pumpsSize",
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
