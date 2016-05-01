angular.module('chats-controller', [])
  
.controller('ChatsCtrl', function ($scope, Rooms, Chats, $state, Users, $ionicHistory, $rootScope, $firebaseArray, Auth, $http) {
    //console.log("Rooms Controller initialized");
    var authData = Auth.$getAuth();

    $scope.likes = [];

      $http.get('https://marvelify.firebaseio.com/likes.json').then(function(response) {
        angular.forEach(response.data, function(element) {

        })
      });

      console.log($scope.likes);

  

    // $scope.rooms = Rooms.all();

    // $scope.goHome = function() {
    //   $ionicHistory.goBack();
    // }

    // $scope.openChatRoom = function (roomId) {
    //     $state.go('chat', {
    //         roomId: roomId
    //     });
    // }
});
