import React from "react";
import "./App.css";
import LifecycleComponentFunctional from "./components/functionComponents";
import LifecycleComponentMyExample from "./components/classesComponents";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTimer: true
    };
    this.handleUnmount = this.handleUnmount.bind(this);
  }
  handleUnmount() {
    this.setState((prevState) => ({
      showTimer: !prevState.showTimer
    }));
  }

  render() {
    return (
      <div className="container">
        <LifecycleComponentMyExample />
        <LifecycleComponentFunctional />
      </div>
    );
  }
}
export default App;
