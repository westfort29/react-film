import * as React from "react";
import { SaySomeThing } from "./scripts";

export class App extends React.PureComponent {
  render() {
    return (
      <main>
        <SaySomeThing say="Hi" />
      </main>
    );
  }
}
