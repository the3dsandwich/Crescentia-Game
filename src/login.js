import React, { Component } from "react";
import { Grid, Typography, Fab, Tooltip } from "@material-ui/core";
import { UpdateOutlined, Add } from "@material-ui/icons";

class App extends Component {
  render() {
    return (
      <Grid
        container
        justify="center"
        alignContent="center"
        style={{ height: 500 }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Crescentia
          </Typography>
          <Typography variant="body1" align="center">
            Start crescenting.
          </Typography>
        </Grid>
        <Grid
          style={{ position: "relative", top: 20 }}
          item
          xs={12}
          container
          direction="row"
          justify="center"
          spacing={40}
        >
          <Grid item>
            <Tooltip title="new game">
              <Fab
                color="primary"
                onClick={this.props.firebase.signInAnonymously}
              >
                <Add />
              </Fab>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="continue">
              <Fab
                color="secondary"
                onClick={this.props.firebase.signInWithGoogle}
              >
                <UpdateOutlined />
              </Fab>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default App;
