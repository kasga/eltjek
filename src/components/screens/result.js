import React, { Component } from "react";
import ProcessBar from "./../common/processbar";
import { Subscribe } from "unstated";

import QuestionsContainer from "../../unstated/questionsContainer";
import NavigationContainer from "../../unstated/navigationContainer";
import Waypoint from "react-waypoint";
import Bars from "../common/bars";
import Tip from "../common/tip";
import PdfButton from "../common/pdf";

import { ReactComponent as ImgKitchen } from "./../../images/kitchen.svg";
import { ReactComponent as ImgLivingroom } from "./../../images/livingroom.svg";
import { ReactComponent as ImgWashing } from "./../../images/washing.svg";
import { ReactComponent as ImgHeating } from "./../../images/heating.svg";

class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCalculated: false,
      tipsOpen: false,
      paragraphs: 0,
      questionContainer: undefined,
      questionsCont: undefined,
      animateBarsPart1: "false",
      animateBarsPart2: "false",
      downloadPDF: "false"
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
                        Vups! Du ligger vist i den høje ende
                      </div>
                      <div className="o-center o-subheading">
                        Ud fra dine svar om dit hjem og dine vaner ser det ud
                        til, at dit forbug (
                        {questionsContainer.state.caclulatedUsage.totalUsage}{" "}
                        kWh) er højere end andre, der ligner dig (
                        {questionsContainer.state.caclulatedUsage.averageUsage}{" "}
                        kWh). <br />
                        Med et par små fifs kan vi sammen måske ændre lidt på
                        det?
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="o-headline1 o-center">
                        Sådan! Du er en haj til det med strøm
                      </div>
                      <div className="o-center o-subheading">
                        Ud fra dine svar om dit hjem og dine vaner ser det ud
                        til, at dit forbug (
                        {questionsContainer.state.caclulatedUsage.totalUsage}{" "}
                        kWh) er lavere end andre, der ligner dig (
                        {questionsContainer.state.caclulatedUsage.averageUsage}{" "}
                        kWh). Godt gået. Måske er der alligevel et råd eller to,
                        som en elhaj som dig kan hapse med.
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
                      Dit årlige forbrug
                    </div>
                    <div className="o-comparison-top-item">
                      <span className="o-comparison-average-box" />
                      Gennemsnitsforbrug for en husstand, der ligner din
                    </div>
                  </div>

                  {/* Comparison boxes */}
                  <div className="o-comparison-boxes">
                    {/* WAYPOINTS */}
                    <Waypoint
                      bottomOffset="50%"
                      onEnter={({
                        previousPosition,
                        currentPosition,
                        event
                      }) => {
                        this.setState({ animateBarsPart1: "true" });
                      }}
                    />
                    <div className="o-comparison-box">
                      <ImgKitchen height="70" />
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
                          animate={this.state.animateBarsPart1}
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
                          animate={this.state.animateBarsPart1}
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
                          animate={this.state.animateBarsPart1}
                        />
                      </div>
                    </div>
                    <div className="o-comparison-box">
                      <ImgLivingroom height="70" />
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
                          animate={this.state.animateBarsPart1}
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
                          animate={this.state.animateBarsPart1}
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
                          animate={this.state.animateBarsPart1}
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
                          animate={this.state.animateBarsPart1}
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
                          animate={this.state.animateBarsPart1}
                        />
                      </div>
                    </div>
                    <div className="o-comparison-box">
                      {/* WAYPOINTS */}
                      <Waypoint
                        bottomOffset="30%"
                        onEnter={({
                          previousPosition,
                          currentPosition,
                          event
                        }) => {
                          this.setState({ animateBarsPart2: "true" });
                        }}
                      />
                      <ImgWashing height="60" />
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
                          animate={this.state.animateBarsPart2}
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
                          animate={this.state.animateBarsPart2}
                        />
                      </div>
                    </div>
                    <div className="o-comparison-box">
                      <ImgHeating height="60" />
                      <div className="o-label">Elvarme</div>
                      <div className="o-comparison-bars">
                        {/* Bar container */}
                        <Bars
                          you={
                            questionsContainer.state.caclulatedUsage.heating
                              .radiators
                          }
                          average={
                            questionsContainer.state.caclulatedUsage.heating
                              .radiators
                          }
                          max={questionsContainer.state.result.maxUsage}
                          label="Elradiator(er)"
                          animate={this.state.animateBarsPart2}
                        />
                        <Bars
                          you={
                            questionsContainer.state.caclulatedUsage.heating
                              .pumps
                          }
                          average={
                            questionsContainer.state.caclulatedUsage.heating
                              .pumps
                          }
                          max={questionsContainer.state.result.maxUsage}
                          label="Varmepumpe(r)"
                          animate={this.state.animateBarsPart2}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* PDF DOWNLOAD BUTTON */}
                {/* WAYPOINTS */}
                <Waypoint
                  bottomOffset="30%"
                  onEnter={({ event }) => {
                    this.setState({ downloadPDF: "true" });
                  }}
                />
                <PdfButton
                  data={questionsContainer.state}
                  bounce={this.state.downloadPDF}
                  ga={navigationContainer}
                />

                {/* APP */}
                {/* <div className="o-selfservice-container">
                  <div className="o-selfservice">
                    <div className="o-headline1">
                      Log ind på vores selvbetjening og følg dit forbrug
                    </div>
                    <div
                      data-target="#LoginToasterOverlay"
                      data-toggle="modal"
                      className="o-btn o-blue"
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
                </div> */}
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
                          navigationContainer.GAevent("shop");
                          window.location =
                            "https://shop.orsted.dk/brand/philips-hue/";
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
                        navigationContainer.GAevent("energiraadgiver");
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
                {JSON.stringify(questionsContainer.state.result)}
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
