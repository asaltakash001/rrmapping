import { register } from 'register-service-worker'
// import firebase from "firebase";

// const firebaseConfig = {
//   apiKey: "AIzaSyAjtSthm2w4xEnk8FnBvYe-ek-DH6AGH28",
//   authDomain: "vuejs-8f137.firebaseapp.com",
//   projectId: "vuejs-8f137",
//   storageBucket: "vuejs-8f137.appspot.com",
//   messagingSenderId: "894036306098",
//   appId: "1:894036306098:web:2e248eff083f2450bf81ab",
//   measurementId: "G-Y0KF69FRVE"
// };

// firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();
// messaging.usePublicVapidKey("BAth2MrJxGRhBWVSnqkZDr9C3cVGfyzSDKYV8OpxVE8X_SZ9E9LkBNJKJNiB8k-nKMai3WYm_PzMNNK0AfcmLq4"); 
// messaging.requestPermission().then(() => {
//   console.log('Notification permission granted.');
//   messaging.getToken().then((token) => {
//     console.log(token)
//   })
// }).catch((err) => {
//   console.log('Unable to get permission to notify.', err);
// });

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log('Service worker has been ready.')
    },
    registered () {
      console.log('Service worker has been registered.')
      Notification.requestPermission(function(result) {
        if (result === 'granted') {
          navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification('Vibration Sample', {
              body: 'Hi Akash !...',
              icon: '../img/icons/apple-touch-icon.png',
              vibrate: [200, 100, 200, 100, 200, 100, 200],
              tag: 'vibration-sample'
            })
          });
        }
      });
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      console.log('New content is available; please refresh.')
      
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}

// Notification.requestPermission(function(result) {
//   if (result === 'granted') {
//     navigator.serviceWorker.ready.then(function(registration) {
//       registration.getNotifications({
//             body: 'Buzz! Buzz!',
//             icon: '../images/touch/chrome-touch-icon-192x192.png',
//             vibrate: [200, 100, 200, 100, 200, 100, 200],
//             tag: 'vibration-sample'
//           }).then(function(notifications) {
//             console.log(notifications)
//       })
//     });
//     navigator.serviceWorker.ready.then(function(registration) {
//       console.log(registration)
//       console.log(registration.scope)
//       registration.showNotification('Vibration Sample', {
//         body: 'Buzz! Buzz!',
//         icon: '../images/touch/chrome-touch-icon-192x192.png',
//         vibrate: [200, 100, 200, 100, 200, 100, 200],
//         tag: 'vibration-sample'
//       }).then(x=> console.log(x))
//     });
//   }
// });