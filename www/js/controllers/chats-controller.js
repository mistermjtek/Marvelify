angular.module('chats-controller', [])

.controller('ChatsCtrl', function($scope, $ionicModal) {
  
  $scope.contacts = [
    { name: 'Gordon Freeman' },
    { name: 'Barney Calhoun' },
    { name: 'Lamarr the Headcrab' },
  ];


});