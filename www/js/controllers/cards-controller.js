angular.module('marvelify.cardController', [])

.controller('CardsCtrl', function($scope, TDCardDelegate, FirebaseAPI, Auth, $state, $http) {
  var ref = FirebaseAPI;
  var cardTypes = [{image: 'lastcard.jpg'}];

  $http.get('https://marvelify.firebaseio.com/users.json').then(function(response) {
    var array = [];
         console.log(response.data);
    angular.forEach(response.data, function(element) {
      angular.forEach(element, function(el) {
        cardTypes.push({image: el.marvelImage});
      })
    // cardTypes.push({image: element[Object.keys(element)[0]].marvelImage});

  });
 }, function(response) {
});

//   ref.on("value", function(snapshot) {
//     var data = snapshot.val();

// }, function (errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });

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

});