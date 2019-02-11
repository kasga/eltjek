import { Container } from "unstated";
import QuestionsContainer from "./questionsContainer";

class FetchData extends Container {
  constructor(props = {}) {
    super(props);

    this.fetchData();
  }

  // FETCHING & HANDELING DATA

  fetchData() {
    fetch("/data.json")
      .then(response => response.json())
      .then(parsedJSON => this.handleData(parsedJSON))
      .catch(error =>
        console.log(
          "Vi mangler data for at kunne fortsætte, opdater venligst browseren for at forsøge igen."
        )
      );
  }

  handleData(res) {
    QuestionsContainer.handleData(res);
  }
}

export default FetchData;
