// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
  // Initialize Firebase
    apiKey: "AIzaSyDNh-tQVTf58k_0NdOgLgDqyGOUk-r32fM",
    authDomain: "newcityshopping-e9b2e.firebaseapp.com",
    databaseURL: "https://newcityshopping-e9b2e.firebaseio.com",
    projectId: "newcityshopping-e9b2e",
    storageBucket: "newcityshopping-e9b2e.appspot.com",
    messagingSenderId: "664027505960"
  }
};
