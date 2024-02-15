"use client";

import React from "react";
import { Grid, Typography, Fab, Tooltip } from "@mui/material";
import { Add, UpdateOutlined } from "@mui/icons-material";
import { useFirebaseLogin } from "@/utilities/useFirebaseLogin";

const Login = () => {
  const { signInAnonymously, signInWithGoogle } = useFirebaseLogin();
  return (
    <Grid
      component="main"
      container={true}
      justifyContent="center"
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
        justifyContent="center"
        spacing={40}
      >
        <Grid item>
          <Tooltip title="new game">
            <Fab color="primary" onClick={signInAnonymously}>
              <Add />
            </Fab>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="continue">
            <Fab color="secondary" onClick={signInWithGoogle}>
              <UpdateOutlined />
            </Fab>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
