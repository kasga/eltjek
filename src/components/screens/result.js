import React, { Component } from "react";
import * as jsPDF from "jspdf";
import ProcessBar from "./../common/processbar";
import { Subscribe } from "unstated";
import QuestionsContainer from "../../unstated/questionsContainer";
import NavigationContainer from "../../unstated/navigationContainer";
import Bars from "../common/bars";
import Tip from "../common/tip";

import imgKitchen from "./../../images/kitchen.svg";
import imgLivingroom from "./../../images/livingroom.svg";
import imgWashing from "./../../images/washing.svg";
import imgFloor from "./../../images/floor.svg";

class Result extends Component {
  state = {
    hasCalculated: false
  };

  createPdf = () => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "A4"
    });
    doc.text("PDF filename: Exampel", 30, 30);

    doc.save("exampel.pdf");
  };

  render() {
    return (
      <Subscribe to={[QuestionsContainer, NavigationContainer]}>
        {(questionsContainer, navigationContainer) => (
          <div id="o-result" className="o-bg-shadow">
            {this.state.hasCalculated === false
              ? this.setState({ hasCalculated: true }, () => {
                  questionsContainer.calculateKwhValues();
                })
              : ""}
            <div className="o-leftside-img" />
            <div className="o-rightside-content">
              <ProcessBar currentPage="heating" />
              <div className="o-content-container">
                {/* CONCLUSSION */}
                <div className="o-conclusion">
                  {questionsContainer.state.result.usage === "over" ? (
                    <div>
                      <div className="o-headline1 o-center">
                        Dit elforbrug ligger i den høje ende
                      </div>
                      <div className="o-center">
                        Det ser ud til, at du bruger mere strøm end vores
                        anbefaling. Derfor har vi samlet et par gode råd lige
                        til dig.
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="o-headline1 o-center">
                        Du er en haj til det med strøm
                      </div>
                      <div className="o-center">
                        Det er ser ud til, at du bruger mindre strøm end vores
                        anbefaling. Godt gået!
                      </div>
                    </div>
                  )}
                </div>

                {/* TIPS */}
                {questionsContainer.state.result.usage === "over" ? (
                  <div className="o-tips-container">
                    <div className="o-headline2 o-center o-w100">
                      Du kan med fordel
                    </div>
                    {questionsContainer.state.result.tips.map(
                      (value, index) => (
                        <Tip
                          body={value.tip}
                          icon={value.img}
                          key={"o-tip" + index}
                        />
                      )
                    )}
                  </div>
                ) : (
                  <div />
                )}

                {/* COMPARISON */}
                <div className="o-comparison">
                  <div className="o-comparison-top o-center">
                    <span className="o-comparison-you-box" />
                    Dit årligeforbrug
                    <span className="o-comparison-average-box" />
                    Vores anbefaling
                  </div>

                  {/* Comparison boxes */}
                  <div className="o-comparison-boxes">
                    <div className="o-comparison-box">
                      <img src={imgKitchen} alt="Køkken" height="70" />
                      <div className="o-label">Køkken</div>
                      <div className="o-comparison-bars">
                        {/* Bar container */}
                        <Bars
                          you={
                            questionsContainer.state.caclulatedUsage.kitchen
                              .stove
                          }
                          average={
                            questionsContainer.state.caclulatedUsage.kitchen
                              .stove
                          }
                          label="Komfur"
                        />
                        <Bars
                          you={
                            questionsContainer.state.caclulatedUsage.kitchen
                              .fridge
                          }
                          average={
                            questionsContainer.state.caclulatedUsage.kitchen
                              .fridge
                          }
                          label="Køleskab"
                        />
                        <Bars
                          you={
                            questionsContainer.state.caclulatedUsage.kitchen
                              .dishwasher
                          }
                          average={
                            questionsContainer.state.caclulatedUsage.kitchen
                              .dishwasherAverage
                          }
                          label="Opvaskemaskine"
                        />
                      </div>
                    </div>
                    <div className="o-comparison-box">
                      <img src={imgLivingroom} alt="Stue" height="70" />
                      <div className="o-label">Stue</div>
                      <div className="o-comparison-bars">
                        {/* Bar container */}
                        <Bars
                          you={
                            questionsContainer.state.caclulatedUsage.livingroom
                              .tv
                          }
                          average={
                            questionsContainer.state.caclulatedUsage.livingroom
                              .tv
                          }
                          label="Tv"
                        />
                        <Bars
                          you={
                            questionsContainer.state.caclulatedUsage.livingroom
                              .tvBoxes
                          }
                          average={
                            questionsContainer.state.caclulatedUsage.livingroom
                              .tvBoxes
                          }
                          label="Tvbokse"
                        />
                        <Bars
                          you={
                            questionsContainer.state.caclulatedUsage.livingroom
                              .computers
                          }
                          average={
                            questionsContainer.state.caclulatedUsage.livingroom
                              .computersAverage
                          }
                          label="Computere"
                        />
                        <Bars
                          you={
                            questionsContainer.state.caclulatedUsage.livingroom
                              .consols
                          }
                          average={
                            questionsContainer.state.caclulatedUsage.livingroom
                              .consolsAverage
                          }
                          label="Spillekonsoller"
                        />
                        <Bars
                          you={
                            questionsContainer.state.caclulatedUsage.livingroom
                              .lamps
                          }
                          average={
                            questionsContainer.state.caclulatedUsage.livingroom
                              .lampsAverage
                          }
                          label="Lamper"
                        />
                      </div>
                    </div>
                    <div className="o-comparison-box">
                      <img src={imgWashing} alt="Elvarme" height="60" />
                      <div className="o-label">Vasketøj</div>
                      <div className="o-comparison-bars">
                        {/* Bar container */}
                        <Bars
                          you={
                            questionsContainer.state.caclulatedUsage.washing
                              .washingmachine
                          }
                          average={
                            questionsContainer.state.caclulatedUsage.washing
                              .washingmachineAverage
                          }
                          label="Vaskemaskine"
                        />
                        <Bars
                          you={
                            questionsContainer.state.caclulatedUsage.washing
                              .dryer
                          }
                          average={
                            questionsContainer.state.caclulatedUsage.washing
                              .dryerAverage
                          }
                          label={"Tørretumbler"}
                        />
                      </div>
                    </div>
                    <div className="o-comparison-box">
                      <img src={imgFloor} alt="Gulvvarme" height="60" />
                      <div className="o-label">Gulvvarme</div>
                      <div className="o-comparison-bars">
                        {/* Bar container */}
                        <Bars
                          you={
                            questionsContainer.state.caclulatedUsage.heating
                              .floor
                          }
                          average={
                            questionsContainer.state.caclulatedUsage.heating
                              .floor
                          }
                          label="Gulvvarme"
                        />
                        <Bars
                          you={
                            questionsContainer.state.caclulatedUsage.heating
                              .electric
                          }
                          average={
                            questionsContainer.state.caclulatedUsage.heating
                              .electric
                          }
                          label="Elvarme"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* APP */}
                {questionsContainer.state.result.usage !== "over" ? (
                  <div className="o-selfservice-container">
                    <div className="o-selfservice">
                      <div className="o-headline1">
                        Log ind på vores selvbetjening og følg dit forbrug
                      </div>
                      <div
                        className="o-btn o-blue"
                        onClick={() => {
                          window.location = "https://shop.orsted.dk/tilbud/";
                        }}
                      >
                        Til Ørstedshoppen
                      </div>
                    </div>
                    <div className="o-selfservice-app">
                      <div className="o-selfservice-app-content">
                        <div className="o-headline2">
                          Download vores app
                          <br /> og følg dit forbrug
                          <div>
                            <a
                              href="https://itunes.apple.com/us/app/mit-%C3%B8rsted/id1447353892?mt=8&ign-mpt=uo%3D2"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src="https://orsted.dk/-/media/WWW/Images/DCS/2017/08/1AppleBtn"
                                alt="Apple download"
                              />
                            </a>
                            <a
                              href="https://play.google.com/store/apps/details?id=com.orsted.selfservice"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src="https://orsted.dk/-/media/WWW/Images/DCS/2017/08/2GoogleBtn"
                                alt="Google download"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div />
                )}

                {/* ØRSTED SHOP */}
                <div className="o-orstedshop">
                  <div className="o-orstedshop-img" />
                  <div className="o-orstedshop-txt">
                    <div className="o-headline1">
                      Køb energibesparende produkter på Ørstedshoppen
                    </div>
                    <div
                      className="o-btn o-blue"
                      onClick={() => {
                        window.location = "https://shop.orsted.dk/tilbud/";
                      }}
                    >
                      Til Ørstedshoppen
                    </div>
                  </div>
                </div>

                {/* DOWNLOAD BUTTON */}
                <div
                  className="o-pdf-download o-btn o-red"
                  onClick={this.createPdf}
                >
                  Download dit resultat
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
                </div>
                {/* <h3>Brugerens input</h3>
                {JSON.stringify(questionsContainer.state.housing)}
                <br />
                <br />
                {JSON.stringify(questionsContainer.state.residents)}
                <br />
                <br />
                {JSON.stringify(questionsContainer.state.kitchen)}
                <br />
                <br />
                {JSON.stringify(questionsContainer.state.livingroom)}
                <br />
                <br />
                {JSON.stringify(questionsContainer.state.washing)}
                <br />
                <br />
                {JSON.stringify(questionsContainer.state.heating)}
                <br />
                <br />
                <h3>Beregninger</h3>
                {JSON.stringify(questionsContainer.state.caclulatedUsage)}
                <br />
                <br />
                <h3>Datagrundlag</h3>
                {JSON.stringify(questionsContainer.state.data)} */}
              </div>
            </div>
          </div>
        )}
      </Subscribe>
    );
  }
}

export default Result;
