import React, { Component } from "react";

import Home from "./components/Home";

class App extends Component {
  constructor() {
    super();
    this.state = {};

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <Home></Home>
      </div>
    );
  }
}

export default App;
