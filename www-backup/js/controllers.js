angular.module('starter.controllers', ['ionic', 'ngCordova'])


//.controller('RefreshCtrl', function ($scope) {
//    $scope.doRefresh = function () {
//        $scope.$broadcast('scroll.refreshComplete');
//    };
//})

.controller('DashCtrl', function ($scope, $location, Posts) {
    $scope.doRefresh = function () {
        $scope.$broadcast('scroll.refreshComplete');
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
});