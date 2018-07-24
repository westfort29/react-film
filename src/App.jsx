import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppFooter from "./scripts/components/AppFooter";
import FilmsSearchWrapper from "./scripts/components/FilmsSearchWrapper";
import FilmPage from "./scripts/components/FilmPage";
import ErrorBoundary from "./scripts/components/ErrorBoundary";

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
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
