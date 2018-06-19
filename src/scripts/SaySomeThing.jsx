import * as React from "react";

export class SaySomeThing extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return <h1>{this.props.say}</h1>;
  }
}

