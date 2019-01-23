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
                          {index ===
                          navigationContainer.state.pages.length - 1 ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="16"
                              viewBox="0 0 18 16"
                              fill="none"
                              className="o-checkmark"
                            >
                              <path d="M6.26176 16C6.04651 16 5.85083 15.9179 5.71386 15.7538L0.234816 10.0092C-0.078272 9.68099 -0.078272 9.16808 0.234816 8.83982C0.547904 8.51156 1.03711 8.51156 1.35019 8.83982L6.20306 13.9484L16.6132 0.305053C16.8872 -0.043724 17.3764 -0.105272 17.709 0.181955C18.0417 0.469183 18.1004 0.98209 17.8265 1.33087L6.86837 15.6923C6.73139 15.8769 6.51615 15.9795 6.3009 16C6.28133 16 6.28133 16 6.26176 16Z" />
                            </svg>
                          ) : (
                            index
                          )}
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
                          {index ===
                          navigationContainer.state.pages.length - 1 ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="16"
                              viewBox="0 0 18 16"
                              fill="none"
                              className="o-checkmark"
                            >
                              <path d="M6.26176 16C6.04651 16 5.85083 15.9179 5.71386 15.7538L0.234816 10.0092C-0.078272 9.68099 -0.078272 9.16808 0.234816 8.83982C0.547904 8.51156 1.03711 8.51156 1.35019 8.83982L6.20306 13.9484L16.6132 0.305053C16.8872 -0.043724 17.3764 -0.105272 17.709 0.181955C18.0417 0.469183 18.1004 0.98209 17.8265 1.33087L6.86837 15.6923C6.73139 15.8769 6.51615 15.9795 6.3009 16C6.28133 16 6.28133 16 6.26176 16Z" />
                            </svg>
                          ) : (
                            index
                          )}
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
