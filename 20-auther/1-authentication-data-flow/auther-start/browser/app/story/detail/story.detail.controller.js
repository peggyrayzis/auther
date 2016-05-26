'use strict';

app.controller('StoryDetailCtrl', function ($scope, currentUser, authFactory, story, users) {
  $scope.story = story;
  $scope.users = users;

  $scope.isUser = authFactory.isUser(story.author.name)

  $scope.$watch('story', function () {
    $scope.story.save();
  }, true);
});
