angular.module('auth-service', [])

.factory("Auth", function($firebaseAuth) {
  var usersRef = new Firebase("https//marvelify.firebaseio.com/users");
  return $firebaseAuth(usersRef);
})

.factory("FirebaseAPI", function($firebaseArray) {
  var ref = new Firebase("https//marvelify.firebaseio.com/users/");
  return $firebaseArray(ref);
})

	.factory('Users', function($firebaseArray, $firebaseObject){

		//create a reference to the users node

		//data in firebase is stored in a tree structure and child nodes can be referenced by 
		//adding a path to our FirebaseUrl so https://firebase-name-here.firebase.io.com/users 
		//refers to the users node.
		var usersRef = new Firebase('https//marvelify.firebaseio.com/users');

		//create a $firebaseArray using the reference
		var users = $firebaseArray(usersRef); 

		var Users = {

			//allows us to get a $firebaseObject of a specific user's profile
			getProfile: function(uid){
				return $firebaseObject(usersRef.child(uid));
			},
			//helper function that returns a user's displayname when given a uid
			getDisplayNames: function(uid){
				return users.$getRecord(uid).displayName;
			},
			all: users
		};
		return Users;

	})

.factory("LikeAPI", function($firebaseArray) {
  var ref = new Firebase("https//marvelify.firebaseio.com/likes/");
  return $firebaseArray(ref);
})

.factory("Items", function($firebaseArray) {
  var itemsRef = new Firebase("https://marvelify.firebaseio.com/items");
  return $firebaseArray(itemsRef);
});