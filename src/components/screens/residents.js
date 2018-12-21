import React, { Component } from "react";
import ProcessBar from "./../common/processbar";
import { Subscribe } from "unstated";
import QuestionsContainer from "../../unstated/questionsContainer";
import NavigationContainer from "../../unstated/navigationContainer";

class Residents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allFields: true
    };
  }

  validateFields = fields => {
    let valid = true;
    Object.keys(fields).map((key, index) => {
      if (fields[key] === false || fields[key] === "") {
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
          <div id="o-residents" className="o-bg-shadow">
            <div className="o-leftside-img" />
            <div className="o-rightside-content">
              <ProcessBar currentPage="residents" />
              <div className="o-content-container">
                <div className="o-headline2 o-mb20">
                  Hvor mange bor der i din husstand?
                </div>

                {/* QUESTION */}
                <div
                  className={
                    "o-question-row" +
                    (questionsContainer.state.residents.adults === undefined &&
                    this.state.allFields === false
                      ? " o-invalid"
                      : "")
                  }
                >
                  <div className="o-question-label">
                    Antal voksne i hustanden (over 20 år)
                  </div>
                  <div className="o-select-container">
                    <select
                      className="o-select"
                      value={
                        questionsContainer.state.residents.adults
                          ? questionsContainer.state.residents.adults
                          : "Vælg"
                      }
                      onChange={e => {
                        questionsContainer.updateSelecMenu(
                          "residents",
                          "adults",
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
                    (questionsContainer.state.residents.teenagers ===
                      undefined && this.state.allFields === false
                      ? " o-invalid"
                      : "")
                  }
                >
                  <div className="o-question-label">
                    Antal teenagere i hustanden (13 - 19 år)
                  </div>
                  <div className="o-select-container">
                    <select
                      className="o-select"
                      value={
                        questionsContainer.state.residents.teenagers
                          ? questionsContainer.state.residents.teenagers
                          : "Vælg"
                      }
                      onChange={e => {
                        questionsContainer.updateSelecMenu(
                          "residents",
                          "teenagers",
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
                    (questionsContainer.state.residents.children ===
                      undefined && this.state.allFields === false
                      ? " o-invalid"
                      : "")
                  }
                >
                  <div className="o-question-label">
                    Antal børn i husstanden (0 - 12 år)
                  </div>
                  <div className="o-select-container">
                    <select
                      className="o-select"
                      value={
                        questionsContainer.state.residents.children
                          ? questionsContainer.state.residents.children
                          : "Vælg"
                      }
                      onChange={e => {
                        questionsContainer.updateSelecMenu(
                          "residents",
                          "children",
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
                    (questionsContainer.state.residents.stayAtHome ===
                      undefined && this.state.allFields === false
                      ? " o-invalid"
                      : "")
                  }
                >
                  <div className="o-question-label">
                    Er der nogen voksne hjemmegående i din husstand <br />
                    <span className="o-question-label-info">
                      (pensionist, på barsel eller lignende)?
                    </span>
                  </div>
                  <div className="o-select-container">
                    <select
                      className="o-select"
                      value={
                        questionsContainer.state.residents.stayAtHome
                          ? questionsContainer.state.residents.stayAtHome
                          : "Vælg"
                      }
                      onChange={e => {
                        questionsContainer.updateSelecMenu(
                          "residents",
                          "stayAtHome",
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
                    (questionsContainer.state.residents.residentalSize === "" &&
                    this.state.allFields === false
                      ? " o-invalid"
                      : "")
                  }
                >
                  <div className="o-question-label">
                    Hvor stor er din bolig? <br />
                    <span className="o-question-label-info">
                      (Eventuelle kælderrum skal medtages.)
                    </span>
                  </div>
                  <div className="o-input-container">
                    <input
                      className="o-input"
                      type="text"
                      placeholder="Størrelsen i m2"
                      value={questionsContainer.state.residents.residentalSize}
                      onChange={e => {
                        questionsContainer.updateNumber(
                          "residents",
                          "residentalSize",
                          e.target.value
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="o-bottom-nav">
                  <div
                    className="o-btn o-mt40 o-back"
                    onClick={() => {
                      let prevPage = navigationContainer.getPrevPage();
                      this.props.history.push(
                        prevPage + "/?type=ingen&housing=ingen"
                      );
                    }}
                  >
                    Tilbage
                  </div>
                  <div
                    className="o-btn o-blue o-mt40"
                    onClick={() => {
                      let isValid = this.validateFields(
                        questionsContainer.state.residents
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

export default Residents;
