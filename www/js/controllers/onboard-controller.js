angular.module('onboard-controller', [])

.controller('OnboardCtrl', function($scope, $ionicHistory, $rootScope, $firebaseArray, FirebaseAPI, $cordovaCamera) {

	$ionicHistory.clearHistory();

	$scope.submitForm = function(user) {
		console.log(user);
		FirebaseAPI.child("users").child($rootScope.userData.uid).set({
                    fullName: user.fullName,
                    gender: user.gender,
                    age: user.age
                });
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
        	alert(imageData);
            // syncArray.$add({image: imageData}).then(function() {
            //     alert("Image has been uploaded");
            // });
        }, function(error) {
            console.error(error);
        });
    }

});
