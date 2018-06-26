import * as React from "react";
import { AppFooter, FilmsSearchWrapper, FilmPage, ErrorBoundary } from "./scripts";

export class App extends React.PureComponent {
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
