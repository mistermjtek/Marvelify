angular.module('auth-service', [])

.factory("Auth", function($firebaseAuth) {
  var usersRef = new Firebase("https//marvelify.firebaseio.com/users");
  return $firebaseAuth(usersRef);
})

.factory("FirebaseAPI", function($firebaseAuth) {
  var ref = new Firebase("https//marvelify.firebaseio.com/users/");
  return ref;
})