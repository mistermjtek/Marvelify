angular.module('chats-controller', [])
  
.controller('ChatsCtrl', function ($scope, Rooms, Chats, $state) {
    //console.log("Rooms Controller initialized");
    $scope.rooms = Rooms.all();

    $scope.openChatRoom = function (roomId) {
        $state.go('chat', {
            roomId: roomId
        });
    }
});
