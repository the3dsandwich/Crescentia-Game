"use client";

import {
  onAuthStateChanged as firebaseOnAuthStateChanged,
  User,
  getAuth,
} from "firebase/auth";
import { ref, set, get, getDatabase } from "firebase/database";
import { useEffect, useState } from "react";
import { useFirebaseLogin } from "./useFirebaseLogin";

export const useFirebaseUserData = () => {
  const { currentUser } = useFirebaseLogin();
  const [progress, setProgress] = useState<UserData>({ value: 0, level: 1 });
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    const getAndSetProgress = async (uid: string) => {
      const loadedProgress = await loadProgress(uid);
      if (loadProgress !== undefined) {
        setProgress({
          level: loadedProgress?.level ?? 1,
          value: loadedProgress?.value ?? 0,
        });
      }
      setLoadingProgress(false);
    };

    return firebaseOnAuthStateChanged(getAuth(), (user) => {
      setLoadingProgress(true);
      if (user === null) {
        return;
      }
      getAndSetProgress(user.uid);
    });
  }, [currentUser]);

  useEffect(() => {
    if (currentUser === null) return;
    if (loadingProgress === true) return;

    const updateProgress = async (user: User, progress: UserData) => {
      const userDataRef = ref(getDatabase(), `userData/${user.uid}`);
      await set(userDataRef, progress);
    };

    updateProgress(currentUser, progress);
  }, [progress, currentUser, loadingProgress]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress({
        ...progress,
        value: progress.value + progress.level,
      });
    }, 950);
    return () => clearInterval(interval);
  });

  const levelUp = () => {
    setProgress({
      value: progress.value - lvlUpCost(progress.level),
      level: progress.level + 1,
    });
  };

  const loadProgress = async (uid: string): Promise<UserData | undefined> => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser === null) return undefined;
    const universalRef = ref(getDatabase(), `universal/${uid}`);
    const userDataRef = ref(getDatabase(), `userData/${uid}`);
    const universalData = await (await get(universalRef)).val();
    if (universalData !== null) {
      await set(userDataRef, universalData);
      return universalData;
    } else {
      const userData = await (await get(userDataRef)).val();
      return userData;
    }
  };

  const lvlUpCost = (level: number) => 100 + 10 * level * level;

  const manualProgress = () => {
    setProgress({
      value: progress.value + progress.level,
      level: progress.level,
    });
  };

  return {
    loadProgress,
    lvlUpCost,
    levelUp,
    manualProgress,
    progress,
    loadingProgress,
  };
};
