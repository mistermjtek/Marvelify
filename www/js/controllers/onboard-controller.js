angular.module('onboard-controller', [])

.controller('OnboardCtrl', function($scope, $ionicHistory, $rootScope, $firebaseArray, $cordovaCamera) {

	$scope.user = {
		fullName: '',
		gender: '',
		age: 0,
		description: '',
		image: null
	}

	$ionicHistory.clearHistory();

	$scope.submitForm = function(user) {

	var ref = new Firebase('https://marvelify.firebaseio.com/users/'+ $rootScope.userData.uid);
	var sync = $firebaseArray(ref);
		console.log(user);
		sync.$add({
                    fullName: user.fullName,
                    gender: user.gender,
                    age: user.age,
                    description: user.description,
                    image: user.image
                }).then(function(ref) {
  var id = ref.key();
  console.log("added record with id " + id);
  sync.$indexFor(id); // returns location in the array
});
  	// sync.$set({ email: user.email, provider: user.provider });
	}

	 $scope.upload = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {
        	$scope.user.image = imageData;
        }, function(error) {
            console.error(error);
        });
    }

});
