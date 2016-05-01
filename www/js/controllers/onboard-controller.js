angular.module('onboard-controller', [])

.controller('OnboardCtrl', function($scope, $ionicHistory, $rootScope, $firebaseArray, $cordovaCamera, $http, $state) {

	$scope.user = {
		fullName: '',
		gender: '',
		age: 0,
		description: '',
		image: null,
		marvelImage: ''
	}

	$ionicHistory.clearHistory();



  var getMarvel = function() {
  		var marvelApiKey = '8840657df7518a8f93eb0ece030f5091';

	var randomChar = $rootScope.marvelChars[Math.floor(Math.random() * $rootScope.marvelChars.length)];
    // $http.get('http://gateway.marvel.com/v1/public/characters?apikey=8840657df7518a8f93eb0ece030f5091');
    $http({
      method: 'GET',
      url: 'http://gateway.marvel.com/v1/public/characters/' + randomChar,
      params: {apikey: marvelApiKey}
    }).then(function successCallback(response) {
    	$scope.user.marvelImage = response.data.data.results[0].thumbnail.path + '.' + response.data.data.results[0].thumbnail.extension;
      // console.log(response);
    }, function errorCallback(response) {
    	console.log('Marvel API Error: ', response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    });
  }

	$scope.submitForm = function(user) {
	  getMarvel();

	var ref = new Firebase('https://marvelify.firebaseio.com/users/'+ $rootScope.userData.uid);
	var sync = $firebaseArray(ref);
		console.log(user);
		sync.$add({
                    fullName: user.fullName,
                    gender: user.gender,
                    age: user.age,
                    description: user.description,
                    image: user.image,
                    marvelImage: user.marvelImage
                }).then(function(ref) {
  var id = ref.key();
  console.log("added record with id " + id);
  sync.$indexFor(id); // returns location in the array

  $state.go('home');
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
