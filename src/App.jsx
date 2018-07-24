import * as React from "react";
import { connect } from 'react-redux';
import { AppFooter, FilmsSearchWrapper, FilmPage, ErrorBoundary } from "./scripts";

class App extends React.PureComponent {
  render() {
    return (
      <main>
        <ErrorBoundary>
          <FilmsSearchWrapper />
          <FilmPage />
          <AppFooter />
        </ErrorBoundary>
      </main>
    );
  }
}

function mapStateToProps (state) {
  return {
    someProp: state.someProp
  }
}

export default connect(mapStateToProps)(App)
