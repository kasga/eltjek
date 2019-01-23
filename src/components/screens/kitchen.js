import React, { Component } from "react";
import ProcessBar from "./../common/processbar";
import { Subscribe } from "unstated";
import QuestionsContainer from "../../unstated/questionsContainer";
import NavigationContainer from "../../unstated/navigationContainer";

class Kitchen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allFields: true
    };
  }

  validateFields = fields => {
    let valid = true;
    Object.keys(fields).map((key, index) => {
      console.log(fields["dishwasher"]);
      if (
        (fields[key] === undefined && fields["dishwasher"] !== 0) ||
        (fields[key] === "" && fields["dishwasher"] !== 0)
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
          <div id="o-kitchen" className="o-bg-shadow">
            <div className="o-leftside-img" />
            <div className="o-rightside-content">
              <ProcessBar currentPage="kitchen" />

              <div className="o-content-container">
                {/* QUESTION */}
                <div
                  className={
                    "o-question-row" +
                    (questionsContainer.state.kitchen.stove === undefined &&
                    this.state.allFields === false
                      ? " o-invalid"
                      : "")
                  }
                >
                  <div className="o-question-label">
                    Hvilken type komfur har du?
                  </div>
                  <div className="o-select-container">
                    <select
                      className="o-select"
                      value={
                        questionsContainer.state.kitchen.stove
                          ? questionsContainer.state.kitchen.stove
                          : "Vælg"
                      }
                      onChange={e => {
                        questionsContainer.updateSelecMenu(
                          "kitchen",
                          "stove",
                          e.target.value
                        );
                      }}
                    >
                      <option value="Vælg" disabled hidden>
                        Vælg
                      </option>
                      <option value="ceramic">Keramisk komfur</option>
                      <option value="induction">Induktion</option>
                      <option value="gasWithElOven">Gaskomfur med elovn</option>
                      <option value="ordernaryStove">Alm. komfur</option>
                    </select>
                  </div>
                </div>

                {/* QUESTION */}
                <div
                  className={
                    "o-question-row" +
                    (questionsContainer.state.kitchen.fridge === undefined &&
                    this.state.allFields === false
                      ? " o-invalid"
                      : "")
                  }
                >
                  <div className="o-question-label">
                    Hvilken type køleskab har du?
                  </div>
                  <div className="o-select-container">
                    <select
                      className="o-select"
                      value={
                        questionsContainer.state.kitchen.fridge
                          ? questionsContainer.state.kitchen.fridge
                          : "Vælg"
                      }
                      onChange={e => {
                        questionsContainer.updateSelecMenu(
                          "kitchen",
                          "fridge",
                          e.target.value
                        );
                      }}
                    >
                      <option value="Vælg" disabled hidden>
                        Vælg
                      </option>
                      <option value="seperated">
                        Køleskab og fryser hver for sig
                      </option>
                      <option value="combined">Kølefryseskab</option>
                      <option value="onlyFridge">Har kun køleskab</option>
                    </select>
                  </div>
                </div>

                {/* QUESTION */}
                <div
                  className={
                    "o-question-row" +
                    (questionsContainer.state.kitchen.dishwasher ===
                      undefined && this.state.allFields === false
                      ? " o-invalid"
                      : "")
                  }
                >
                  <div className="o-question-label">
                    Har du en opvaskemaskine?
                  </div>
                  <div className="o-radio-container">
                    <label className="o-radio">
                      Ja
                      <input
                        type="radio"
                        name="radio"
                        checked={
                          questionsContainer.state.kitchen.dishwasher === 1
                        }
                        onChange={() =>
                          questionsContainer.updateRadio(
                            "kitchen",
                            "dishwasher",
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
                          questionsContainer.state.kitchen.dishwasher === 0
                        }
                        onChange={() =>
                          questionsContainer.updateRadio(
                            "kitchen",
                            "dishwasher",
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
                    (questionsContainer.state.kitchen.dishwasherFrequence ===
                      "" && this.state.allFields === false
                      ? " o-invalid"
                      : "") +
                    (questionsContainer.state.kitchen.dishwasher === 1
                      ? ""
                      : " o-contracted")
                  }
                >
                  <div className="o-question-label">
                    Hvor ofte bruger du din opvaskemaskine om ugen?
                  </div>
                  <div className="o-input-container">
                    <input
                      className="o-input"
                      type="text"
                      placeholder="Antal gange pr. uge"
                      value={
                        questionsContainer.state.kitchen.dishwasherFrequence
                      }
                      onChange={e => {
                        questionsContainer.updateNumber(
                          "kitchen",
                          "dishwasherFrequence",
                          e.target.value
                        );
                      }}
                    />
                  </div>
                </div>

                {/* BOTTOM NAVIGATION */}
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
                        questionsContainer.state.kitchen
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

export default Kitchen;
