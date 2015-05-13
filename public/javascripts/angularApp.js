var app = angular.module('flapperNews', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller:'MainCtrl'
      })

      .state('posts', {
	url: '/posts/{id}',
	templateUrl: '/posts.html',
	controller: 'PostsCtrl'
      });

    $urlRouterProvider.otherwise('home');
}]);

app.factory('posts', [function(){
    var o = {
      posts: [] 
    };
    return o;
}]);

app.controller('MainCtrl', ['$scope', 'posts', function($scope, posts) { $scope.posts = posts.posts;
    $scope.addPost = function(){
      if(!$scope.title || $scope.title === '') { return; }
      $scope.post = ({title: $scope.title,
	link:$scope.link,
	upvotes: 0,
	comments: [
	]
      });
      $scope.posts.push($scope.post);
      $scope.title = '';
      $scope.link = '';
    };

    $scope.incrementUpvotes = function(post){
      post.upvotes += 1;
    };
}]);

app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', function ($scope, $stateParams, posts) {
    $scope.post = posts.posts[$stateParams.id];
    $scope.incrementUpvotes = function(post){
      post.upvotes += 1;
    };

    $scope.addComment = function() {
      if ($scope.body === '' || !$scope.body) { return; }
      $scope.post.comments.push({
	author: 'user',
	body: $scope.body,
	upvotes:0
      });
      $scope.body = '';
    };
}]);
