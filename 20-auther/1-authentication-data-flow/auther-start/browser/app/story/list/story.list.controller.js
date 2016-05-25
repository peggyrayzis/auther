'use strict';

app.controller('StoryListCtrl', function ($scope, stories, currentUser, Story, users) {
  $scope.stories = stories;
  $scope.users = users;

  console.log('currentuser',currentUser);



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
      // created.author = $scope.newStory.author;
      $scope.newStory = new Story();
      $scope.stories.unshift(created);
    });
  };
});
