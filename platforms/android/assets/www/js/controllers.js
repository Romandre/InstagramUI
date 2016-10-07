angular.module('starter.controllers', ['ionic', 'ngCordova'])


//.controller('RefreshCtrl', function ($scope) {
//    $scope.doRefresh = function () {
//        $scope.$broadcast('scroll.refreshComplete');
//    };
//})

.controller('DashCtrl', function ($scope, $location, Posts, $ionicActionSheet, $ionicScrollDelegate, $rootScope) {
    $scope.doRefresh = function () {
        $scope.$broadcast('scroll.refreshComplete');
    };

    $rootScope.slideHeader = true;
    $rootScope.slideHeaderPrevious = 0;

    $scope.showActionSheet = function () {
        // Show the action sheet:
        $ionicActionSheet.show({
            buttons: [{
                text: 'Report an issue'
            }, {
                text: 'Post on <b>Facebook</b>'
            }, {
                text: 'Share in <b>Massenger</b>'
            }, {
                text: 'Copy URL'
            }, {
                text: 'Notify about publications'
            }],
            cancelText: 'Cancel',
            destructiveButtonClicked: function () {
                alert("Clicked Delete");
                return true;
            },
            buttonClicked: function (index, buttonObj) {
                switch (index) {
                    case 0:
                        alert("Clicked Report");
                        return false;
                    case 1:
                        alert("Clicked FB");
                        return false;
                }
            }
        });
    };

    $scope.posts = Posts.all();
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope, Posts) {
    $scope.posts = Posts.all();
})

.controller('SearchCtrl', function($scope) {
})

.controller("CameraCtrl", function ($scope, $cordovaCamera, $rootScope, Posts, $state, $ionicHistory) {
 
    $scope.takePhoto = function () {
        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $rootScope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            // An error occured. Show a message to the user
        });

        $location.path('/confirm');
    }

    $scope.choosePhoto = function () {
        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $rootScope.imgURI = "data:image/jpeg;base64,"+ imageData;
        }, function (err) {
            // An error occured. Show a message to the user
        });
    }

    $scope.textContainer = {};

    $scope.confirmPhoto = function (comment) {
        $scope.textContainer = angular.copy(comment);
        var id = 1;
        id = --id;
        Posts.share({
            id: id,
            name: 'roman.kucherenko',
            avatar: 'img/avatar.jpg',
            image: $rootScope.imgURI,
            comment: $scope.textContainer,
            likes: 0
        });
        $state.go('tab.home');
    }
})

.directive('scrollWatch', function ($rootScope) {
    return function (scope, elem, attr) {
        var start = 0;
        var threshold = 10;

        elem.bind('scroll', function (e) {
            if (e.detail.scrollTop - start > threshold) {
                $rootScope.slideHeader = true;
            } else {
                $rootScope.slideHeader = false;
            }
            if ($rootScope.slideHeaderPrevious >= e.detail.scrollTop - start) {
                $rootScope.slideHeader = false;
            }
            $rootScope.slideHeaderPrevious = e.detail.scrollTop - start;
            $rootScope.$apply();
        });
    };
});