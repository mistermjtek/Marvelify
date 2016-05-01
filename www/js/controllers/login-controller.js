angular.module('login-controller', [])

.controller('LoginCtrl', function($scope, Auth, $http, $state, $rootScope, $ionicLoading) {

  $scope.user = {
    username: '',
    password: ''
  }

  $scope.buttonText = 'Login';
  $scope.labelText = 'No Account? Sign Up Here!';

  var signUp = function(user) {
    $ionicLoading.show();
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
}).finally(function() {
  ionicLoading.hide();
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
    $ionicLoading.show();
    Auth.$authWithPassword({
  email: userData.username,
  password: userData.password
}).then(function(authData) {
  console.log("Logged in as:", authData.uid);
  $rootScope.userData = authData;
  $state.go('home');
}).catch(function(error) {
  console.error("Authentication failed:", error);
}).finally(function() {
  $ionicLoading.hide();
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

