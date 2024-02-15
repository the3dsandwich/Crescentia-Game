import React, { Component } from "react";
import { fb } from "./firebase";
import Main from "./main";
import Login from "./login";
import { CircularProgress } from "@material-ui/core";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, user: { signedIn: false } };
    this.firebase = new fb();
    this.firebase.authStateDriver(user =>
      this.setState(user, this.setState({ loading: false }))
    );
  }

  render() {
    if (this.state.loading)
      return (
        <CircularProgress
          style={{ position: "absolute", top: "30%", left: "45%" }}
        />
      );
    else if (this.state.signedIn)
      return <Main user={this.state} firebase={this.firebase} />;
    else return <Login user={this.state} firebase={this.firebase} />;
  }
}

export default App;
