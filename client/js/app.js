var path = window.location.pathname;
var socket = io(path.substr(0, path.length - 1));

var storyApp = angular.module('StoryApp', []);

storyApp.controller('storyController', ($scope, $http) => {

    socket.on('storyupdate', (story) => {
        console.log(story)
        $scope.story = story;
        $scope.$apply();
    })

    $scope.submitWord = function (event) {

        if (event.keyCode === 13) {
            socket.emit('newword', $scope.inputBox)

            $scope.inputBox = '';
        }

    }

    var nickname = prompt('Enter a nickname');

    socket.emit('nickname', nickname);
});


