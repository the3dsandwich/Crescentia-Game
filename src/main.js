import React, { Component } from "react";
import {
  Grid,
  Typography,
  Button,
  Tooltip,
  Fab,
  Input,
} from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { progressId: "" };
    this.firebase = this.props.firebase;
  }

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
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption" align="center">
            Level {this.props.user.progress.level}
          </Typography>
          <Button
            fullWidth
            onClick={() => this.firebase.lvlUpPush(this.props.user.user)}
            disabled={
              this.props.user.progress.value <
              this.firebase.lvlUpCost(this.props.user.progress.level)
            }
          >
            Level Up! ({this.firebase.lvlUpCost(this.props.user.progress.level)}
            )
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h1" align="center">
            {this.props.user.progress.value}
          </Typography>
          <Typography variant="caption" align="center">
            Cresc.
          </Typography>
        </Grid>

        {this.props.user.user.isAnonymous ? (
          <Grid item xs={12} style={{ position: "absolute", bottom: 120 }}>
            <Typography variant="caption" align="center">
              To load progress after creating new account, enter this token
              after signing up:
            </Typography>
            <Typography variant="caption" align="center">
              {this.props.user.user.uid}
            </Typography>
          </Grid>
        ) : this.props.user.progress.level === 1 ? (
          <form
            onSubmit={e => {
              e.preventDefault();
              if (this.state.progressId)
                this.firebase.loadProgress(this.state.progressId);
            }}
          >
            <Grid item xs={12}>
              <Input
                fullWidth
                value={this.state.progressId}
                onChange={e => this.setState({ progressId: e.target.value })}
              />
              <Button fullWidth type="submit">
                Load progress
              </Button>
            </Grid>
          </form>
        ) : null}

        <Tooltip
          title={
            this.props.user.user.isAnonymous
              ? "save and leave game"
              : "save and sign out"
          }
        >
          <Fab
            color="primary"
            style={{ position: "absolute", right: 30, bottom: 30 }}
            onClick={this.firebase.signOut}
          >
            <ExitToApp />
          </Fab>
        </Tooltip>
      </Grid>
    );
  }
}

export default App;
