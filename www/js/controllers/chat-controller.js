angular.module('chat-controller', [])

.controller('ChatCtrl', function($scope, $ionicModal, Items, Chats, Users, $state, $rootScope, $firebaseArray, $ionicHistory) {
  var ref = new Firebase("https://alpha-db.firebaseio.com/messages");
  
  $scope.messages = $firebaseArray(ref);
  
  $scope.addMessage = function(e) {
          // if (e.keyCode != 13) return;
          $scope.messages.$add({from: this.name, body: this.message});
          $scope.message = "";
          // if ($scope.messages > 20) {
            $scope.reveal = true;
          // }
   }

   $scope.goHome = function() {
    $ionicHistory.goBack();
   }


    // $scope.displayName = Users.getDisplayNames($rootScope.userData.uid);
    // //console.log("Chat Controller initialized");

    // $scope.IM = {
    //     textMessage: ""
    // };

    // Chats.selectRoom($state.params.roomId);

    // var roomName = Chats.getSelectedRoomName();

    // // Fetching Chat Records only if a Room is Selected
    // if (roomName) {
    //     $scope.roomName = " - " + roomName;
    //     $scope.chats = Chats.all();
    // }

    // $scope.sendMessage = function (msg) {
    //     console.log(msg);
    //     Chats.send($scope.displayName, msg);
    //     $scope.IM.textMessage = "";
    // }

    // $scope.remove = function (chat) {
    //     Chats.remove(chat);
    // }

});