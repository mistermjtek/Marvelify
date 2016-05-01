angular.module('login-controller', [])

.controller('LoginCtrl', function($scope, Auth, $http, $state, $rootScope) {

  $scope.user = {
    username: '',
    password: ''
  }

  $scope.buttonText = 'Login';
  $scope.labelText = 'No Account? Sign Up Here!'

  var marvelApiKey = '8840657df7518a8f93eb0ece030f5091';

  var getMarvel = function() {
    // $http.get('http://gateway.marvel.com/v1/public/characters?apikey=8840657df7518a8f93eb0ece030f5091');
    $http({
      method: 'GET',
      url: 'http://gateway.marvel.com/v1/public/characters?',
      params: {apikey: marvelApiKey}
    }).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    });
  }

  // getMarvel();

  var signUp = function(user) {
    Auth.$createUser({
  email: user.username,
  password: user.password
}).then(function(userData) {
  console.log("User " + userData.uid + " created successfully!");

  return Auth.$authWithPassword({
    email: user.username,
    password: user.password
  });
}).then(function(authData) {
  console.log("Logged in as:", authData.uid);
  $rootScope.userData = authData;
  $state.go('onboard');
}).catch(function(error) {
  console.error("Error: ", error);
});
  }

  $scope.signUpMode = function() {

    $scope.user = {
    username: '',
    password: ''
  }

    $scope.buttonText = ($scope.buttonText === 'Login') ? 'Sign Up' : 'Login';
    $scope.showConfirmPassword = ($scope.buttonText === 'Login') ? false : true;
    $scope.labelText = ($scope.buttonText === 'Login') ? 'No Account? Sign Up Here!' : 'Back to Login';
  }

  $scope.submit = function(user) {
    if ($scope.buttonText === 'Sign Up') {
      signUp(user);
    } else {
      login(user);
    }
  }

  var login = function(userData) {

    Auth.$authWithPassword({
  email: userData.username,
  password: userData.password
}).then(function(authData) {
  console.log("Logged in as:", authData.uid);
  $rootScope.userData = authData;
  $state.go('home');
}).catch(function(error) {
  console.error("Authentication failed:", error);
});
    // Auth.$authWithOAuthRedirect("facebook").then(function(authData) {
    //   console.log(authData);
    //   $rootScope.userData = authData;
    //   $state.go('home');
    //   // User successfully logged in
    // }).catch(function(error) {
    //   if (error.code === "TRANSPORT_UNAVAILABLE") {
    //     Auth.$authWithOAuthPopup("facebook").then(function(authData) {
    //       // User successfully logged in.
    //       console.log(authData);
    //       $rootScope.userData = authData;
    //       $state.go('home');
    //     });
    //   } else {
    //     // Another error occurred
    //     console.log(error);
    //   }
    // });
  };
});

