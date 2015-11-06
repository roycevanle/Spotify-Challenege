Parse.initialize("dWkgq4dKTAiyboPJwJFPoC2IYnb0xxix8e3NuJaX", "Lt3Mj1ESdlY05aZD5b4pA7Cp4u1V5b0Be3bjQtQT");
//This is for keeping track of current users
var currentUser = Parse.User.current();

//This is for Angular shinanigans
var data;
var baseUrl = 'https://api.spotify.com/v1/search?type=track&query='
var myApp = angular.module('myApp', [])

//Logs out users
$("#user-out").on("click", function() {
  if (currentUser != null) {
    Parse.User.logOut();
    location.reload();
    alert("You have successfully logged out");
  }
})

//sign up for user
$("#user-signup").submit(function() {
  var user = new Parse.User();
  user.set("username", $("#upname").val());
  user.set("password", $("#uppassword").val());
  user.set("reviews", [])
  user.signUp(null, {
    success: function(user) {
      Parse.User.logIn($("#upname").val(), $("#uppassword").val(), {
        success: function(user) {
          document.location.href = "index.html";
        },
        error: function(error) {
          alert("Error: " + error.code + " "+ error.message);
          clearInput();
        }
      });
    }
  });
  return false;
});

//sign in for user
$("#user-in").submit(function() {
  Parse.User.logIn($("#inname").val(), $("#inpassword").val(), {
    success: function(user) {
      document.location.href = "index.html";
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
      clearInput(); 
    } 
  });
  return false;
});

// clears all input
var clear = function() {
  $("#upname").val("");
  $("#uppassword").val("");
  $("#inname").val("");
  $("#inpassword").val("");
}

//Example Code----------------------------------------------------------------------
var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {}
  $scope.getSongs = function() {
    $http.get(baseUrl + $scope.track).success(function(response){
      data = $scope.tracks = response.tracks.items
      
    })
  }
  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause()
      $scope.currentSong = false
      return
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play()  
      $scope.currentSong = song
    }
  }
})

// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});
