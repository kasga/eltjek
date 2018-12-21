import { Container } from "unstated";

class QuestionsContainer extends Container {
  constructor(props = {}) {
    super();
    this.state = {
      residents: {
        adults: undefined,
        teenagers: undefined,
        children: undefined,
        stayAtHome: undefined,
        residentalSize: ""
      },
      kitchen: {
        stove: undefined,
        fridge: undefined,
        dishwasher: undefined,
        dishwasherFrequence: ""
      },
      livingroom: {
        tv: "",
        tvBoxes: "",
        computers: "",
        consols: "",
        lamps: ""
      },
      washing: {
        washingmachine: undefined,
        washingmachineFrequence: "",
        dryer: undefined,
        dryerFrequence: ""
      }
    };
  }

  updateRadio = (index, key, value) => {
    this.setState({ [index]: { ...this.state[index], [key]: value } });
  };

  updateNumber = (index, key, value) => {
    const re = /^[0-9\b]+$/;
    if (value === "" || re.test(value)) {
      this.setState({ [index]: { ...this.state[index], [key]: value } });
    }
  };

  updateSelecMenu = (index, key, value) => {
    this.setState({
      [index]: { ...this.state[index], [key]: value }
    });
  };
}

export default QuestionsContainer;
