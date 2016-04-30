angular.module('marvelify.cardController', [])

.controller('CardsCtrl', function($scope, TDCardDelegate, Auth, $state) {
  var cardTypes = [
    { image: 'max.jpg' },
    { image: 'ben.png' },
    { image: 'perry.jpg' },
  ];

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.unshift(angular.extend({}, newCard));
  }
  
  $scope.cards = [];
  for(var i = 0; i < 3; i++) $scope.addCard();

  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.addCard();
  };

  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.addCard();
  };

  $scope.logout= function() {
    Auth.$unauth();
    $state.go('login');
  }

});