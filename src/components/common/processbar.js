import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Subscribe } from "unstated";
import NavigationContainer from "../../unstated/navigationContainer";

class ProcessBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: null,
      hoverPage: null
    };
  }

  circleOver = index => {
    this.setState({ hoverPage: index });
  };

  circleOut = () => {
    this.setState({ hoverPage: null });
  };

  render() {
    return (
      <Subscribe to={[NavigationContainer]}>
        {navigationContainer => (
          <div id="o-processbar">
            <div className="o-process-circles">
              <div className="o-process-circles-container">
                <div className="o-process-line" />
                {navigationContainer.state.pages.map((page, index) => {
                  if (index === navigationContainer.state.currentPage) {
                    return (
                      <div className="o-process-circle-container" key={index}>
                        <Link
                          key={index}
                          to={page.route}
                          className="o-process-circle visited"
                          onMouseOver={() => this.circleOver(index)}
                          onMouseOut={() =>
                            this.circleOut(
                              navigationContainer.state.currentPage
                            )
                          }
                        >
                          {index}
                        </Link>
                        <div
                          className={
                            "o-process-circle-label" +
                            (this.state.hoverPage === null ||
                            this.state.hoverPage === index
                              ? " show"
                              : "")
                          }
                        >
                          {page.label}
                        </div>
                      </div>
                    );
                  } else if (
                    index > 0 &&
                    index <= navigationContainer.state.maxPage
                  ) {
                    return (
                      <div className="o-process-circle-container" key={index}>
                        <Link
                          key={index}
                          to={page.route}
                          className="o-process-circle visited"
                          onMouseOver={() => this.circleOver(index)}
                          onMouseOut={() =>
                            this.circleOut(
                              navigationContainer.state.currentPage
                            )
                          }
                          onClick={() => navigationContainer.setPage(index)}
                        >
                          {index}
                        </Link>
                        <div
                          className={
                            "o-process-circle-label" +
                            (this.state.hoverPage === index ? " show" : "")
                          }
                        >
                          {page.label}
                        </div>
                      </div>
                    );
                  } else if (index > navigationContainer.state.maxPage) {
                    return (
                      <div className="o-process-circle-container" key={index}>
                        <div
                          key={index}
                          className="o-process-circle"
                          onMouseOver={() => this.circleOver(index)}
                          onMouseOut={() =>
                            this.circleOut(
                              navigationContainer.state.currentPage
                            )
                          }
                        >
                          {index}
                        </div>
                        <div
                          className={
                            "o-process-circle-label" +
                            (this.state.hoverPage === index ? " show" : "")
                          }
                        >
                          {page.label}
                        </div>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
          </div>
        )}
      </Subscribe>
    );
  }
}

export default ProcessBar;
