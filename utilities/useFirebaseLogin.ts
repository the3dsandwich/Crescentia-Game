"use client";

import {
  signInAnonymously as firebaseSignInAnonymously,
  signInWithPopup as firebaseSignInWithPopup,
  GoogleAuthProvider,
  getAuth,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  User,
} from "firebase/auth";
import { ref, set, get, getDatabase, remove } from "firebase/database";
import { useEffect, useState } from "react";

export const useFirebaseLogin = () => {
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    console.log(`signedIn: ${signedIn}`);
  }, [signedIn]);

  useEffect(() => {
    return firebaseOnAuthStateChanged(getAuth(), (user) => {
      if (user !== null && user.uid === currentUser?.uid) {
        return;
      }
      setLoading(true);
      setCurrentUser(user);
      setSignedIn(user !== null);
      console.log(`auth state changed. user: ${user?.uid}`);
      setLoading(false);
    });
  }, [currentUser]);

  const signInAnonymously = () => {
    setLoading(true);
    firebaseSignInAnonymously(getAuth());
  };

  const signInWithGoogle = () => {
    setLoading(true);
    firebaseSignInWithPopup(getAuth(), new GoogleAuthProvider());
  };

  const signOut = async () => {
    setLoading(true);
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser === null) return;

    const isAnonymous = currentUser.isAnonymous;
    if (isAnonymous) {
      // move anonymous data
      const userDataRef = ref(getDatabase(), `userData/${currentUser.uid}`);
      const userData = await (await get(userDataRef)).val();

      const universalRef = ref(getDatabase(), `universal/${currentUser.uid}`);
      await set(universalRef, userData);
      await remove(userDataRef);
    }

    firebaseSignOut(auth);
  };

  return {
    signInAnonymously,
    signInWithGoogle,
    signOut,
    signedIn,
    loading,
    currentUser,
  };
};
