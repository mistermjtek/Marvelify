angular.module('marvelify.homeController', [])

.controller('HomeCtrl', function($scope, TDCardDelegate, FirebaseAPI, Auth, $state, $http, $firebaseArray, $rootScope, $ionicActionSheet) {
    var ref = FirebaseAPI;
    $scope.cards = [{ image: "http://i.annihil.us/u/prod/marvel/i/mg/6/f0/53176ffc42f58.jpg" }];

    $http.get('https://marvelify.firebaseio.com/users.json').then(function(response) {
        var array = [];
        console.log(response.data);
        angular.forEach(response.data, function(element) {
            $scope.cards.push({ image: element.marvelImage, 
              userId: element.userId, 
              fullName: element.fullName, 
              gender: element.gender, 
              age: element.age 
            });
            // cardTypes.push({image: element[Object.keys(element)[0]].marvelImage});
        });
        console.log($scope.cards);
    }, function(response) {});

    //   ref.on("value", function(snapshot) {
    //     var data = snapshot.val();

    // }, function (errorObject) {
    //   console.log("The read failed: " + errorObject.code);
    // });

    $scope.openSettings = function() {

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: 'Change Profile' }
            ],
            destructiveText: 'Logout',
            titleText: 'Settings',
            cancelText: 'Cancel',
            destructiveButtonClicked: function() {
                $rootScope.logout();
                return true;
            },
            buttonClicked: function(index) {
                console.log('index:', index);
                if (index === 0) {
                    $state.go('onboard');
                    return true;
                }
            }
        });

    };

    $scope.cardDestroyed = function(index) {
        $scope.cards.splice(index, 1);
    };

    // $scope.addCard = function() {
    //   var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    //   newCard.id = Math.random();
    //   $scope.cards.unshift(angular.extend({}, newCard));
    // }

    // $scope.cards = [];
    // for(var i = 0; i < 3; i++) $scope.addCard();
    $scope.cardSwipedLeft = function(index) {

        console.log('LEFT SWIPE');
        // $scope.addCard();
    };

    $scope.cardSwipedRight = function(card) {
        var ref = new Firebase('https://marvelify.firebaseio.com/likes/');
        var sync = $firebaseArray(ref);
        sync.$add({
            likedUserId: card.userId,
            gaveTheLike: $rootScope.userData.uid
        }).then(function(ref) {
            var id = ref.key();
            console.log("added record with id " + id);
            sync.$indexFor(id); // returns location in the array

        });
        console.log('RIGHT SWIPE');
        // $scope.addCard();


    };

});
