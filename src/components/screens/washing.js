import React, { Component } from "react";
import ProcessBar from "./../common/processbar";
import { Subscribe } from "unstated";
import QuestionsContainer from "../../unstated/questionsContainer";
import NavigationContainer from "../../unstated/navigationContainer";

class Washing extends Component {
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
          <div id="o-washing" className="o-bg-shadow">
            <div className="o-leftside-img" />
            <div className="o-rightside-content">
              <ProcessBar currentPage="washing" />
              <div className="o-content-container">
                {/* QUESTION */}
                <div
                  className={
                    "o-question-row" +
                    (questionsContainer.state.washing.washingmachine ===
                      undefined && this.state.allFields === false
                      ? " o-invalid"
                      : "")
                  }
                >
                  <div className="o-question-label">
                    Har du en vaskemaskine?
                  </div>
                  <div className="o-radio-container">
                    <label className="o-radio">
                      Ja
                      <input
                        type="radio"
                        name="radio"
                        checked={
                          questionsContainer.state.washing.washingmachine === 1
                        }
                        onChange={() =>
                          questionsContainer.updateRadio(
                            "washing",
                            "washingmachine",
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
                          questionsContainer.state.washing.washingmachine === 0
                        }
                        onChange={() =>
                          questionsContainer.updateRadio(
                            "washing",
                            "washingmachine",
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
                    (questionsContainer.state.washing
                      .washingmachineFrequence === "" &&
                    this.state.allFields === false
                      ? " o-invalid"
                      : "")
                  }
                >
                  <div className="o-question-label">
                    Hvor ofte vasker du om ugen?
                  </div>
                  <div className="o-input-container">
                    <input
                      className="o-input"
                      type="text"
                      placeholder="Hvor ofte vasker du?"
                      value={
                        questionsContainer.state.washing.washingmachineFrequence
                      }
                      onChange={e => {
                        questionsContainer.updateNumber(
                          "washing",
                          "washingmachineFrequence",
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
                        questionsContainer.state.washing
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

export default Washing;