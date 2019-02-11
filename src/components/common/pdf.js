import React, { Component } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

class PdfButton extends Component {
  constructor(props) {
    super(props);

    // To add another logo, make a base64 version of it with:
    // https://dataurl.sveinbjorn.org/#dataurlmaker
    this.state = {
      logo:
        "data:image/png;base64,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",
      pageWidth: 210,
      pageCenter: 105,
      padding: 14,
      bodyFontSize: 9,
      tablePadding: 5,
      black: [59, 73, 86],
      dark: "#3B4956",
      sand: "#D8D1CA",
      blue: "#4099DA",
      headerY: 28,
      tipsY: 47,
      usageY: 155,
      kitchenY: 170,
      livingroomY: 170,
      barsLeftX: 55,
      barsRightX: 140,
      textRightX: 115,
      barsSpacing: 13,
      barWidth: 50,
      barHeight: 3
    };
  }
  createPdf = () => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "A4"
    });

    // LOGO
    doc.addImage(this.state.logo, "PNG", 7, 7, 20, 5.47);

    // Header
    let title;
    let subtitleTxt;
    if (this.props.data.result.usage === "over") {
      title = "Vups! Du ligger vist i den i høje ende";
      subtitleTxt =
        "Det er ser ud til, at du bruger lidt mere strøm end gennemsnittet. Med et par små fifs kan vi sammen måske ændre lidt på det ?";
    } else {
      title = "Sådan! Du er en haj til det med strøm";
      subtitleTxt =
        "Det er ser ud til, at du bruger mindre strøm end gennemsnittet.Godt gået! Måske er der alligevel et råd eller to, som en elhaj som dig kan hapse med.";
    }

    doc.setFont("helvetica");
    doc.setFontStyle("bold");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(22);
    doc.text(
      title,
      this.state.pageCenter,
      this.state.headerY,
      null,
      null,
      "center"
    );

    // Sub header
    var subtitle = doc
      .setFont("helvetica")
      .setTextColor(this.state.dark)
      .setFontStyle("normal")
      .setFontSize(this.state.bodyFontSize + 2)
      .splitTextToSize(
        subtitleTxt,
        this.state.pageWidth - 2 * (this.state.padding + 15)
      );
    doc.text(
      subtitle,
      this.state.pageCenter,
      this.state.headerY + 8,
      null,
      null,
      "center"
    );

    // TIPS IN TABLE
    doc.autoTable({
      margin: { top: this.state.tipsY },
      head: [
        [
          {
            content: "Her er de tre allerbedste råd til dig fra os",
            colSpan: 3
          }
        ]
      ],
      body: [
        [
          this.props.data.result.tips[0].tip.title,
          this.props.data.result.tips[1].tip.title,
          this.props.data.result.tips[2].tip.title
        ],
        [
          this.props.data.result.tips[0].tip.body,
          this.props.data.result.tips[1].tip.body,
          this.props.data.result.tips[2].tip.body
        ]
      ],
      styles: {
        font: "helvetica",
        fillColor: [142, 205, 200],
        cellPadding: {
          top: 3,
          right: 5,
          bottom: 5,
          left: 5
        },
        fontSize: this.state.bodyFontSize,
        cellWidth: this.state.pageWidth / 3 - 2 * this.state.tablePadding,
        textColor: this.state.black
      },
      alternateRowStyles: {
        font: "helvetica",
        fontStyle: "bold",
        fillColor: [142, 205, 200],
        cellPadding: {
          top: 0,
          right: 5,
          bottom: 0,
          left: 5
        },
        fontSize: this.state.bodyFontSize,
        cellWidth: this.state.pageWidth / 3 - 2 * this.state.tablePadding,
        textColor: this.state.black
      },
      headStyles: {
        font: "helvetica",
        fontStyle: "bold",
        fillColor: [142, 205, 200],
        halign: "center",
        cellPadding: 10,
        fontSize: 14,
        textColor: this.state.black
      }
    });

    // USER INPUT IN EACH ROOM
    let desc = this.state.padding + 50;
    doc.setFillColor(this.state.blue);
    doc.rect(desc, this.state.usageY, 3, 3, "F");

    doc.setFont("helvetica");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text("Dit årligeforbrug", desc + 5, this.state.usageY + 3);

    doc.setFillColor(this.state.sand);
    doc.rect(desc + 40, this.state.usageY, 3, 3, "F");

    doc.setFont("helvetica");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text("Gennemsnitsforbruget", desc + 45, this.state.usageY + 3);

    //Bars
    let barMax = this.props.data.result.maxUsage;
    let barWidth = this.state.barWidth;
    let barHeight = this.state.barHeight;
    let rel = barWidth / barMax;

    // KITCHEN
    doc.setFont("helvetica");
    doc.setFontStyle("bold");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize + 4);
    doc.text("Køkken", this.state.padding, this.state.kitchenY);

    //Stove
    let stove = this.state.kitchenY + 10;
    doc.setFont("helvetica");
    doc.setFontStyle("bold");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text("Komfur", this.state.padding, stove);

    doc.setFont("helvetica");
    doc.setFontStyle("normal");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text(
      this.props.data.caclulatedUsage.kitchen.stove +
        " / " +
        this.props.data.caclulatedUsage.kitchen.stove +
        " kWh.",
      this.state.padding,
      stove + 4
    );

    doc.setFillColor(this.state.sand);
    doc.roundedRect(
      this.state.barsLeftX,
      stove + 1,
      this.props.data.caclulatedUsage.kitchen.stove === 0
        ? 3
        : rel * this.props.data.caclulatedUsage.kitchen.stove + 2,
      barHeight,
      1.5,
      1.5,
      "F"
    );

    doc.setFillColor(this.state.blue);
    doc.roundedRect(
      this.state.barsLeftX,
      stove - 1,
      this.props.data.caclulatedUsage.kitchen.stove === 0
        ? 3
        : rel * this.props.data.caclulatedUsage.kitchen.stove + 2,
      barHeight,
      1.5,
      1.5,
      "F"
    );

    //Fridge
    let fridge = stove + this.state.barsSpacing;
    doc.setFont("helvetica");
    doc.setFontStyle("bold");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text("Køleskab", this.state.padding, fridge);

    doc.setFont("helvetica");
    doc.setFontStyle("normal");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text(
      this.props.data.caclulatedUsage.kitchen.fridge +
        " / " +
        this.props.data.caclulatedUsage.kitchen.fridge +
        " kWh.",
      this.state.padding,
      fridge + 4
    );

    doc.setFillColor(this.state.sand);
    doc.roundedRect(
      this.state.barsLeftX,
      fridge + 1,
      this.props.data.caclulatedUsage.kitchen.fridge === 0
        ? 3
        : rel * this.props.data.caclulatedUsage.kitchen.fridge + 2,
      barHeight,
      1.5,
      1.5,
      "F"
    );

    doc.setFillColor(this.state.blue);
    doc.roundedRect(
      this.state.barsLeftX,
      fridge - 1,
      this.props.data.caclulatedUsage.kitchen.fridge === 0
        ? 3
        : rel * this.props.data.caclulatedUsage.kitchen.fridge + 2,
      barHeight,
      1.5,
      1.5,
      "F"
    );

    //Dishwasher
    let dishwasher = fridge + this.state.barsSpacing;
    doc.setFont("helvetica");
    doc.setFontStyle("bold");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text("Opvaskemaskine", this.state.padding, dishwasher);

    doc.setFont("helvetica");
    doc.setFontStyle("normal");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text(
      this.props.data.caclulatedUsage.kitchen.dishwasher +
        " / " +
        this.props.data.caclulatedUsage.kitchen.dishwasherAverage +
        " kWh.",
      this.state.padding,
      dishwasher + 4
    );

    doc.setFillColor(this.state.sand);
    doc.roundedRect(
      this.state.barsLeftX,
      dishwasher + 1,
      this.props.data.caclulatedUsage.kitchen.dishwasherAverage === 0
        ? 3
        : rel * this.props.data.caclulatedUsage.kitchen.dishwasherAverage + 2,
      barHeight,
      1.5,
      1.5,
      "F"
    );

    doc.setFillColor(this.state.blue);
    doc.roundedRect(
      this.state.barsLeftX,
      dishwasher - 1,
      this.props.data.caclulatedUsage.kitchen.dishwasher === 0
        ? 3
        : rel * this.props.data.caclulatedUsage.kitchen.dishwasher + 2,
      barHeight,
      1.5,
      1.5,
      "F"
    );

    // LIVINGROOM
    doc.setFont("helvetica");
    doc.setFontStyle("bold");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize + 4);
    doc.text("Stue", this.state.textRightX, this.state.livingroomY);

    //TV
    let tv = this.state.kitchenY + 10;
    doc.setFont("helvetica");
    doc.setFontStyle("bold");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text("Tv", this.state.textRightX, tv);

    doc.setFont("helvetica");
    doc.setFontStyle("normal");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text(
      this.props.data.caclulatedUsage.livingroom.tv +
        " / " +
        this.props.data.caclulatedUsage.livingroom.tv +
        " kWh.",
      this.state.textRightX,
      tv + 4
    );

    doc.setFillColor(this.state.sand);
    doc.roundedRect(
      this.state.barsRightX,
      tv + 1,
      this.props.data.caclulatedUsage.livingroom.tv === 0
        ? 3
        : rel * this.props.data.caclulatedUsage.livingroom.tv + 2,
      barHeight,
      1.5,
      1.5,
      "F"
    );

    doc.setFillColor(this.state.blue);
    doc.roundedRect(
      this.state.barsRightX,
      tv - 1,
      this.props.data.caclulatedUsage.livingroom.tv === 0
        ? 3
        : rel * this.props.data.caclulatedUsage.livingroom.tv + 2,
      barHeight,
      1.5,
      1.5,
      "F"
    );

    //TV BOX
    let tvBoxes = tv + this.state.barsSpacing;
    doc.setFont("helvetica");
    doc.setFontStyle("bold");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text("Tvbokse", this.state.textRightX, tvBoxes);

    doc.setFont("helvetica");
    doc.setFontStyle("normal");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text(
      this.props.data.caclulatedUsage.livingroom.tvBoxes +
        " / " +
        this.props.data.caclulatedUsage.livingroom.tvBoxes +
        " kWh.",
      this.state.textRightX,
      tvBoxes + 4
    );

    doc.setFillColor(this.state.sand);
    doc.roundedRect(
      this.state.barsRightX,
      tvBoxes + 1,
      this.props.data.caclulatedUsage.livingroom.tvBoxes === 0
        ? 3
        : rel * this.props.data.caclulatedUsage.livingroom.tvBoxes + 2,
      barHeight,
      1.5,
      1.5,
      "F"
    );

    doc.setFillColor(this.state.blue);
    doc.roundedRect(
      this.state.barsRightX,
      tvBoxes - 1,
      this.props.data.caclulatedUsage.livingroom.tvBoxes === 0
        ? 3
        : rel * this.props.data.caclulatedUsage.livingroom.tvBoxes + 2,
      barHeight,
      1.5,
      1.5,
      "F"
    );

    //COMPUTERS
    let computers = tvBoxes + this.state.barsSpacing;
    doc.setFont("helvetica");
    doc.setFontStyle("bold");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text("Computere", this.state.textRightX, computers);

    doc.setFont("helvetica");
    doc.setFontStyle("normal");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text(
      this.props.data.caclulatedUsage.livingroom.computers +
        " / " +
        this.props.data.caclulatedUsage.livingroom.computersAverage +
        " kWh.",
      this.state.textRightX,
      computers + 4
    );

    doc.setFillColor(this.state.sand);
    doc.roundedRect(
      this.state.barsRightX,
      computers + 1,
      this.props.data.caclulatedUsage.livingroom.computers === 0
        ? 3
        : rel * this.props.data.caclulatedUsage.livingroom.computersAverage + 2,
      barHeight,
      1.5,
      1.5,
      "F"
    );

    doc.setFillColor(this.state.blue);
    doc.roundedRect(
      this.state.barsRightX,
      computers - 1,
      this.props.data.caclulatedUsage.livingroom.computers === 0
        ? 3
        : rel * this.props.data.caclulatedUsage.livingroom.computers + 2,
      barHeight,
      1.5,
      1.5,
      "F"
    );

    //CONSOLS
    let consols = computers + this.state.barsSpacing;
    doc.setFont("helvetica");
    doc.setFontStyle("bold");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text("Spillekonsoller", this.state.textRightX, consols);

    doc.setFont("helvetica");
    doc.setFontStyle("normal");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text(
      this.props.data.caclulatedUsage.livingroom.consols +
        " / " +
        this.props.data.caclulatedUsage.livingroom.consols +
        " kWh.",
      this.state.textRightX,
      consols + 4
    );

    doc.setFillColor(this.state.sand);
    doc.roundedRect(
      this.state.barsRightX,
      consols + 1,
      this.props.data.caclulatedUsage.livingroom.consols === 0
        ? 3
        : rel * this.props.data.caclulatedUsage.livingroom.consols + 2,
      barHeight,
      1.5,
      1.5,
      "F"
    );

    doc.setFillColor(this.state.blue);
    doc.roundedRect(
      this.state.barsRightX,
      consols - 1,
      this.props.data.caclulatedUsage.livingroom.consols === 0
        ? 3
        : rel * this.props.data.caclulatedUsage.livingroom.consols + 2,
      barHeight,
      1.5,
      1.5,
      "F"
    );

    //LAMPS
    let lamps = consols + this.state.barsSpacing;
    doc.setFont("helvetica");
    doc.setFontStyle("bold");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text("Lamper", this.state.textRightX, lamps);

    doc.setFont("helvetica");
    doc.setFontStyle("normal");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text(
      this.props.data.caclulatedUsage.livingroom.lamps +
        " / " +
        this.props.data.caclulatedUsage.livingroom.lampsAverage +
        " kWh.",
      this.state.textRightX,
      lamps + 4
    );

    doc.setFillColor(this.state.sand);
    doc.roundedRect(
      this.state.barsRightX,
      lamps + 1,
      this.props.data.caclulatedUsage.livingroom.lamps === 0
        ? 3
        : rel * this.props.data.caclulatedUsage.livingroom.lampsAverage + 2,
      barHeight,
      1.5,
      1.5,
      "F"
    );

    doc.setFillColor(this.state.blue);
    doc.roundedRect(
      this.state.barsRightX,
      lamps - 1,
      this.props.data.caclulatedUsage.livingroom.lamps === 0
        ? 3
        : rel * this.props.data.caclulatedUsage.livingroom.lamps + 2,
      barHeight,
      1.5,
      1.5,
      "F"
    );

    // WASHING
    let washingY = this.state.kitchenY + 85;
    doc.setFont("helvetica");
    doc.setFontStyle("bold");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize + 4);
    doc.text("Vasketøj", this.state.padding, washingY);

    //Washingmachine
    let washingmachine = washingY + 10;
    doc.setFont("helvetica");
    doc.setFontStyle("bold");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text("Vaskemaskine", this.state.padding, washingmachine);

    doc.setFont("helvetica");
    doc.setFontStyle("normal");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text(
      this.props.data.caclulatedUsage.washing.washingmachine +
        " / " +
        this.props.data.caclulatedUsage.washing.washingmachineAverage +
        " kWh.",
      this.state.padding,
      washingmachine + 4
    );

    doc.setFillColor(this.state.sand);
    doc.roundedRect(
      this.state.barsLeftX,
      washingmachine + 1,
      this.props.data.caclulatedUsage.washing.washingmachineAverage === 0
        ? 3
        : rel * this.props.data.caclulatedUsage.washing.washingmachineAverage +
            2,
      barHeight,
      1.5,
      1.5,
      "F"
    );

    doc.setFillColor(this.state.blue);
    doc.roundedRect(
      this.state.barsLeftX,
      washingmachine - 1,
      this.props.data.caclulatedUsage.washing.washingmachine === 0
        ? 3
        : rel * this.props.data.caclulatedUsage.washing.washingmachine + 2,
      barHeight,
      1.5,
      1.5,
      "F"
    );

    //Dryer
    let dryer = washingmachine + this.state.barsSpacing;
    doc.setFont("helvetica");
    doc.setFontStyle("bold");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text("Tørretumbler", this.state.padding, dryer);

    doc.setFont("helvetica");
    doc.setFontStyle("normal");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text(
      this.props.data.caclulatedUsage.washing.dryer +
        " / " +
        this.props.data.caclulatedUsage.washing.dryerAverage +
        " kWh.",
      this.state.padding,
      dryer + 4
    );

    doc.setFillColor(this.state.sand);
    doc.roundedRect(
      this.state.barsLeftX,
      dryer + 1,
      this.props.data.caclulatedUsage.washing.dryerAverage === 0
        ? 3
        : rel * this.props.data.caclulatedUsage.washing.dryerAverage + 2,
      barHeight,
      1.5,
      1.5,
      "F"
    );

    doc.setFillColor(this.state.blue);
    doc.roundedRect(
      this.state.barsLeftX,
      dryer - 1,
      this.props.data.caclulatedUsage.washing.dryer === 0
        ? 3
        : rel * this.props.data.caclulatedUsage.washing.dryer + 2,
      barHeight,
      1.5,
      1.5,
      "F"
    );

    // Heating
    doc.setFont("helvetica");
    doc.setFontStyle("bold");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize + 4);
    doc.text("Gulvvarme", this.state.textRightX, washingY);

    //Floor
    let floor = washingY + 10;
    doc.setFont("helvetica");
    doc.setFontStyle("bold");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text("Vaskemaskine", this.state.textRightX, floor);

    doc.setFont("helvetica");
    doc.setFontStyle("normal");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text(
      this.props.data.caclulatedUsage.heating.floor +
        " / " +
        this.props.data.caclulatedUsage.heating.floor +
        " kWh.",
      this.state.textRightX,
      floor + 4
    );

    doc.setFillColor(this.state.sand);
    doc.roundedRect(
      this.state.barsRightX,
      floor + 1,
      this.props.data.caclulatedUsage.heating.floor === 0
        ? 3
        : rel * this.props.data.caclulatedUsage.heating.floor + 2,
      barHeight,
      1.5,
      1.5,
      "F"
    );

    doc.setFillColor(this.state.blue);
    doc.roundedRect(
      this.state.barsRightX,
      floor - 1,
      this.props.data.caclulatedUsage.heating.floor === 0
        ? 3
        : rel * this.props.data.caclulatedUsage.heating.floor + 2,
      barHeight,
      1.5,
      1.5,
      "F"
    );

    //Electric
    let electric = floor + this.state.barsSpacing;
    doc.setFont("helvetica");
    doc.setFontStyle("bold");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text("Elvarme", this.state.textRightX, electric);

    doc.setFont("helvetica");
    doc.setFontStyle("normal");
    doc.setTextColor(this.state.dark);
    doc.setFontSize(this.state.bodyFontSize);
    doc.text(
      this.props.data.caclulatedUsage.heating.electric +
        " / " +
        this.props.data.caclulatedUsage.heating.electric +
        " kWh.",
      this.state.textRightX,
      electric + 4
    );

    doc.setFillColor(this.state.sand);
    doc.roundedRect(
      this.state.barsRightX,
      electric + 1,
      this.props.data.caclulatedUsage.heating.electric === 0
        ? 3
        : rel * this.props.data.caclulatedUsage.heating.electric + 2,
      barHeight,
      1.5,
      1.5,
      "F"
    );

    doc.setFillColor(this.state.blue);
    doc.roundedRect(
      this.state.barsRightX,
      electric - 1,
      this.props.data.caclulatedUsage.heating.electric === 0
        ? 3
        : rel * this.props.data.caclulatedUsage.heating.electric + 2,
      barHeight,
      1.5,
      1.5,
      "F"
    );

    doc.save("orsted-eltjek.pdf");
  };
  render() {
    return (
      <div className="o-pdf-download o-btn o-red" onClick={this.createPdf}>
        Download dit resultat (PDF)
      </div>
    );
  }
}

export default PdfButton;
