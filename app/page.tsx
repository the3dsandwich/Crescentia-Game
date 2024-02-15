"use client";

import Login from "./components/login";
import { CircularProgress } from "@mui/material";
import { useFirebase } from "@/utilities/useFirebase";
import { useFirebaseLogin } from "@/utilities/useFirebaseLogin";
import Main from "./components/main";

export default function Home() {
  useFirebase();
  const { signedIn, loading } = useFirebaseLogin();

  if (loading) {
    return (
      <CircularProgress
        style={{ position: "absolute", top: "30%", left: "45%" }}
      />
    );
  }
  return signedIn ? <Main /> : <Login />;
}
