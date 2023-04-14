// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  firebaseConfig : {
    apiKey: "AIzaSyC3EGfNUziKHujJqhN0LoVljz64heB85-E",
    authDomain: "thesis-project-progress.firebaseapp.com",
    databaseURL: "https://thesis-project-progress-default-rtdb.firebaseio.com/",
    projectId: "thesis-project-progress",
    storageBucket: "thesis-project-progress.appspot.com",
    messagingSenderId: "378145649996",
    appId: "1:378145649996:web:d5d3d14b82c818aa9f0be9",
    measurementId: "G-QJSX6CCNT0"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
