import { Container } from "unstated";

class NavigationContainer extends Container {
  constructor(props) {
    super(props);
    this.state = {
      housingType: props.housingType || "",
      currentPage: props.housingType ? 4 : 0,
      maxPage: props.housingType ? 4 : 0,
      pages: [
        { label: "Hjem", route: "/start" },
        { label: "Husstand", route: "/beboere" },
        { label: "Køkken", route: "/kokken" },
        { label: "Stuen & andre rum", route: "/stue" },
        { label: "Vasketøj", route: "/vasketoj" },
        { label: "Opvarmning", route: "/opvarmning" }
      ]
    };
  }

  prevPage = () => {
    if (this.state.currentPage > 0) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  };

  getPrevPage = () => {
    var p = this.state.currentPage;
    if (p > 0) {
      p = p - 1;
    } else {
      p = 0;
    }
    this.setState({ currentPage: p });
    return this.state.pages[p].route;
  };

  getNextPage = type => {
    let p = this.state.currentPage;
    if (type) {
      this.setState({ housingType: type });
    }

    if (p === this.state.maxPage) {
      this.setState({ maxPage: this.state.maxPage + 1 });
    }

    this.setState({ currentPage: p + 1 });

    return this.state.pages[p + 1].route;
  };

  setPage = index => {
    this.setState({ currentPage: index });
  };

  getPage = () => {
    return this.state.pages[this.state.currentPage].route;
  };
}

export default NavigationContainer;
