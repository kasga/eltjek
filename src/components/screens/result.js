import React, { Component } from "react";
import * as jsPDF from "jspdf";

class Result extends Component {
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
      <div>
        <div>
          <h1>Det virker sku</h1>
          <button onClick={this.createPdf}>Create PDF</button>
          <button>Increment</button>
        </div>
      </div>
    );
  }
}

export default Result;
