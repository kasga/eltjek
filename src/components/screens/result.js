import React, { Component } from "react";
import ProcessBar from "./../common/processbar";
import { Subscribe } from "unstated";

import QuestionsContainer from "../../unstated/questionsContainer";
import NavigationContainer from "../../unstated/navigationContainer";
import Bars from "../common/bars";
import Tip from "../common/tip";
import PdfButton from "../common/pdf";

import imgKitchen from "./../../images/kitchen.svg";
import imgLivingroom from "./../../images/livingroom.svg";
import imgWashing from "./../../images/washing.svg";
import imgFloor from "./../../images/floor.svg";

class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCalculated: false,
      tipsOpen: false,
      paragraphs: 0,
      questionContainer: undefined,
      questionsCont: undefined
    };
  }

  toggleTips = () => {
    this.setState({ tipsOpen: !this.state.tipsOpen });
  };

  handleCalculatingValues(cont) {
    if (this.state.calculate) {
      this.setState({ calculate: false });
      cont.calculateKwhValues();
    } else {
      this.setState({ calculate: true });
    }
  }

  t(c) {
    this.setState({ questionsCont: c });
  }

  render() {
    return (
      <Subscribe to={[QuestionsContainer, NavigationContainer]}>
        {(questionsContainer, navigationContainer) => (
          <div id="o-result" className="o-bg-shadow">
            {questionsContainer.state.calculate
              ? questionsContainer.calculateKwhValues()
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
                        Vups! Du ligger vist i den i høje ende
                      </div>
                      <div className="o-center o-subheading">
                        Det er ser ud til, at du bruger lidt mere strøm end
                        gennemsnittet. Med et par små fifs kan vi sammen måske
                        ændre lidt på det?
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="o-headline1 o-center">
                        Sådan! Du er en haj til det med strøm
                      </div>
                      <div className="o-center o-subheading">
                        Det er ser ud til, at du bruger mindre strøm end
                        gennemsnittet. Godt gået! Måske er der alligevel et råd
                        eller to, som en elhaj som dig kan hapse med.
                      </div>
                    </div>
                  )}
                </div>
                {/* TIPS */}

                <div
                  className={
                    this.state.tipsOpen
                      ? "o-tips-container active"
                      : "o-tips-container"
                  }
                >
                  {this.state.tipsHeight}
                  <div className="o-headline2 o-center o-w100">
                    Her er de tre allerbedste råd til dig fra os
                  </div>
                  {questionsContainer.state.result.tips.map((value, index) => (
                    <Tip
                      body={value.tip}
                      icon={value.img}
                      key={"o-tip" + index}
                    />
                  ))}
                  <div className="o-tips-toggle">
                    <div
                      className="o-tips-toggle-trigger"
                      onClick={this.toggleTips}
                    >
                      {this.state.tipsOpen ? "Luk" : "Læs vores gode råd"}
                    </div>
                  </div>
                </div>
                {/* COMPARISON */}
                <div className="o-comparison">
                  <div className="o-comparison-top o-center">
                    <div className="o-comparison-top-item">
                      <span className="o-comparison-you-box" />
                      Dit årligeforbrug
                    </div>
                    <div className="o-comparison-top-item">
                      <span className="o-comparison-average-box" />
                      Gennemsnitsforbruget
                    </div>
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
                          max={questionsContainer.state.result.maxUsage}
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
                          max={questionsContainer.state.result.maxUsage}
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
                          max={questionsContainer.state.result.maxUsage}
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
                          max={questionsContainer.state.result.maxUsage}
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
                          max={questionsContainer.state.result.maxUsage}
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
                          max={questionsContainer.state.result.maxUsage}
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
                          max={questionsContainer.state.result.maxUsage}
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
                          max={questionsContainer.state.result.maxUsage}
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
                          max={questionsContainer.state.result.maxUsage}
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
                          max={questionsContainer.state.result.maxUsage}
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
                          max={questionsContainer.state.result.maxUsage}
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
                          max={questionsContainer.state.result.maxUsage}
                          label="Elvarme"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* PDF DOWNLOAD BUTTON */}
                <PdfButton data={questionsContainer.state} />

                {/* APP */}
                <div className="o-selfservice-container">
                  <div className="o-selfservice">
                    <div className="o-headline1">
                      Log ind på vores selvbetjening og følg dit forbrug
                    </div>
                    <div
                      data-target="#LoginToasterOverlay"
                      data-toggle="modal"
                      className="o-btn o-blue"
                      onClick={() => {
                        window.location = "https://shop.orsted.dk/tilbud/";
                      }}
                    >
                      Se forbrug
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
                {/* ØRSTED SHOP */}
                <div className="o-orstedshop">
                  <div className="o-orstedshop-img">
                    <div className="o-orstedshop-img-content">
                      <div className="o-headline1 o-white">
                        Har du prøvet Philips Hue?
                      </div>
                      <div
                        className="o-btn o-blue"
                        onClick={() => {
                          window.location =
                            "https://orsted.dk/Privat/Kundeservice/Forbrug/Spoerg-energiraadgiverne/Book-et-telefonmoede";
                        }}
                      >
                        Til Ørstedshoppen
                      </div>
                    </div>
                  </div>
                  <div className="o-orstedshop-txt">
                    <div className="o-headline1">
                      Brug for et ekstra tjek af dit energiforbrug?
                    </div>
                    <div
                      className="o-btn o-blue"
                      onClick={() => {
                        window.location =
                          "https://orsted.dk/Privat/Kundeservice/Forbrug/Spoerg-energiraadgiverne/Book-et-telefonmoede";
                      }}
                    >
                      Book en energirådgiver
                    </div>
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
                </div>
                <h3>Brugerens input</h3>
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
                {JSON.stringify(questionsContainer.state.result)}
                <br />
                <br />
                <h3>Datagrundlag</h3>
                {JSON.stringify(questionsContainer.state.data)}
              </div>
            </div>
          </div>
        )}
      </Subscribe>
    );
  }
}

export default Result;
