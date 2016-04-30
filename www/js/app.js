// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'ionic.contrib.ui.tinderCards' is found in ionic.tdcards.js
angular.module('marvelify', ['ionic', 
  'firebase',
  'ionic.contrib.ui.tinderCards', 
  'marvelify.cardController', 
  'auth-service', 
  'login-controller'])

// .run(function(Auth) {
//   Auth.$onAuth(function(authData) {
//   if (authData === null) {
//     console.log("Not logged in yet");
//   } else {
//     console.log("Logged in as", authData.uid);
//   }
// });
// })

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })
    // .state('tabs', {
    //   url: '/tab',
    //   abstract: true,
    //   templateUrl: 'templates/tabs.html'
    // })
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'CardsCtrl'
    })
    // .state('tabs.facts', {
    //   url: '/facts',
    //   views: {
    //     'home-tab': {
    //       templateUrl: 'templates/facts.html'
    //     }
    //   }
    // })


   $urlRouterProvider.otherwise('/login');

});
