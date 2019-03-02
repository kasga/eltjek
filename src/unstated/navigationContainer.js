import { Container } from "unstated";
import scrollToElement from "scroll-to-element";

// GOOGLE analytics
import ReactGA from "react-ga";

class NavigationContainer extends Container {
  constructor(props) {
    super(props);
    this.state = {
      housingType: props.housingType || "",
      currentPage: props.housingType ? 1 : 0,
      maxPage: props.housingType ? 1 : 0,
      pages: [
        { label: "Hjem", route: "/start" },
        { label: "Husstand", route: "/beboere" },
        { label: "Køkken", route: "/kokken" },
        { label: "Stuen & andre rum", route: "/stue" },
        { label: "Vasketøj", route: "/vasketoj" },
        { label: "Opvarmning", route: "/opvarmning" },
        { label: "Dit resultat", route: "/resultat" }
      ]
    };

    this.initializeReactGA();
  }

  initializeReactGA = () => {
    ReactGA.initialize("UA-63269475-1");
  };

  GAevent = type => {
    let gatype;
    let galabel;
    let currentPage = -1;

    if (type === "pdf") {
      ReactGA.ga("send", {
        hitType: "event",
        eventCategory: "Eltjeck",
        eventAction: "klik",
        eventLabel: "pdf"
      });
    } else if (type === "shop") {
      ReactGA.ga("send", {
        hitType: "event",
        eventCategory: "Eltjeck",
        eventAction: "klik",
        eventLabel: "shop"
      });
    } else if (type === "energiraadgiver") {
      ReactGA.ga("send", {
        hitType: "event",
        eventCategory: "Eltjeck",
        eventAction: "klik",
        eventLabel: "energiraadgiver"
      });
    } else if (currentPage !== this.state.currentPage) {
      if (this.state.currentPage === 1) {
        gatype = "step";
        galabel = "1 husstand";
        currentPage = this.state.currentPage;
      } else if (this.state.currentPage === 2) {
        gatype = "step";
        galabel = "2 kokken";
        currentPage = this.state.currentPage;
      } else if (this.state.currentPage === 3) {
        gatype = "step";
        galabel = "3 stue";
        currentPage = this.state.currentPage;
      } else if (this.state.currentPage === 4) {
        gatype = "step";
        galabel = "4 vask";
        currentPage = this.state.currentPage;
      } else if (this.state.currentPage === 5) {
        gatype = "step";
        galabel = "5 opvarmning";
        currentPage = this.state.currentPage;
      } else if (this.state.currentPage === 6) {
        gatype = "step";
        galabel = "6 resultat";
        currentPage = this.state.currentPage;
      }

      ReactGA.ga("send", {
        hitType: "event",
        eventCategory: "Eltjeck",
        eventAction: gatype,
        eventLabel: galabel
      });
    }
  };

  scrollToTop = () => {
    scrollToElement("#o-eltjek", {
      offset: -200,
      ease: "out-sine",
      duration: 500
    });
  };

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
    this.setState(
      prevState => ({ currentPage: p }),
      () => {
        this.GAevent("step");
      }
    );

    this.scrollToTop();

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

    this.setState(
      prevState => ({ currentPage: p + 1 }),
      () => {
        this.GAevent("step");
      }
    );

    this.scrollToTop();

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
