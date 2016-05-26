'use strict';

app.controller('StoryListCtrl', function ($scope, stories, currentUser, Story, users, authFactory) {

  $scope.stories = stories;
  $scope.users = users;

  $scope.isUser = authFactory.isUser();

  $scope.newStory = new Story();
  
  $scope.removeStory = function (story) {
    story.destroy()
    .then(function () {
      var idx = $scope.stories.indexOf(story);
      $scope.stories.splice(idx, 1);
    });
  };

  $scope.addStory = function () {
    $scope.newStory.save()
    .then(function (created) {
      $scope.newStory = new Story();
      $scope.stories.unshift(created);
    });
  };
});
