angular.module('auth-service', [])

.factory("Auth", function($firebaseAuth) {
  var usersRef = new Firebase("https//marvelify.firebaseio.com/users");
  return $firebaseAuth(usersRef);
})

.factory("FirebaseAPI", function($firebaseArray) {
  var ref = new Firebase("https//marvelify.firebaseio.com/users/");
  return $firebaseArray(ref);
})

.factory("Items", function($firebaseArray) {
  var itemsRef = new Firebase("https://marvelify.firebaseio.com/items");
  return $firebaseArray(itemsRef);
});