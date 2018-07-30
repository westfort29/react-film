import * as React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppFooter from "./scripts/components/AppFooter";
import FilmsSearchWrapper from "./scripts/components/FilmsSearchWrapper";
import FilmPage from "./scripts/components/FilmPage";
import ErrorBoundary from "./scripts/components/ErrorBoundary";
import ErrorPage from "./scripts/components/ErrorPage"
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

class App extends React.PureComponent {
  render() {
    return (
      <main>
        <Router>
          <ErrorBoundary>
            <Switch>
              <Route path="/search" exact component={FilmsSearchWrapper} />
              <Route path="/film/:filmId" exact component={FilmPage} />
              <Route path="*" component={ErrorPage} />
            </Switch>

            <Redirect from="/" to={{pathname: "/search", search: location.search}}/>
            <AppFooter />
          </ErrorBoundary>
        </Router>
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
