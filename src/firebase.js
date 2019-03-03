import firebase from "firebase";

class fb {
  constructor() {
    this.base = firebase.initializeApp({
      apiKey: "AIzaSyC5YHN0rIGUW5ngmqT6Mx9dq5XtWrKuGfg",
      authDomain: "crescentia-51c6a.firebaseapp.com",
      databaseURL: "https://crescentia-51c6a.firebaseio.com",
      projectId: "crescentia-51c6a",
      storageBucket: "crescentia-51c6a.appspot.com",
      messagingSenderId: "837751460256",
    });
    this.cresInterval = null;
  }

  signInAnonymously = () => {
    this.signOut();
    this.base.auth().signInAnonymously();
  };

  signInWithGoogle = () => {
    this.signOut();
    this.base.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  };

  signOut = () => {
    this.intervalClear();
    if (firebase.auth().currentUser)
      if (firebase.auth().currentUser.isAnonymous)
        this.base
          .database()
          .ref("userData")
          .child(firebase.auth().currentUser.uid)
          .once("value")
          .then(snap =>
            this.base
              .database()
              .ref("universal")
              .child(firebase.auth().currentUser.uid)
              .set(snap.val())
              .then(
                this.base
                  .database()
                  .ref("userData")
                  .child(firebase.auth().currentUser.uid)
                  .remove()
              )
              .then(this.base.auth().signOut())
          );
      else this.base.auth().signOut();
  };

  loadProgress = uid =>
    this.base
      .database()
      .ref("universal")
      .child(uid)
      .once("value")
      .then(snap =>
        this.base
          .database()
          .ref("userData")
          .child(firebase.auth().currentUser.uid)
          .set(snap.val())
          .then(
            this.base
              .database()
              .ref("universal")
              .child(uid)
              .remove()
          )
      );

  intervalStart = user => {
    this.cresInterval = setInterval(() => this.crescPush(user), 950);
  };

  intervalClear = () => {
    clearInterval(this.cresInterval);
  };

  authStateDriver = callBack => {
    this.base.auth().onAuthStateChanged(user => {
      if (user) {
        // user is logged in
        this.intervalStart(user);
        this.base
          .database()
          .ref("userData")
          .child(user.uid)
          .on("value", snap =>
            callBack({
              user,
              progress: snap.val() ? snap.val() : { level: 1, value: 0 },
              signedIn: true,
            })
          );
      } else {
        // user is logged out
        callBack({ signedIn: false });
      }
    });
  };

  crescPush = user =>
    this.base
      .database()
      .ref("userData")
      .child(user.uid)
      .once("value")
      .then(snap =>
        this.base
          .database()
          .ref("userData")
          .child(user.uid)
          .update({
            level: snap.val() ? snap.val().level : 1,
            value: snap.val() ? snap.val().level + snap.val().value : 0,
          })
      );

  lvlUpCost = level => 100 + 10 * level * level;

  lvlUpPush = user =>
    this.base
      .database()
      .ref("userData")
      .child(user.uid)
      .once("value")
      .then(snap => {
        if (snap.val())
          this.base
            .database()
            .ref("userData")
            .child(user.uid)
            .update({
              value: snap.val().value - this.lvlUpCost(snap.val().level),
              level: snap.val().level + 1,
            });
      });
}
export { fb };
