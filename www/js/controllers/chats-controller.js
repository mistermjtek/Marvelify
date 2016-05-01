angular.module('chats-controller', [])
  
.controller('ChatsCtrl', function ($scope, Rooms, Chats, $state, $ionicHistory) {
    //console.log("Rooms Controller initialized");
    $scope.rooms = Rooms.all();

    $scope.goHome = function() {
      $ionicHistory.goBack();
    }

    $scope.openChatRoom = function (roomId) {
        $state.go('chat', {
            roomId: roomId
        });
    }
});
