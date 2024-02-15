"use client";

import { FirebaseApp, initializeApp } from "firebase/app";
import { useEffect, useState } from "react";

export const useFirebase = () => {
  const [base, setBase] = useState<FirebaseApp | null>(null);

  useEffect(() => {
    if (base !== null) return;
    setBase(
      initializeApp({
        apiKey: "AIzaSyC5YHN0rIGUW5ngmqT6Mx9dq5XtWrKuGfg",
        authDomain: "crescentia-51c6a.firebaseapp.com",
        databaseURL: "https://crescentia-51c6a.firebaseio.com",
        projectId: "crescentia-51c6a",
        storageBucket: "crescentia-51c6a.appspot.com",
        messagingSenderId: "837751460256",
      })
    );
  }, [base]);
};
