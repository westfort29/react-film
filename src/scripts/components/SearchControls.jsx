import * as React from "react";

export default class SearchControls extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="search-controls">
        <div className="search-controls__background-shading"></div>
        <section className="search-controls__content">
          <h1 className="search-controls__heading">Find your movie</h1>
          <input className="search-controls__search-input"
            type="text"
            placeholder="Search"
            ref={this.props.searchInputRef}
            onKeyUp={ (event)=> { if (event.nativeEvent.keyCode === 13) {this.props.onSearchClick()}} }
          />
          <div className="search-controls__controls">
            <ul className="search-controls__search-by-list"> Search by:

              {this.props.searchByOptions.map(option => (
                  <li className="search-controls__search-by-item" key={option.id}>
                    <button
                      className={"search-controls__button " + (!option.isActive && "search-controls__button--inactive")}
                      onClick={this.props.onSearchOptionClick.bind(null, option)}
                    >
                      {option.name}
                    </button>
                  </li>
              ))}
            </ul>
            <button className="search-controls__button search-controls__button--large" onClick={this.props.onSearchClick}> Search </button>
          </div>
        </section>
      </section>
    );
  }
}

