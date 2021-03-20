window.onload = () => {
  var firebaseConfig = {
    apiKey: "AIzaSyCK52EI2vlm53OQJsss1r8sIpBuJFMmuic",
    authDomain: "ecommerce-project-1b257.firebaseapp.com",
    databaseURL: "https://ecommerce-project-1b257.firebaseio.com",
    projectId: "ecommerce-project-1b257",
    storageBucket: "ecommerce-project-1b257.appspot.com",
    messagingSenderId: "295315692321",
    appId: "1:295315692321:web:bb411649485bfdf67dfc60",
    measurementId: "G-ZQD1ZECBZ1",
  };
  firebase.initializeApp(firebaseConfig);

  firebase.auth().onAuthStateChanged((user) => {
    const { screenName, otherInfo } =  view.handlePatchName(window.location.hash);
    if (user) {
      model.currentUser = {
        name: user.displayName,
        email: user.email,
      };
     
      if (user.emailVerified) {

        view.userRole();
        view.setActiveScreen(screenName, otherInfo);

      } else {
        alert("Please Verified Your Email");
        firebase.auth().signOut();
      }
    } else {
      view.setActiveScreen(screenName, otherInfo);
    }
  });
};
