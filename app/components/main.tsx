"use client";

import React, { useState } from "react";
import { Grid, Typography, Button, Tooltip, Fab, Input } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { useFirebaseLogin } from "@/utilities/useFirebaseLogin";
import { useFirebaseUserData } from "@/utilities/useFirebaseUserData";

const Main = () => {
  const { signOut, currentUser } = useFirebaseLogin();
  const {
    progress,
    lvlUpCost,
    levelUp,
    loadProgress,
    manualProgress,
    loadingProgress,
  } = useFirebaseUserData();
  const level = progress?.level ?? 1;
  const value = progress?.value ?? 0;
  const isAnonymous = currentUser?.isAnonymous ?? true;
  const [progressId, setProgressId] = useState("");

  return (
    !loadingProgress && (
      <Grid
        container
        direction="row"
        justifySelf="center"
        justifyContent="center"
        alignContent="center"
        style={{ height: 500 }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Crescentia
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign="center">
          <Typography variant="caption" align="center">
            Level {level}
          </Typography>
          <Button
            fullWidth
            onClick={levelUp}
            disabled={value < lvlUpCost(level)}
          >
            Level Up! ({lvlUpCost(level)})
          </Button>
          <Button fullWidth onClick={manualProgress}>
            STONK
          </Button>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h1" align="center">
            {value}
          </Typography>
          <Typography variant="caption" align="center">
            Cresc.
          </Typography>
        </Grid>

        {isAnonymous ? (
          <Grid
            item
            xs={12}
            style={{ position: "absolute", bottom: 120 }}
            textAlign="center"
          >
            <Typography variant="caption" align="center">
              To load progress after creating new account, enter this token
              after signing up:
            </Typography>
            <br />
            <Typography variant="caption" align="center">
              {currentUser?.uid}
            </Typography>
          </Grid>
        ) : (
          level === 1 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (progressId) loadProgress(progressId);
              }}
            >
              <Grid item xs={12} textAlign="center">
                <Input
                  fullWidth
                  value={progressId}
                  onChange={(e) => setProgressId(e.target.value)}
                />
                <Typography variant="caption" align="center">
                  You may recover progress at level 1
                </Typography>
                <Button fullWidth type="submit">
                  Load progress
                </Button>
              </Grid>
            </form>
          )
        )}

        <Tooltip
          title={isAnonymous ? "save and leave game" : "save and sign out"}
        >
          <Fab
            color="primary"
            style={{ position: "absolute", right: 30, bottom: 30 }}
            onClick={signOut}
          >
            <ExitToApp />
          </Fab>
        </Tooltip>
      </Grid>
    )
  );
};

export default Main;
