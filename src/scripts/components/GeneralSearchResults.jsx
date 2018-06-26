import * as React from "react";

const GeneralSearchResults = ({amount, searchSortingTypes, onSortOptionClick}) =>
  (<div className="general-search-results">
    <div className="general-search-results__movies-found">
    { amount } Movies found
    </div>
    <div className="general-search-results__sorting-options">
     Sort by: 
     {searchSortingTypes.map(sortingType => (
          sortingType.isActive ? 
          <button
            className="general-search-results__sorting-button general-search-results__sorting-button--active"
            key={sortingType.name}
          >
            {sortingType.name}
          </button> :
          <button
            className="general-search-results__sorting-button"
            key={sortingType.name}
            onClick={onSortOptionClick.bind(null, sortingType)}
          >
            {sortingType.name}
          </button>
        )
      )}
    </div>
  </div>
  );

export default GeneralSearchResults;
